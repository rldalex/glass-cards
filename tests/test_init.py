"""Tests for Glass Cards integration setup/unload."""

from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from custom_components.glass_cards import (
    _register_lovelace_resource,
    async_remove_entry,
    async_setup,
    async_setup_entry,
    async_unload_entry,
)
from custom_components.glass_cards.const import DOMAIN, JS_PATH


@pytest.fixture
def mock_entry():
    """Create a mock config entry."""
    entry = MagicMock()
    entry.data = {}
    return entry


class FakeResources:
    """Minimal stand-in for HA's storage-mode ResourceStorageCollection."""

    def __init__(self, items=None, loaded=True):
        self._items = list(items or [])
        self.loaded = loaded
        self.created: list[dict] = []
        self.deleted: list[str] = []
        self.updated: list[tuple[str, dict]] = []
        self.load_called = False

    async def async_load(self):
        self.load_called = True

    def async_items(self):
        return list(self._items)

    async def async_create_item(self, data):
        self.created.append(data)
        item = {"id": f"id{len(self._items)}", "type": data["res_type"], "url": data["url"]}
        self._items.append(item)
        return item

    async def async_delete_item(self, item_id):
        self.deleted.append(item_id)
        self._items = [i for i in self._items if i["id"] != item_id]

    async def async_update_item(self, item_id, changes):
        self.updated.append((item_id, changes))
        for item in self._items:
            if item["id"] == item_id:
                item.update(changes)


def _lovelace(resources):
    """Build a fake hass.data['lovelace'] holding the given resources object."""
    return SimpleNamespace(resources=resources)


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
                return_value=(False, False, False, "", "", ""),
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
                return_value=(True, True, True, "/glass_cards/glass-cards.js?v=abc", "/glass_cards/glass-cards-panel.js?v=def", "/glass_cards/hass-hue-icons.js?v=ghi"),
            ),
            patch("custom_components.glass_cards.add_extra_js_url") as mock_add_js,
        ):
            mock_store_cls.return_value.async_load = AsyncMock()
            await async_setup_entry(mock_hass_with_http, mock_entry)

            mock_hass_with_http.http.async_register_static_paths.assert_called_once()
            assert mock_add_js.call_count == 2

    @pytest.mark.asyncio
    async def test_skips_js_when_missing(self, mock_hass_with_http, mock_entry):
        """Should not register static path when JS file is missing."""
        with (
            patch("custom_components.glass_cards.GlassCardsStore") as mock_store_cls,
            patch(
                "custom_components.glass_cards._resolve_static_assets",
                return_value=(False, False, False, "", "", ""),
            ),
            patch("custom_components.glass_cards.add_extra_js_url") as mock_add_js,
        ):
            mock_store_cls.return_value.async_load = AsyncMock()
            await async_setup_entry(mock_hass_with_http, mock_entry)

            mock_hass_with_http.http.async_register_static_paths.assert_not_called()
            mock_add_js.assert_not_called()

    @pytest.mark.asyncio
    async def test_serves_js_without_hue_icons(self, mock_hass_with_http, mock_entry):
        """Should register main JS but not hue icons when hue file is missing."""
        with (
            patch("custom_components.glass_cards.GlassCardsStore") as mock_store_cls,
            patch(
                "custom_components.glass_cards._resolve_static_assets",
                return_value=(True, True, False, "/glass_cards/glass-cards.js?v=abc", "/glass_cards/glass-cards-panel.js?v=def", ""),
            ),
            patch("custom_components.glass_cards.add_extra_js_url") as mock_add_js,
        ):
            mock_store_cls.return_value.async_load = AsyncMock()
            await async_setup_entry(mock_hass_with_http, mock_entry)

            mock_hass_with_http.http.async_register_static_paths.assert_called_once()
            assert mock_add_js.call_count == 1


