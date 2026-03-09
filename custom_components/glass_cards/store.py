"""Persistent storage for Glass Cards using HA Store."""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION
from .models import GlassCardsData

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)


class GlassCardsStore:
    """Manage Glass Cards persistent data."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the store."""
        self._store: Store[dict[str, Any]] = Store(
            hass,
            STORAGE_VERSION,
            STORAGE_KEY,
            minor_version=1,
        )
        self._data: GlassCardsData = GlassCardsData()

    @property
    def data(self) -> GlassCardsData:
        """Return current data."""
        return self._data

    async def async_load(self) -> None:
        """Load data from storage.

        GlassCardsData.from_dict is designed to be forward-compatible:
        missing keys get default values, unknown keys are ignored.
        This means new fields added in future versions are handled
        gracefully without requiring a storage migration.
        """
        stored = await self._store.async_load()
        if stored:
            try:
                self._data = GlassCardsData.from_dict(stored)
            except Exception:
                _LOGGER.exception(
                    "Failed to load Glass Cards config — starting with defaults. "
                    "The old config file is preserved in .storage/%s",
                    STORAGE_KEY,
                )
                self._data = GlassCardsData()

    async def async_save(self) -> None:
        """Save data to storage."""
        await self._store.async_save(self._data.to_dict())
