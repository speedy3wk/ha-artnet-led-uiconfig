# Art-Net LED UI Config Add-on

Dieses Add-on schreibt die YAML‑Konfiguration aus dem UI‑Panel in eine Include‑Datei und triggert optional einen Reload.

English: see README.md.

## Optionen
- `ha_url`: URL der Home Assistant API
- `ha_token`: Long‑Lived Access Token (nur nötig, wenn kein Supervisor‑Token verfügbar ist)
- `include_file`: Ziel‑Datei unter /config
- `append_to_configuration`: Fügt `light: !include <datei>` an configuration.yaml an
- `reload_service`: Service zum Reload (Standard: `homeassistant.reload_core_config`)

## Standard (HAOS / Supervisor)
Keine Änderungen nötig:
- `ha_url`: http://supervisor/core/api
- `ha_token`: leer

## Wenn kein Supervisor‑Token verfügbar ist
Long‑Lived Access Token nutzen:
- `ha_url`: http://homeassistant:8123
- `ha_token`: Long‑Lived Access Token

Long‑Lived Access Token erstellen:
Profil → Long‑Lived Access Tokens → Token erstellen.

## Repository
https://github.com/speedy3wk/ha-artnet-led-uiconfig

## API
- `POST /apply` mit JSON `{ "yaml": "..." }`
