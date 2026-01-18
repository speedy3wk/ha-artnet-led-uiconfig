# Art-Net LED UI Config

Custom Integration (nicht offiziell in HACS gelistet) für eine WYSIWYG Konfiguration der ha-artnet-led Einstellungen. Die Integration stellt ein Panel bereit und speichert die Konfiguration in Home Assistant Storage.

## Installation (HACS Custom Repository)
1. HACS öffnen → Integrationen → ⋮ → Custom repositories.
2. Repository URL hinzufügen: https://github.com/speedy3wk/ha-artnet-led-uiconfig (Kategorie: Integration).
3. Integration installieren und Home Assistant neu starten.
4. In Einstellungen → Geräte & Dienste die Integration hinzufügen.

## Panel
Nach der Installation erscheint ein Sidebar-Panel **Art-Net LED Config**.

## Automatisches Schreiben (Add-on)
Dieses Repository enthält ein Add-on unter addons/ha_artnet_led_uiconfig.
Damit kann das Panel die YAML automatisch in /config schreiben und optional `light.reload` auslösen.

Schritte:
1. Add-on Store → ⋮ → Repositories → https://github.com/speedy3wk/ha-artnet-led-uiconfig hinzufügen.
2. Add-on installieren.
3. In den Add-on Optionen `ha_token` setzen (nur nötig, wenn kein Supervisor-Token verfügbar ist).
4. Im Panel auf **Deploy** klicken.

Der Deploy schreibt die YAML in die Include-Datei (Standard: /config/ha_artnet_led_uiconfig.yaml) und ergänzt configuration.yaml einmalig mit `light: !include ...`.

## Installations-Checkliste
- Integration (custom_components) installiert und HA neu gestartet
- Integration in **Einstellungen → Geräte & Dienste** hinzugefügt
- Add-on installiert und gestartet
- Add-on Optionen: `ha_token` gesetzt (Long-Lived Token)
- Panel sichtbar: **Art-Net LED Config** in der Sidebar

## Deploy-Test
1. Panel öffnen und Änderungen vornehmen.
2. **Deploy** drücken.
3. Prüfen, ob `/config/ha_artnet_led_uiconfig.yaml` geschrieben wurde.
4. Prüfen, ob `configuration.yaml` die Zeile `light: !include ha_artnet_led_uiconfig.yaml` enthält.
5. In **Einstellungen → System → Protokoll** nach Reload/Fehlern schauen.

## Entwicklung Frontend
Im Ordner frontend:
- `npm install`
- `npm run build`

Das Bundle landet in custom_components/ha_artnet_led_uiconfig/frontend/dist/.
