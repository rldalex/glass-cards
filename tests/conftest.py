"""Shared fixtures for Glass Cards tests."""

from __future__ import annotations

from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from custom_components.glass_cards.const import DOMAIN
from custom_components.glass_cards.models import GlassCardsData
from custom_components.glass_cards.store import GlassCardsStore


@pytest.fixture
def mock_hass():
    """Create a mock HomeAssistant instance."""
    hass = MagicMock()
    hass.data = {}
    return hass


@pytest.fixture
def mock_store(mock_hass):
    """Create a GlassCardsStore with mocked storage."""
    with patch(
        "custom_components.glass_cards.store.Store"
    ) as mock_store_cls:
        mock_store_cls.return_value.async_load = AsyncMock(return_value=None)
        mock_store_cls.return_value.async_save = AsyncMock()
        store = GlassCardsStore(mock_hass)
        store._data = GlassCardsData()
        return store


@pytest.fixture
def mock_owner_user():
    """Create a mock owner user."""
    user = MagicMock()
    user.is_owner = True
    user.is_admin = True
    user.permissions = MagicMock()
    return user


@pytest.fixture
def mock_regular_user():
    """Create a mock non-admin user."""
    user = MagicMock()
    user.is_owner = False
    user.is_admin = False
    user.permissions = MagicMock()
    user.permissions.check_entity = MagicMock(return_value=False)
    return user


@pytest.fixture
def mock_connection(mock_owner_user):
    """Create a mock WebSocket connection."""
    conn = MagicMock()
    conn.user = mock_owner_user
    conn.send_result = MagicMock()
    conn.send_error = MagicMock()
    return conn


@pytest.fixture
def hass_with_store(mock_hass, mock_store):
    """Create a hass instance with the store registered."""
    mock_hass.data[DOMAIN] = {"store": mock_store}
    return mock_hass
