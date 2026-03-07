"""Stub for homeassistant.components.http."""

from __future__ import annotations
from dataclasses import dataclass


@dataclass
class StaticPathConfig:
    """Configuration for a static path."""

    url_path: str
    path: str
    cache_headers: bool = True
