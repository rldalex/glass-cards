"""Constants for Glass Cards integration."""

import hashlib
import os

DOMAIN = "glass_cards"
VERSION = "0.0.112"

JS_PATH = "/glass_cards/glass-cards.js"
PANEL_JS_PATH = "/glass_cards/glass-cards-panel.js"
STORAGE_KEY = "glass_cards"
STORAGE_VERSION = 1


def _file_hash(path: str) -> str:
    """Return a short hash of the file contents for cache-busting."""
    if not os.path.isfile(path):
        return "0"
    try:
        with open(path, "rb") as f:
            return hashlib.md5(f.read()).hexdigest()[:8]  # noqa: S324
    except OSError:
        return "0"


def get_js_url() -> str:
    """Return the JS bundle URL with a content-hash for cache-busting."""
    www_dir = os.path.join(os.path.dirname(__file__), "www")
    h = _file_hash(os.path.join(www_dir, "glass-cards.js"))
    return f"{JS_PATH}?v={h}"


def get_panel_js_url() -> str:
    """Return the panel JS bundle URL with a content-hash for cache-busting."""
    www_dir = os.path.join(os.path.dirname(__file__), "www")
    h = _file_hash(os.path.join(www_dir, "glass-cards-panel.js"))
    return f"{PANEL_JS_PATH}?v={h}"