class TestRegisterLovelaceResource:
    """Tests for _register_lovelace_resource dedup/race handling."""

    @pytest.mark.asyncio
    async def test_returns_false_when_no_lovelace(self, mock_hass):
        """No lovelace data → caller should fall back to add_extra_js_url."""
        result = await _register_lovelace_resource(mock_hass, "/url?v=1")
        assert result is False

    @pytest.mark.asyncio
    async def test_returns_false_in_yaml_mode(self, mock_hass):
        """YAML-mode collections lack async_create_item → fall back."""
        yaml_resources = SimpleNamespace(async_items=lambda: [])
        mock_hass.data["lovelace"] = _lovelace(yaml_resources)
        result = await _register_lovelace_resource(mock_hass, "/url?v=1")
        assert result is False

    @pytest.mark.asyncio
    async def test_creates_resource_when_absent(self, mock_hass):
        """First registration creates exactly one resource and returns True."""
        resources = FakeResources()
        mock_hass.data["lovelace"] = _lovelace(resources)
        url = f"{JS_PATH}?v=abc"

        result = await _register_lovelace_resource(mock_hass, url)

        assert result is True
        assert resources.created == [{"res_type": "js", "url": url}]
        assert resources.deleted == []

    @pytest.mark.asyncio
    async def test_loads_store_before_reading_items(self, mock_hass):
        """An unloaded store must be loaded so async_items() is accurate."""
        resources = FakeResources(loaded=False)
        mock_hass.data["lovelace"] = _lovelace(resources)

        await _register_lovelace_resource(mock_hass, f"{JS_PATH}?v=abc")

        assert resources.load_called is True
        assert resources.loaded is True

    @pytest.mark.asyncio
    async def test_does_not_recreate_when_already_present(self, mock_hass):
        """An up-to-date single entry is left untouched (no duplicate created)."""
        url = f"{JS_PATH}?v=abc"
        resources = FakeResources([{"id": "a", "type": "js", "url": url}])
        mock_hass.data["lovelace"] = _lovelace(resources)

        result = await _register_lovelace_resource(mock_hass, url)

        assert result is True
        assert resources.created == []
        assert resources.deleted == []
        assert resources.updated == []

    @pytest.mark.asyncio
    async def test_purges_duplicates_and_updates_url(self, mock_hass):
        """Duplicates from earlier buggy reboots are purged; URL is refreshed."""
        old = f"{JS_PATH}?v=old"
        resources = FakeResources(
            [
                {"id": "a", "type": "js", "url": old},
                {"id": "b", "type": "js", "url": old},
                {"id": "c", "type": "js", "url": old},
            ]
        )
        mock_hass.data["lovelace"] = _lovelace(resources)
        new = f"{JS_PATH}?v=new"

        result = await _register_lovelace_resource(mock_hass, new)

        assert result is True
        assert resources.deleted == ["b", "c"]
        assert resources.updated == [("a", {"url": new})]
        assert resources.created == []

    @pytest.mark.asyncio
    async def test_error_during_normalization_does_not_fall_back(self, mock_hass):
        """A store error must return True (skip fallback): a resource persisted
        by a previous boot may already load the bundle, and stacking
        add_extra_js_url on top would execute it twice."""
        resources = FakeResources([{"id": "a", "type": "js", "url": f"{JS_PATH}?v=old"}])

        async def boom(*_a, **_k):
            raise RuntimeError("storage exploded")

        resources.async_update_item = boom  # normalization step fails
        mock_hass.data["lovelace"] = _lovelace(resources)

        result = await _register_lovelace_resource(mock_hass, f"{JS_PATH}?v=new")

        assert result is True

    @pytest.mark.asyncio
    async def test_ignores_panel_bundle_url(self, mock_hass):
        """The panel bundle must not be mistaken for the main bundle."""
        panel_url = "/glass_cards/glass-cards-panel.js?v=xyz"
        resources = FakeResources([{"id": "p", "type": "js", "url": panel_url}])
        mock_hass.data["lovelace"] = _lovelace(resources)
        url = f"{JS_PATH}?v=abc"

        await _register_lovelace_resource(mock_hass, url)

        # Panel entry untouched, main bundle created fresh.
        assert resources.deleted == []
        assert resources.created == [{"res_type": "js", "url": url}]


class TestAsyncSetupEntrySingleLoadPath:
    """async_setup_entry must load the main bundle through exactly one path."""

    @pytest.mark.asyncio
    async def test_uses_lovelace_resource_not_extra_js(
        self, mock_hass_with_http, mock_entry
    ):
        """With a working resource store, the main bundle is NOT added globally."""
        resources = FakeResources()
        mock_hass_with_http.data["lovelace"] = _lovelace(resources)
        with (
            patch("custom_components.glass_cards.GlassCardsStore") as mock_store_cls,
            patch(
                "custom_components.glass_cards._resolve_static_assets",
                return_value=(
                    True,
                    True,
                    True,
                    f"{JS_PATH}?v=abc",
                    "/glass_cards/glass-cards-panel.js?v=def",
                    "/glass_cards/hass-hue-icons.js?v=ghi",
                ),
            ),
            patch("custom_components.glass_cards.add_extra_js_url") as mock_add_js,
        ):
            mock_store_cls.return_value.async_load = AsyncMock()
            await async_setup_entry(mock_hass_with_http, mock_entry)

        # Main bundle via Lovelace resource; only hue icons via add_extra_js_url.
        assert resources.created == [{"res_type": "js", "url": f"{JS_PATH}?v=abc"}]
        assert mock_add_js.call_count == 1
        assert mock_add_js.call_args[0][1] == "/glass_cards/hass-hue-icons.js?v=ghi"

    @pytest.mark.asyncio
    async def test_falls_back_to_extra_js_without_lovelace(
        self, mock_hass_with_http, mock_entry
    ):
        """Without a resource store (YAML mode), fall back to add_extra_js_url."""
        with (
            patch("custom_components.glass_cards.GlassCardsStore") as mock_store_cls,
            patch(
                "custom_components.glass_cards._resolve_static_assets",
                return_value=(
                    True,
                    True,
                    False,
                    f"{JS_PATH}?v=abc",
                    "/glass_cards/glass-cards-panel.js?v=def",
                    "",
                ),
            ),
            patch("custom_components.glass_cards.add_extra_js_url") as mock_add_js,
        ):
            mock_store_cls.return_value.async_load = AsyncMock()
            await async_setup_entry(mock_hass_with_http, mock_entry)

        # No hue icons here, so the single call is the main-bundle fallback.
        assert mock_add_js.call_count == 1
        assert mock_add_js.call_args[0][1] == f"{JS_PATH}?v=abc"


