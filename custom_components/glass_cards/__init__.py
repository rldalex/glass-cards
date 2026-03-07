"""Glass Cards integration for Home Assistant."""

from __future__ import annotations

import os
from typing import TYPE_CHECKING, Any

from homeassistant.components.frontend import (
    add_extra_js_url,
    async_register_built_in_panel,
)
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry

from .const import DOMAIN, JS_URL, PANEL_JS_URL
from .store import GlassCardsStore
from .websocket_api import async_register_commands

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up Glass Cards — register WS commands once."""
    async_register_commands(hass)
    return True


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
        static_paths.append(StaticPathConfig(JS_URL, js_path, cache_headers=False))
        add_extra_js_url(hass, JS_URL)

    # Serve the config panel JS bundle
    panel_js_path = os.path.join(www_dir, "glass-cards-panel.js")
    if os.path.isfile(panel_js_path):
        static_paths.append(
            StaticPathConfig(PANEL_JS_URL, panel_js_path, cache_headers=False)
        )

    if static_paths:
        await hass.http.async_register_static_paths(static_paths)

    # Register sidebar panel
    if os.path.isfile(panel_js_path):
        async_register_built_in_panel(
            hass,
            component_name="custom",
            sidebar_title="Glass Cards",
            sidebar_icon="mdi:cards",
            frontend_url_path="glass-cards",
            config={
                "_panel_custom": {
                    "name": "glass-config-panel",
                    "js_url": PANEL_JS_URL,
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
