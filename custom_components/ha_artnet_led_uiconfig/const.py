DOMAIN = "ha_artnet_led_uiconfig"
PANEL_URL_PATH = "artnet-led-uiconfig"
PANEL_TITLE = "Art-Net LED Config"
PANEL_ICON = "mdi:lightbulb-group"
STATIC_PATH = f"/api/{DOMAIN}"
WS_GET = f"{DOMAIN}/get"
WS_SAVE = f"{DOMAIN}/save"
WS_DEPLOY = f"{DOMAIN}/deploy"
DEPLOY_PATH = f"{STATIC_PATH}/deploy"
ADDON_SLUG = "ha_artnet_led_uiconfig"
ADDON_FALLBACK_HOSTS = [
    "local-ha-artnet-led-uiconfig",
    "ha-artnet-led-uiconfig",
]
STORE_KEY = f"{DOMAIN}.config"
STORE_VERSION = 1
DEFAULT_CONFIG: dict = {
    "title": "",
    "nodes": []
}