class TestAsyncUnloadEntry:
    """Tests for async_unload_entry."""

    @pytest.mark.asyncio
    async def test_clears_hass_data(self, mock_hass, mock_entry):
        """Should remove DOMAIN from hass.data."""
        mock_hass.data[DOMAIN] = {"store": MagicMock()}
        with (
            patch("custom_components.glass_cards.async_remove_panel"),
            patch("custom_components.glass_cards.remove_extra_js_url"),
        ):
            result = await async_unload_entry(mock_hass, mock_entry)
        assert result is True
        assert DOMAIN not in mock_hass.data

    @pytest.mark.asyncio
    async def test_unload_when_not_setup(self, mock_hass, mock_entry):
        """Should handle unload when domain not in data."""
        with (
            patch("custom_components.glass_cards.async_remove_panel"),
            patch("custom_components.glass_cards.remove_extra_js_url"),
        ):
            result = await async_unload_entry(mock_hass, mock_entry)
        assert result is True

    @pytest.mark.asyncio
    async def test_removes_panel_and_extra_js(self, mock_hass, mock_entry):
        """Should undo the in-memory frontend registrations of this run."""
        mock_hass.data[DOMAIN] = {
            "store": MagicMock(),
            "extra_js_urls": ["/glass_cards/hass-hue-icons.js?v=abc"],
        }
        with (
            patch("custom_components.glass_cards.async_remove_panel") as mock_panel,
            patch("custom_components.glass_cards.remove_extra_js_url") as mock_js,
        ):
            await async_unload_entry(mock_hass, mock_entry)
        mock_panel.assert_called_once_with(
            mock_hass, "glass-cards", warn_if_unknown=False
        )
        mock_js.assert_called_once_with(
            mock_hass, "/glass_cards/hass-hue-icons.js?v=abc"
        )


class TestAsyncRemoveEntry:
    """async_remove_entry must delete the persisted Lovelace resource."""

    @pytest.mark.asyncio
    async def test_deletes_matching_resource(self, mock_hass, mock_entry):
        """The main-bundle resource is removed; unrelated entries are kept."""
        resources = FakeResources(
            [
                {"id": "a", "type": "js", "url": f"{JS_PATH}?v=abc"},
                {"id": "other", "type": "js", "url": "/other/card.js"},
            ]
        )
        mock_hass.data["lovelace"] = _lovelace(resources)

        await async_remove_entry(mock_hass, mock_entry)

        assert resources.deleted == ["a"]
        assert [i["id"] for i in resources.async_items()] == ["other"]

    @pytest.mark.asyncio
    async def test_loads_store_before_deleting(self, mock_hass, mock_entry):
        """An unloaded store must be loaded so the persisted entry is visible."""
        resources = FakeResources(
            [{"id": "a", "type": "js", "url": f"{JS_PATH}?v=abc"}], loaded=False
        )
        mock_hass.data["lovelace"] = _lovelace(resources)

        await async_remove_entry(mock_hass, mock_entry)

        assert resources.load_called is True
        assert resources.deleted == ["a"]

    @pytest.mark.asyncio
    async def test_no_lovelace_is_noop(self, mock_hass, mock_entry):
        """Removal without a resource store must not raise."""
        await async_remove_entry(mock_hass, mock_entry)

    @pytest.mark.asyncio
    async def test_yaml_mode_is_noop(self, mock_hass, mock_entry):
        """YAML-mode collections (no mutation API) are left untouched."""
        yaml_resources = SimpleNamespace(async_items=lambda: [])
        mock_hass.data["lovelace"] = _lovelace(yaml_resources)
        await async_remove_entry(mock_hass, mock_entry)
