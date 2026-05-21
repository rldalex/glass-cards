# Glass Cards

A modular UI framework for Home Assistant with a neo-glassmorphism design language.

Glass Cards provides a zero-config Navbar that auto-discovers your Home Assistant Areas and their entities, opening Room Popups with contextual cards. Every card is dual-context: it works standalone on the dashboard, or inside a Room Popup. All configuration goes through a built-in Config Panel sidebar, no YAML.

## Features

- **Auto-discovery** of Areas, entities and their device classes
- **14 cards** covering the most common Home Assistant domains
- **Dual-context** rendering: standalone on dashboard or inside Room Popups
- **Config Panel sidebar** with per-card tabs, live preview, save/reset
- **Ambient background** with a dynamic day/night cycle
- **i18n** in French and English

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

That's it. The Navbar auto-discovers your rooms and their entities. Use the Config Panel (gear icon in the navbar) to customize cards, reorder rooms, and toggle dashboard visibility.

## Cards

### Navbar card

Single entry point of Glass Cards. Lists every Home Assistant Area as a rounded pill, with an icon picked from the Area's first matching entity (or the user-chosen icon in the Config Panel). Tap opens the matching Room Popup, long-press jumps to the Area page in HA.

The Navbar also exposes the Config Panel toggle and the day/night ambient background lives behind it.

### Room Popup

Modal dialog opened when you tap a room in the Navbar. Built on `<ha-wa-dialog>` (WebAwesome) with Glass Cards' glass recipe. Inside, the popup composes the relevant entity cards in a fixed order (Light, Media, Climate, Fan, Cover, Vacuum, …) and only renders those that have entities for that Area. Tap outside or press Escape to close.

### Light card

Domain: `light`. Lists every light in the room with:
- Icon button (tap to toggle on/off)
- Name + status line (brightness % for dimmable, colour name for RGB, kelvin label for color_temp, "On"/"Off" for simple)
- State dot (or a red alert badge if `unavailable`)

Long-press an `on` light to open its **control fold**:
- **Intensité** brightness slider (1-100%)
- **Température** kelvin slider with a warm/cool gradient
- **Couleur** 6 preset color dots plus a HSL wheel picker
- **Effets** dedicated pills with icons (Off, Bougie, Feu)

In a 2-up compact pair the fold separator is anchored under the lamp you opened, so it's always clear which fold controls which lamp. The active color/effect ring uses the lamp's own colour. The card itself shows an atmospheric halo whose intensity reflects the average brightness of the lamps that are on (one lamp at 100% glows brighter than three lamps at 10%).

### Media card

Domain: `media_player`. Two render modes:
- **Dashboard mode** picks the currently active master player and shows a full hero card with artwork, title, artist, transport (play / pause / next / prev), and an expandable fold
- **Room Popup mode** lists every player in the room with the same hero-then-fold pattern

The fold has two tabs:
- **Contrôles** — volume bar (mute icon integrated in the slider), source chips, sound-mode chips, and a multiroom **Enceintes** section listing every group-capable speaker in the home with an icon-toggle to join/unjoin and an inline volume slider per speaker. Master and joined speakers share the same white tint, ungrouped speakers are dimmed.
- **File d'attente** — the Sonos / Music Assistant queue with track number, title, artist, radio badge, and a remove button per track.

Volume sliders are full keyboard a11y: arrows ±5, PageUp/Down ±10, Home/End jump to 0/100.

### Spotify card

