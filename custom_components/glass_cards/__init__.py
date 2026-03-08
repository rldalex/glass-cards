"""Glass Cards integration for Home Assistant."""

from __future__ import annotations

import logging
import os
from typing import TYPE_CHECKING, Any

from homeassistant.components.frontend import (
    add_extra_js_url,
    async_register_built_in_panel,
)
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry

from .const import DOMAIN, JS_PATH, PANEL_JS_PATH, get_js_url, get_panel_js_url
from .store import GlassCardsStore
from .websocket_api import async_register_commands

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up Glass Cards — register WS commands once."""
    async_register_commands(hass)
    return True


async def _register_lovelace_resource(hass: HomeAssistant, url: str) -> None:
    """Register JS as a Lovelace resource for companion app cache resilience.

    The companion app caches the HTML page served by HA. Scripts loaded via
    add_extra_js_url are embedded in that HTML, so they may not load on cold
    starts. Lovelace resources are fetched via WebSocket and survive the cache.
    """
    try:
        lovelace_data = hass.data.get("lovelace")
        if lovelace_data is None:
            return
        resources = getattr(lovelace_data, "resources", None)
        if resources is None:
            return
        # Check if already registered
        for item in resources.async_items():
            if JS_PATH in item.get("url", ""):
                return
        await resources.async_create_item({"res_type": "js", "url": url})
        _LOGGER.debug("Registered glass-cards as Lovelace resource: %s", url)
    except Exception:  # noqa: BLE001
        _LOGGER.debug("Could not register Lovelace resource, falling back to add_extra_js_url")


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Glass Cards from a config entry."""
    store = GlassCardsStore(hass)
    await store.async_load()

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN]["store"] = store

    www_dir = os.path.join(os.path.dirname(__file__), "www")
    static_paths: list[StaticPathConfig] = []

    # Serve the main JS bundle
    js_path = os.path.join(www_dir, "glass-cards.js")
    if os.path.isfile(js_path):
        js_url = get_js_url()
        static_paths.append(StaticPathConfig(JS_PATH, js_path, cache_headers=False))
        add_extra_js_url(hass, js_url)
        # Also register as Lovelace resource for companion app compatibility
        await _register_lovelace_resource(hass, js_url)

    # Serve the config panel JS bundle
    panel_js_path = os.path.join(www_dir, "glass-cards-panel.js")
    if os.path.isfile(panel_js_path):
        static_paths.append(
            StaticPathConfig(PANEL_JS_PATH, panel_js_path, cache_headers=False)
        )

    if static_paths:
        await hass.http.async_register_static_paths(static_paths)

    # Register sidebar panel (skip if already registered from a previous setup)
    if os.path.isfile(panel_js_path) and "glass-cards" not in hass.data.get("frontend_panels", {}):
        async_register_built_in_panel(
            hass,
            component_name="custom",
            sidebar_title="Glass Cards",
            sidebar_icon="mdi:cards",
            frontend_url_path="glass-cards",
            config={
                "_panel_custom": {
                    "name": "glass-config-panel",
                    "js_url": get_panel_js_url(),
                    "embed_iframe": False,
                    "trust_external": False,
                }
            },
            require_admin=True,
        )

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    hass.data.pop(DOMAIN, None)
    return True
