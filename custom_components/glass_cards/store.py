"""Persistent storage for Glass Cards using HA Store."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION
from .models import GlassCardsData

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant


class GlassCardsStore:
    """Manage Glass Cards persistent data."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the store."""
        self._store: Store[dict[str, Any]] = Store(
            hass, STORAGE_VERSION, STORAGE_KEY
        )
        self._data: GlassCardsData = GlassCardsData()

    @property
    def data(self) -> GlassCardsData:
        """Return current data."""
        return self._data

    async def async_load(self) -> None:
        """Load data from storage."""
        stored = await self._store.async_load()
        if stored:
            self._data = GlassCardsData.from_dict(stored)

    async def async_save(self) -> None:
        """Save data to storage."""
        await self._store.async_save(self._data.to_dict())
