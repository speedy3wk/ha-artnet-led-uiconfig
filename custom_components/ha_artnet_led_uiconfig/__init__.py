from __future__ import annotations

from pathlib import Path
import os
from typing import Any

from aiohttp import web
import voluptuous as vol

from homeassistant.components import panel_custom, websocket_api
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store
from homeassistant.helpers.http import HomeAssistantView
from homeassistant.components.http import StaticPathConfig
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import (
    ADDON_FALLBACK_HOSTS,
    ADDON_SLUG,
    DEFAULT_CONFIG,
    DEPLOY_PATH,
    DOMAIN,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_PATH,
    STORE_KEY,
    STORE_VERSION,
    WS_DEPLOY,
    WS_GET,
    WS_SAVE,
)


def _get_store(hass: HomeAssistant) -> Store:
    return hass.data[DOMAIN]["store"]


async def _async_get_config(hass: HomeAssistant) -> dict:
    data = await _get_store(hass).async_load()
    return data or DEFAULT_CONFIG


async def _async_set_config(hass: HomeAssistant, config: dict) -> None:
    await _get_store(hass).async_save(config)


async def _async_deploy_yaml(hass: HomeAssistant, yaml: str) -> dict:
    session = async_get_clientsession(hass)
    headers = {}
    token = os.environ.get("SUPERVISOR_TOKEN")
    if token:
        headers = {
            "Authorization": f"Bearer {token}",
            "X-Supervisor-Token": token,
        }
    urls: list[str] = []

    if token:
        try:
            async with session.get("http://supervisor/addons", headers=headers) as response:
                data = await response.json()
                for addon in data.get("data", {}).get("addons", []):
                    slug = addon.get("slug")
                    if slug and slug.endswith(ADDON_SLUG):
                        urls.append(f"http://supervisor/addons/{slug}/api/apply")
        except Exception:  # pylint: disable=broad-except
            pass

    for host in ADDON_FALLBACK_HOSTS:
        urls.append(f"http://{host}:8099/apply")

    last_error: dict | None = None
    for url in urls:
        try:
            async with session.post(url, json={"yaml": yaml}, headers=headers) as response:
                content_type = response.headers.get("Content-Type", "")
                if "application/json" in content_type:
                    data = await response.json()
                else:
                    data = {"message": await response.text()}

                if response.status == 404:
                    last_error = {
                        "error": data,
                        "status": response.status,
                        "url": str(response.url),
                    }
                    continue
                if response.status >= 400:
                    return {
                        "error": data,
                        "status": response.status,
                        "url": str(response.url),
                    }
                return data
        except Exception as err:  # pylint: disable=broad-except
            last_error = {"error": str(err), "url": url}
            continue

    return last_error or {"error": "Deploy failed", "urls": urls}


@websocket_api.websocket_command({vol.Required("type"): WS_GET})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_get_config(hass: HomeAssistant, connection, msg):
    data = await _async_get_config(hass)
    connection.send_result(msg["id"], data)


@websocket_api.websocket_command(
    {vol.Required("type"): WS_SAVE, vol.Required("config"): dict}
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_save_config(hass: HomeAssistant, connection, msg):
    await _async_set_config(hass, msg["config"])
    connection.send_result(msg["id"], {"status": "ok"})


@websocket_api.websocket_command(
    {vol.Required("type"): WS_DEPLOY, vol.Required("yaml"): str}
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_deploy(hass: HomeAssistant, connection, msg):
    result = await _async_deploy_yaml(hass, msg["yaml"])
    connection.send_result(msg["id"], result)


class ArtnetLedUiConfigView(HomeAssistantView):
    url = f"{STATIC_PATH}/config"
    name = f"api:{DOMAIN}:config"
    requires_auth = True

    def __init__(self, store: Store) -> None:
        self._store = store

    async def get(self, request):
        data = await self._store.async_load()
        return web.json_response(data or DEFAULT_CONFIG)

    async def post(self, request):
        payload: dict[str, Any] = await request.json()
        await self._store.async_save(payload)
        return web.json_response(payload)


class ArtnetLedUiDeployView(HomeAssistantView):
    url = DEPLOY_PATH
    name = f"api:{DOMAIN}:deploy"
    requires_auth = True

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass

    async def post(self, request):
        payload: dict[str, Any] = await request.json()
        yaml = payload.get("yaml")
        if not yaml:
            return web.json_response({"error": "Missing yaml"}, status=400)
        result = await _async_deploy_yaml(self._hass, yaml)
        if "error" in result:
            return web.json_response(result, status=result.get("status", 502))
        return web.json_response(result)


async def _async_register_panel(hass: HomeAssistant) -> None:
    if hass.data.get(DOMAIN, {}).get("panel_registered"):
        return
    frontend_path = Path(__file__).parent / "frontend" / "dist"
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(STATIC_PATH, str(frontend_path), cache_headers=True),
        ]
    )

    await panel_custom.async_register_panel(
        hass,
        webcomponent_name="ha-artnet-led-uiconfig-panel",
        frontend_url_path=PANEL_URL_PATH,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        module_url=f"{STATIC_PATH}/ha-artnet-led-uiconfig.js",
        require_admin=True,
    )
    hass.data.setdefault(DOMAIN, {})["panel_registered"] = True


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    store = Store(hass, STORE_VERSION, STORE_KEY)
    hass.data.setdefault(DOMAIN, {})["store"] = store

    websocket_api.async_register_command(hass, websocket_get_config)
    websocket_api.async_register_command(hass, websocket_save_config)
    websocket_api.async_register_command(hass, websocket_deploy)
    hass.http.register_view(ArtnetLedUiConfigView(store))
    hass.http.register_view(ArtnetLedUiDeployView(hass))
    await _async_register_panel(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    if DOMAIN not in hass.data:
        hass.data[DOMAIN] = {"store": Store(hass, STORE_VERSION, STORE_KEY)}
        websocket_api.async_register_command(hass, websocket_get_config)
        websocket_api.async_register_command(hass, websocket_save_config)
        websocket_api.async_register_command(hass, websocket_deploy)
        hass.http.register_view(ArtnetLedUiConfigView(hass.data[DOMAIN]["store"]))
        hass.http.register_view(ArtnetLedUiDeployView(hass))

    await _async_register_panel(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    panel_custom.async_unregister_panel(hass, PANEL_URL_PATH)
    return True
