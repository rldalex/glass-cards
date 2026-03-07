"""Tests for Glass Cards store."""

from unittest.mock import AsyncMock, patch

import pytest

from custom_components.glass_cards.models import GlassCardsData, RoomConfig
from custom_components.glass_cards.store import GlassCardsStore


@pytest.fixture
def store(mock_hass):
    """Create a store with mocked HA storage."""
    with patch("custom_components.glass_cards.store.Store") as mock_cls:
        mock_cls.return_value.async_load = AsyncMock(return_value=None)
        mock_cls.return_value.async_save = AsyncMock()
        return GlassCardsStore(mock_hass)


class TestGlassCardsStore:
    """Tests for GlassCardsStore."""

    @pytest.mark.asyncio
    async def test_load_empty(self, store):
        """Test loading with no saved data."""
        await store.async_load()
        assert store.data.rooms == {}
        assert store.data.navbar.room_order == []

    @pytest.mark.asyncio
    async def test_load_existing(self, mock_hass):
        """Test loading with existing data."""
        saved_data = {
            "navbar": {"room_order": ["a"], "hidden_rooms": []},
            "rooms": {
                "a": {
                    "area_id": "a",
                    "card_order": ["light"],
                    "hidden_entities": [],
                    "icon": "mdi:sofa",
                    "label": None,
                    "visible": True,
                }
            },
        }
        with patch("custom_components.glass_cards.store.Store") as mock_cls:
            mock_cls.return_value.async_load = AsyncMock(return_value=saved_data)
            mock_cls.return_value.async_save = AsyncMock()
            store = GlassCardsStore(mock_hass)
            await store.async_load()

        assert store.data.navbar.room_order == ["a"]
        assert "a" in store.data.rooms
        assert store.data.rooms["a"].icon == "mdi:sofa"

    @pytest.mark.asyncio
    async def test_save(self, store):
        """Test saving data."""
        store._data = GlassCardsData()
        store._data.rooms["test"] = RoomConfig(area_id="test")
        await store.async_save()
        store._store.async_save.assert_called_once()
        saved = store._store.async_save.call_args[0][0]
        assert "test" in saved["rooms"]

    def test_data_property(self, store):
        """Test data property returns current data."""
        assert isinstance(store.data, GlassCardsData)
