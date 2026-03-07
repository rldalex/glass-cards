"""Glass Cards integration for Home Assistant."""

from __future__ import annotations

import os
from typing import TYPE_CHECKING, Any

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry

from .const import DOMAIN, JS_URL
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

    # Serve the JS bundle
    js_path = os.path.join(os.path.dirname(__file__), "www", "glass-cards.js")
    if os.path.isfile(js_path):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(JS_URL, js_path, cache_headers=False)]
        )
        add_extra_js_url(hass, JS_URL)

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    hass.data.pop(DOMAIN, None)
    return True