Companion card for the [Spotcast](https://github.com/fondberg/spotcast) integration. Shows the user's playlists, recent tracks and saved shows, with one-click play to any media player (the device picker reuses the same speaker list). Used in popups for an instant "play X here" affordance.

### Climate card

Domain: `climate`. Two render modes:
- **List mode** (default in popups) — one row per thermostat with current/target temp, mode dot, expand-fold
- **Normal mode** (dashboard standalone) — large arc gauge per thermostat with the action colour (heat/cool/idle/preheating) animated into the arc

The fold groups:
- HVAC modes (off, heat, cool, auto, dry, fan_only) as pills with mode-specific colours
- Temperature stepper (or dual-temperature stepper if the device supports a heat/cool range)
- Presets (Eco, Away, Comfort, …) when supported
- An **Air** section with fan mode, swing mode, target humidity slider, and aux-heat toggle (only the controls the device actually supports)

### Fan card

Domain: `fan`. Lists every fan with a spinning icon whose RPM matches the current speed, plus a row whose direction (forward / reverse) is shown by the spin direction.

Long-press a fan to open the **control fold** (skipped entirely for plain on/off fans):
- **Vitesse** — N stepped buttons matched to the device's `speed_count`, plus a continuous slider for advanced fans
- **Mode** — preset chips (Sleep, Whoosh, Auto, Quiet, …) with icons
- **Direction** — Forward / Reverse toggle
- **Oscillation** — switch
- Ceiling-light sub-row when the fan has an integrated light entity

Half-width fold separator under the fan you opened in a 2-up pair.

### Cover card

Domain: `cover`. Lists every blind / shutter / garage / gate / awning / door / window with a device-class-specific icon set.

The closed-card row shows the device-appropriate state ("Ouvert" / "Fermé" / "Ouverture…" / "Fermeture…" / "À 60%"). Long-press opens the fold:
- A transport row with the three buttons that match the device class (no generic up/down arrows on a gate, no shutter chevrons on a garage)
- **Position** slider with device-class icons at each end (only for entities that support `SET_POSITION`)
- **Inclinaison** slider for tilt-capable blinds (`SET_TILT_POSITION`)
- **Préréglages** chips with user-defined positions (0 / 25 / 50 / 75 / 100% by default, overridable per entity in the Config Panel)

### Camera Carousel card

Domain: `camera`. Horizontal swipeable carousel of every camera in the room. Each slide shows a still snapshot refreshed on a configurable interval (default 30s), with the camera name and a tap-to-fullscreen button. Snapshots are fetched via the HA WebSocket camera proxy, no extra config.

### Weather card

Domain: `weather`. Shows current conditions (temperature, condition icon, "feels like", wind, humidity, pressure) and a 5-day forecast strip. Uses the new HA `weather.subscribe_forecast` WebSocket call for live updates, fallbacks to the legacy attribute polling if the entity doesn't support subscriptions.

The card adapts its ambient halo to the condition (sunny → warm, rainy → cold blue, snow → cool white, etc).

### Presence card

Domain: `person`. Shows family members with their avatar, current zone (Home, Away, named zones), distance from home, and a fold with health metrics from the HA Companion app (heart rate, SpO2, daily steps) when available.

Per-person mapping in the Config Panel: each person can be tied to a smartphone battery sensor, a notification service, a driving sensor (`binary_sensor`), and a sleeping sensor (`input_boolean` or `binary_sensor`). When the latter is `on`, the avatar desaturates and a "zzz" badge anchors top-left of the avatar with a slow breathing animation (3.2s cycle, reduced-motion safe).

The battery chip reflects the **charging state**: when the smartphone battery's `is_charging` attribute is truthy, the icon swaps to `mdi:battery-charging-XX` and pulses subtly.

Tapping an avatar dims the other persons (`opacity: 0.32`) to make the active selection obvious without repeating the name in the fold. The fold also exposes a "Send notification" textarea that calls the matching notify service.

### Calendar card

Domain: `calendar`. Compact closed bar with the day label and the event count, expandable into a week strip (7 day chips with per-day event counts) plus an event list for the selected day. Each event row shows the calendar's colour dot, time range, title, and a "now" highlight when the event is in progress.

Loaded via HA's REST API for the 7-day window, so it works on every calendar integration HA supports (Google, CalDAV, Local Calendar, …).

### Title card

Single-row title with a colour-aware accent dot. Used inside Room Popups to label sections; configurable per popup in the Config Panel.

### Config Panel

Sidebar panel (gear icon in the Navbar) that hosts every card's configuration tab. Each tab provides:
- Settings specific to the card (entities to include / exclude, presets, sensor mappings, …)
- A live preview that mirrors the dashboard
- A save / reset bar

Configuration is stored server-side via dedicated WebSocket commands, broadcast back to every dashboard with `glass_cards_config_changed` so all tabs stay in sync across browsers.

The **Dashboard** tab controls which cards appear on the HA dashboard. Each standalone card listens for `dashboard-config-changed` and hides itself in real-time when toggled off.

## Visual language

- **Tokens**: `--radius-xl/lg/md/sm`, `--t1`-`--t4` text, `--s1`-`--s4` surfaces, `--b1`-`--b3` borders, `--c-success/alert/warning/info/accent` colours, `--t-slow/med/fast/layout` transitions
- **Glass recipe**: 4-layer composite (gradient bg + `backdrop-filter: blur(40px) saturate(1.4)` + composite box-shadow + fine border)
- **Folds** open via CSS Grid `0fr → 1fr` rows (never animate height/padding/margin); each fold opens with a gradient separator that's anchored under the opened item in compact pairs
- **Section eyebrows**: every fold section title uses the same uppercase letter-spaced label (no dot) for visual consistency across cards
- **Motion**: `prefers-reduced-motion` gated everywhere
- **A11y**: every interactive element is a real `<button>` with an `aria-label`; sliders carry `role="slider"` + `aria-valuenow/min/max` and full keyboard nav; popups have `role="dialog"` and `aria-modal="true"`

## Requirements

- Home Assistant 2024.1+
- A dark theme (Glass Cards is designed for dark backgrounds)

## License

MIT
