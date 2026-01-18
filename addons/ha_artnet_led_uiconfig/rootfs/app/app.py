from __future__ import annotations

import json
import os
from pathlib import Path

import aiohttp
from aiohttp import web

CONFIG_DIR = Path("/config")
OPTIONS_PATH = Path("/data/options.json")


def load_options() -> dict:
    if OPTIONS_PATH.exists():
        return json.loads(OPTIONS_PATH.read_text(encoding="utf-8"))
    return {}


def ensure_include(config_path: Path, include_file: str) -> None:
    include_line = f"light: !include {include_file}"
    if not config_path.exists():
        config_path.write_text(f"{include_line}\n", encoding="utf-8")
        return

    content = config_path.read_text(encoding="utf-8")
    if include_line in content:
        return

    content = content.rstrip() + f"\n\n{include_line}\n"
    config_path.write_text(content, encoding="utf-8")


def normalize_light_yaml(yaml: str) -> str:
    lines = yaml.splitlines()
    if not lines:
        return yaml
    if lines[0].strip() == "light:":
        stripped = []
        for line in lines[1:]:
            if line.startswith("  "):
                stripped.append(line[2:])
            else:
                stripped.append(line)
        return "\n".join(stripped).lstrip("\n")
    return yaml


def _read_env_file(name: str) -> str:
    path = Path("/run/s6/container_environment") / name
    if path.exists():
        return path.read_text(encoding="utf-8").strip()
    return ""


def get_supervisor_token() -> str:
    return (
        os.environ.get("SUPERVISOR_TOKEN", "").strip()
        or os.environ.get("HASSIO_TOKEN", "").strip()
        or _read_env_file("SUPERVISOR_TOKEN")
        or _read_env_file("HASSIO_TOKEN")
    )


def resolve_token(ha_url: str, configured_token: str) -> str:
    supervisor_token = get_supervisor_token()
    token = configured_token.strip()
    if token:
        return token
    if "supervisor/core/api" in ha_url:
        return supervisor_token
    return ""


def resolve_ha_url(ha_url: str, token: str) -> str:
    return ha_url
    return ""


def normalize_service(service: str) -> str:
    if service == "homeassistant.relaod_core_config":
        return "homeassistant.reload_core_config"
    return service


async def call_reload_service(ha_url: str, token: str, service: str) -> None:
    if not token:
        raise RuntimeError("HA reload failed: missing token")
    service = normalize_service(service)
    services = [service]
    if service != "homeassistant.reload_core_config":
        services.append("homeassistant.reload_core_config")
    if "homeassistant.reload_all" not in services:
        services.append("homeassistant.reload_all")
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    base = ha_url.rstrip("/")
    if base.endswith("/api"):
        base = base
        service_prefix = ""
    else:
        service_prefix = "/api"
    async with aiohttp.ClientSession() as session:
        last_error: str | None = None
        for svc in services:
            domain, name = svc.split(".", 1)
            url = f"{base}{service_prefix}/services/{domain}/{name}"
            async with session.post(url, headers=headers, json={}) as response:
                if response.status >= 400:
                    text = await response.text()
                    last_error = f"HA reload failed: {response.status} {text}"
                    if response.status == 404:
                        continue
                    raise RuntimeError(last_error)
                return
        if last_error:
            raise RuntimeError(last_error)


async def handle_apply(request: web.Request) -> web.Response:
    payload = await request.json()
    yaml = payload.get("yaml", "")
    if not yaml:
        return web.json_response({"error": "Missing yaml"}, status=400)

    options = load_options()
    include_file = options.get("include_file", "ha_artnet_led_uiconfig.yaml")
    append_to_configuration = options.get("append_to_configuration", True)
    ha_url = options.get("ha_url", "http://homeassistant.local:8123")
    ha_token = resolve_token(ha_url, options.get("ha_token", ""))
    ha_url = resolve_ha_url(ha_url, ha_token)
    reload_service = options.get("reload_service", "light.reload")

    include_path = CONFIG_DIR / include_file
    include_path.write_text(normalize_light_yaml(yaml), encoding="utf-8")

    if append_to_configuration:
        ensure_include(CONFIG_DIR / "configuration.yaml", include_file)

    try:
        await call_reload_service(ha_url, ha_token, reload_service)
    except Exception as err:  # pylint: disable=broad-except
        configured_token = options.get("ha_token", "").strip()
        supervisor_token = get_supervisor_token()
        supervisor_token_file = _read_env_file("SUPERVISOR_TOKEN") or _read_env_file("HASSIO_TOKEN")
        if "supervisor/core/api" in ha_url:
            token_source = "supervisor"
        else:
            token_source = "configured" if configured_token else "supervisor"
        error_detail = (
            f"{err} · ha_url={ha_url} · token_source={token_source} · "
            f"token_present={bool(ha_token)} · token_length={len(ha_token)} · "
            f"supervisor_token_present={bool(supervisor_token)} · "
            f"supervisor_token_file_present={bool(supervisor_token_file)}"
        )
        return web.json_response(
            {
                "status": "written",
                "reload": "failed",
                "error": error_detail,
                "ha_url": ha_url,
                "token_source": token_source,
                "token_present": bool(ha_token),
                "token_length": len(ha_token),
                "supervisor_token_present": bool(supervisor_token),
                "supervisor_token_file_present": bool(supervisor_token_file),
            }
        )

    return web.json_response({"status": "written", "reload": "ok"})


async def create_app() -> web.Application:
    app = web.Application()
    app.router.add_post("/apply", handle_apply)
    return app


def main() -> None:
    web.run_app(create_app(), host="0.0.0.0", port=8099)


if __name__ == "__main__":
    main()
