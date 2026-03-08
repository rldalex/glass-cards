"""Constants for Glass Cards integration."""

import os

DOMAIN = "glass_cards"
VERSION = "0.0.2"

# Use file modification timestamp for cache-busting
_www_dir = os.path.join(os.path.dirname(__file__), "www")
_js_mtime = int(os.path.getmtime(os.path.join(_www_dir, "glass-cards.js"))) if os.path.isfile(os.path.join(_www_dir, "glass-cards.js")) else 0
_panel_mtime = int(os.path.getmtime(os.path.join(_www_dir, "glass-cards-panel.js"))) if os.path.isfile(os.path.join(_www_dir, "glass-cards-panel.js")) else 0

JS_URL = f"/glass_cards/glass-cards.js?v={_js_mtime}"
PANEL_JS_URL = f"/glass_cards/glass-cards-panel.js?v={_panel_mtime}"
STORAGE_KEY = "glass_cards"
STORAGE_VERSION = 1
