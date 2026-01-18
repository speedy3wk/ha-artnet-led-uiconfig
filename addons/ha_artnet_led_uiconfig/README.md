# Art-Net LED UI Config Add-on

This add-on writes the YAML configuration from the UI panel into an include file and triggers an optional reload for https://github.com/Breina/ha-artnet-led.

Deutsch: see [README.de.md](README.de.md).

## Options
- `ha_url`: Home Assistant API URL
- `ha_token`: Long‑Lived Access Token (only needed when no Supervisor token is available)
- `include_file`: target file under /config
- `append_to_configuration`: adds `light: !include <file>` to configuration.yaml
- `reload_service`: reload service (default: `homeassistant.reload_core_config`)

## Defaults (HAOS / Supervisor)
No changes required:
- `ha_url`: http://supervisor/core/api
- `ha_token`: empty

## If Supervisor token is not available
Use a Long‑Lived Access Token:
- `ha_url`: http://homeassistant:8123
- `ha_token`: Long‑Lived Access Token

How to create a Long‑Lived Access Token:
User Profile → Long‑Lived Access Tokens → Create Token.

## Repository
https://github.com/speedy3wk/ha-artnet-led-uiconfig

## API
- `POST /apply` with JSON `{ "yaml": "..." }`

---
This project is fully AI-generated.
