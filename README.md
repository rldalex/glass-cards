# Glass Cards

A modular UI framework for Home Assistant with a neo-glassmorphism design language.

Glass Cards provides a zero-config Navbar that auto-discovers your HA Areas and entities, opening Room Popups with contextual cards (Light, Media, Climate, Fan, Cover, Camera, and more). All configuration is managed through a built-in Config Panel sidebar.

## Features

- **Auto-discovery** — Navbar detects your HA Areas and their entities automatically
- **12 cards** — Navbar, Room Popup, Light, Weather, Title, Cover, Media, Spotify, Presence, Fan, Camera Carousel, Climate
- **Dual-context** — Cards work standalone on the dashboard or inside Room Popups
- **Config Panel** — Built-in sidebar for all configuration, no YAML editing needed
- **Ambient background** — Dynamic day/night cycle background
- **i18n** — French and English translations

## Installation

### HACS (recommended)

1. Add this repository as a custom repository in HACS
2. Install "Glass Cards"
3. Restart Home Assistant

### Manual

1. Download the latest release from [GitHub Releases](https://github.com/rldalex/glass-cards/releases)
2. Copy `custom_components/glass_cards/` to your HA `config/custom_components/` directory
3. Restart Home Assistant

## Usage

Add a single card to your Lovelace dashboard:

```yaml
type: custom:glass-navbar-card
```

That's it. The Navbar auto-discovers your rooms and entities. Use the Config Panel (gear icon in the navbar) to customize cards, reorder rooms, and toggle dashboard visibility.

## Requirements

- Home Assistant 2024.1+
- A dark theme (Glass Cards is designed for dark mode)

## License

MIT
