"""Tests for SpotifyCache — in-memory TTL cache."""
import time
from unittest.mock import patch

import pytest

from custom_components.glass_cards.spotify_cache import SpotifyCache


class TestSpotifyCache:
    """Tests for SpotifyCache."""

    def setup_method(self):
        self.cache = SpotifyCache(ttl=2)

    def test_get_miss(self):
        assert self.cache.get("nonexistent") is None

    def test_set_and_get(self):
        self.cache.set("playlists:abc123", {"items": [1, 2, 3]})
        assert self.cache.get("playlists:abc123") == {"items": [1, 2, 3]}

    def test_ttl_expiry(self):
        self.cache.set("key", "value")
        with patch("time.time", return_value=time.time() + 3):
            assert self.cache.get("key") is None

    def test_invalidate_by_prefix(self):
        self.cache.set("saved_tracks:aaa", [1])
        self.cache.set("saved_tracks:bbb", [2])
        self.cache.set("playlists:ccc", [3])
        self.cache.invalidate("saved_tracks")
        assert self.cache.get("saved_tracks:aaa") is None
        assert self.cache.get("saved_tracks:bbb") is None
        assert self.cache.get("playlists:ccc") == [3]

    def test_invalidate_all(self):
        self.cache.set("a:1", "x")
        self.cache.set("b:2", "y")
        self.cache.invalidate_all()
        assert self.cache.get("a:1") is None
        assert self.cache.get("b:2") is None

    def test_overwrite_existing_key(self):
        self.cache.set("key", "old")
        self.cache.set("key", "new")
        assert self.cache.get("key") == "new"

    def test_default_ttl(self):
        cache = SpotifyCache()
        assert cache._ttl == 300
