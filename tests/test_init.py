"""Tests for Glass Cards integration setup/unload."""

from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from custom_components.glass_cards import async_setup, async_setup_entry, async_unload_entry
from custom_components.glass_cards.const import DOMAIN


@pytest.fixture
def mock_entry():
    """Create a mock config entry."""
    entry = MagicMock()
    entry.data = {}
    return entry


@pytest.fixture
def mock_hass_with_http(mock_hass):
    """Create a mock hass with http attribute."""
    mock_hass.http = MagicMock()
    mock_hass.http.async_register_static_paths = AsyncMock()
    # async_add_executor_job runs the function directly (no real thread in tests)
    mock_hass.async_add_executor_job = AsyncMock(side_effect=lambda fn, *a: fn(*a))
    return mock_hass


class TestAsyncSetup:
    """Tests for async_setup."""

    @pytest.mark.asyncio
    async def test_registers_ws_commands(self, mock_hass):
        """Should register WS commands and return True."""
        with patch(
            "custom_components.glass_cards.async_register_commands"
        ) as mock_register:
            result = await async_setup(mock_hass, {})
            assert result is True
            mock_register.assert_called_once_with(mock_hass)


class TestAsyncSetupEntry:
    """Tests for async_setup_entry."""

    @pytest.mark.asyncio
    async def test_sets_up_store(self, mock_hass_with_http, mock_entry):
        """Should load store and register in hass.data."""
        with (
            patch("custom_components.glass_cards.GlassCardsStore") as mock_store_cls,
            patch(
                "custom_components.glass_cards._resolve_static_assets",
                return_value=(False, False, "", ""),
            ),
        ):
            mock_store_cls.return_value.async_load = AsyncMock()
            result = await async_setup_entry(mock_hass_with_http, mock_entry)

            assert result is True
            assert DOMAIN in mock_hass_with_http.data
            assert "store" in mock_hass_with_http.data[DOMAIN]
            mock_store_cls.return_value.async_load.assert_called_once()

    @pytest.mark.asyncio
    async def test_serves_js_bundle(self, mock_hass_with_http, mock_entry):
        """Should register static path when JS file exists."""
        with (
            patch("custom_components.glass_cards.GlassCardsStore") as mock_store_cls,
            patch(
                "custom_components.glass_cards._resolve_static_assets",
                return_value=(True, True, "/glass_cards/glass-cards.js?v=abc", "/glass_cards/glass-cards-panel.js?v=def"),
            ),
            patch("custom_components.glass_cards.add_extra_js_url") as mock_add_js,
        ):
            mock_store_cls.return_value.async_load = AsyncMock()
            await async_setup_entry(mock_hass_with_http, mock_entry)

            mock_hass_with_http.http.async_register_static_paths.assert_called_once()
            mock_add_js.assert_called_once()

    @pytest.mark.asyncio
    async def test_skips_js_when_missing(self, mock_hass_with_http, mock_entry):
        """Should not register static path when JS file is missing."""
        with (
            patch("custom_components.glass_cards.GlassCardsStore") as mock_store_cls,
            patch(
                "custom_components.glass_cards._resolve_static_assets",
                return_value=(False, False, "", ""),
            ),
            patch("custom_components.glass_cards.add_extra_js_url") as mock_add_js,
        ):
            mock_store_cls.return_value.async_load = AsyncMock()
            await async_setup_entry(mock_hass_with_http, mock_entry)

            mock_hass_with_http.http.async_register_static_paths.assert_not_called()
            mock_add_js.assert_not_called()


class TestAsyncUnloadEntry:
    """Tests for async_unload_entry."""

    @pytest.mark.asyncio
    async def test_clears_hass_data(self, mock_hass, mock_entry):
        """Should remove DOMAIN from hass.data."""
        mock_hass.data[DOMAIN] = {"store": MagicMock()}
        result = await async_unload_entry(mock_hass, mock_entry)
        assert result is True
        assert DOMAIN not in mock_hass.data

    @pytest.mark.asyncio
    async def test_unload_when_not_setup(self, mock_hass, mock_entry):
        """Should handle unload when domain not in data."""
        result = await async_unload_entry(mock_hass, mock_entry)
        assert result is True
