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

from .const import DOMAIN, HUE_ICONS_PATH, JS_PATH, PANEL_JS_PATH, get_hue_icons_url, get_js_url, get_panel_js_url
from .spotify_cache import SpotifyCache
from .store import GlassCardsStore
from .websocket_api import async_register_commands

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)


def _resolve_static_assets(
    js_path: str, panel_js_path: str, hue_icons_path: str
) -> tuple[bool, bool, bool, str, str, str]:
    """Resolve file existence and hashed URLs (runs in executor thread)."""
    js_exists = os.path.isfile(js_path)
    panel_exists = os.path.isfile(panel_js_path)
    hue_exists = os.path.isfile(hue_icons_path)
    js_url = get_js_url() if js_exists else ""
    panel_js_url = get_panel_js_url() if panel_exists else ""
    hue_icons_url = get_hue_icons_url() if hue_exists else ""
    return js_exists, panel_exists, hue_exists, js_url, panel_js_url, hue_icons_url


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up Glass Cards — register WS commands once."""
    async_register_commands(hass)
    return True


async def _register_lovelace_resource(hass: HomeAssistant, url: str) -> bool:
    """Register the JS bundle as a Lovelace resource (storage mode).

    Returns True when the bundle is now registered through the Lovelace resource
    store, False when that path is unavailable (no lovelace data, or YAML-mode
    dashboards whose collection is read-only) so the caller can fall back to
    add_extra_js_url.

    The companion app caches the HTML page served by HA, so scripts added via
    add_extra_js_url may not load on cold starts; Lovelace resources are fetched
    over WebSocket and survive that cache. We also purge duplicate registrations:
    an earlier version created a new entry on every setup before the resource
    store had finished loading, leaving one duplicate per reboot.
    """
    lovelace_data = hass.data.get("lovelace")
    if lovelace_data is None:
        return False
    resources = getattr(lovelace_data, "resources", None)
    # YAML-mode resource collections are read-only (no mutation API).
    if resources is None or not hasattr(resources, "async_create_item"):
        return False

    try:
        # Ensure the store is loaded so async_items() reflects persisted state,
        # even when this runs at startup before the frontend first reads it.
        if hasattr(resources, "loaded") and not resources.loaded:
            await resources.async_load()
            resources.loaded = True

        existing = [
            item for item in resources.async_items() if JS_PATH in item.get("url", "")
        ]
        if existing:
            keep, *dupes = existing
            for dupe in dupes:
                await resources.async_delete_item(dupe["id"])
            if keep.get("url") != url:
                await resources.async_update_item(keep["id"], {"url": url})
            _LOGGER.debug(
                "glass-cards Lovelace resource normalized (%d duplicate(s) removed)",
                len(dupes),
            )
        else:
            await resources.async_create_item({"res_type": "js", "url": url})
            _LOGGER.debug("Registered glass-cards as Lovelace resource: %s", url)
        return True
    except Exception:  # noqa: BLE001
        _LOGGER.exception("Failed to register glass-cards Lovelace resource")
        return False


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Glass Cards from a config entry."""
    store = GlassCardsStore(hass)
    await store.async_load()

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN]["store"] = store
    hass.data[DOMAIN]["spotify_cache"] = SpotifyCache()

    www_dir = os.path.join(os.path.dirname(__file__), "www")
    static_paths: list[StaticPathConfig] = []

    # Compute file hashes off the event loop (blocking I/O)
    js_path = os.path.join(www_dir, "glass-cards.js")
    panel_js_path = os.path.join(www_dir, "glass-cards-panel.js")
    hue_icons_path = os.path.join(www_dir, "hass-hue-icons.js")
    js_exists, panel_exists, hue_exists, js_url, panel_js_url, hue_icons_url = (
        await hass.async_add_executor_job(
            _resolve_static_assets, js_path, panel_js_path, hue_icons_path
        )
    )

    # Serve the main JS bundle through a single load path. Prefer the Lovelace
    # resource (survives the companion-app HTML cache, and is dashboard-scoped so
    # it never loads on system panels like HACS/Settings); fall back to a global
    # extra_js_url only when the resource store is unavailable (e.g. YAML mode).
    # Loading via both paths would double-`customElements.define` and crash.
    if js_exists:
        static_paths.append(StaticPathConfig(JS_PATH, js_path, cache_headers=False))
        if not await _register_lovelace_resource(hass, js_url):
            add_extra_js_url(hass, js_url)

    # Serve the config panel JS bundle
    if panel_exists:
        static_paths.append(
            StaticPathConfig(PANEL_JS_PATH, panel_js_path, cache_headers=False)
        )

    # Serve Hue icons (bundled from hass-hue-icons)
    if hue_exists:
        static_paths.append(
            StaticPathConfig(HUE_ICONS_PATH, hue_icons_path, cache_headers=False)
        )
        add_extra_js_url(hass, hue_icons_url)

    if static_paths:
        try:
            await hass.http.async_register_static_paths(static_paths)
        except ValueError:
            _LOGGER.debug("Static paths already registered, skipping")

    # Register sidebar panel (skip if already registered from a previous setup)
    if panel_exists and "glass-cards" not in hass.data.get("frontend_panels", {}):
        async_register_built_in_panel(
            hass,
            component_name="custom",
            sidebar_title="Glass Cards",
            sidebar_icon="mdi:cards",
            frontend_url_path="glass-cards",
            config={
                "_panel_custom": {
                    "name": "glass-config-panel",
                    "js_url": panel_js_url,
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
