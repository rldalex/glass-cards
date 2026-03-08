"""Constants for Glass Cards integration."""

import os

DOMAIN = "glass_cards"
VERSION = "0.0.4"

# Use file modification timestamp for cache-busting
_www_dir = os.path.join(os.path.dirname(__file__), "www")
_js_mtime = int(os.path.getmtime(os.path.join(_www_dir, "glass-cards.js"))) if os.path.isfile(os.path.join(_www_dir, "glass-cards.js")) else 0
_panel_mtime = int(os.path.getmtime(os.path.join(_www_dir, "glass-cards-panel.js"))) if os.path.isfile(os.path.join(_www_dir, "glass-cards-panel.js")) else 0

JS_PATH = "/glass_cards/glass-cards.js"
JS_URL = f"{JS_PATH}?v={_js_mtime}"
PANEL_JS_PATH = "/glass_cards/glass-cards-panel.js"
PANEL_JS_URL = f"{PANEL_JS_PATH}?v={_panel_mtime}"
STORAGE_KEY = "glass_cards"
STORAGE_VERSION = 1
