# Art-Net LED UI Config Add-on

Dieses Add-on schreibt die YAML-Konfiguration aus dem UI-Panel in eine Include-Datei und triggert optional einen Reload.

## Optionen
- `ha_url`: URL der Home Assistant Instanz
- `ha_token`: Long-Lived Access Token (nur nötig, wenn kein Supervisor-Token verfügbar ist)
- `include_file`: Ziel-Datei unter /config
- `append_to_configuration`: Fügt `light: !include <datei>` an configuration.yaml an
- `reload_service`: Service zum Reload (z. B. `light.reload`)

## Repository
https://github.com/speedy3wk/ha-artnet-led-uiconfig

## API
- `POST /apply` mit JSON `{ "yaml": "..." }`
