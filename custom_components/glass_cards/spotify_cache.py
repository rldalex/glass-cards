"""In-memory TTL cache for Spotify API responses."""
from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Any


@dataclass
class _CacheEntry:
    data: Any
    expires_at: float


class SpotifyCache:
    """Simple in-memory cache with TTL expiry and prefix invalidation."""

    def __init__(self, ttl: int = 300) -> None:
        self._ttl = ttl
        self._cache: dict[str, _CacheEntry] = {}

    def get(self, key: str) -> Any | None:
        entry = self._cache.get(key)
        if entry is None:
            return None
        if time.time() >= entry.expires_at:
            del self._cache[key]
            return None
        return entry.data

    def set(self, key: str, data: Any) -> None:
        self._cache[key] = _CacheEntry(data=data, expires_at=time.time() + self._ttl)

    def invalidate(self, prefix: str) -> None:
        keys = [k for k in self._cache if k.startswith(prefix)]
        for k in keys:
            del self._cache[k]

    def invalidate_all(self) -> None:
        self._cache.clear()
