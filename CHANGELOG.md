# Changelog

All notable changes to Glass Cards are documented here.

## v0.0.137 (2026-03-20)

### Title Card
- feat: period indicator with sliding carousel
- fix: hardcode period indicator, remove color picker, use area sensors
- fix: use correct period entity `input_select.periode_journee`

### Climate Card
- feat: dual-mode display (list + arc gauge), independent dashboard/popup modes
- feat: entity tabs with room icons, display mode selector in config
- fix: code review (23 issues), prototype conformity, arc gauge layout

### Navbar
- fix: hide temp/humidity badges when sensor value is not numeric

## v0.0.116 (2026-03-13)

### Media Card
- refactor: queue system rewrite (Sonos-only, optimistic skip)
- fix: queue reliability (off-by-one, deadlock, flash, speaker-aware refresh)
- style: controls uniformized to white

### Config Panel
- feat: room assignment tab with entity rename

## v0.0.98 (2026-03-12)

### Camera Carousel Card
- feat: full-stack implementation with live stream via `ha-camera-stream`
- feat: AI alert sort, bilingual companion discovery (EN+FR), auto-track
- fix: code review (6 issues), popup layout (16/9 ratio, compact)

### Spotify Card
- feat: fold/collapse, multiroom speaker picker, favorites heart
- feat: now-playing EQ, radio queue bus events, library pagination
- fix: code review, config panel tab

### Media Card
- feat: full-bleed artwork hero, glass overlay panels, real-time progress
- feat: smart multiroom join/unjoin, swipe slide animation
- fix: sort, scroll, room stability, mobile hover

### Fan Card
- feat: speed steps, compact mode, simple toggle, ceiling light
- feat: config panel room management, dashboard integration

### Cover Card
- feat: per-entity presets, compact mode, click-outside-to-collapse

### Presence Card
- feat: full implementation with health/notification zones
- feat: config panel with search dropdowns
- fix: code review (11 issues), singular/plural title

### Navbar
- feat: adaptive icon colors (IntersectionObserver + MutationObserver)

### Cross-cards
- feat: mobile touch feedback (premium press), hover navigation arrows
- feat: hide HA header/sidebar toggles
- style: unified card headers

## v0.0.50 (2026-03-10)

### Presence Card
- feat: initial implementation with config panel and dashboard integration

### Media Card
- feat: room-based card with swipe navigation

## v0.0.18 (2026-03-09)

### Cover Card
- feat: initial implementation with config panel

### Spotify Card
- feat: initial implementation with backend, config panel, setup guide

### Title Card
- feat: scene labels, optional icons

### Code Quality
- fix: code review (20 bugs across all components)

## v0.0.10 (2026-03-09)

### Title Card
- feat: initial implementation with mode cycling, hex colors
- feat: config panel tab with color picker (HSL wheel + swatches)

### Code Quality
- fix: code review (27 fixes — ha-icon centering, load guards, error handling)

## v0.0.2 (2026-03-08)

### Navbar
- feat: indicators (humidity bar, temp badges, glow)
- fix: overlay split z-index, config ready flag, scroll optimization

## v0.0.1 (2026-03-08)

### Initial Release
- Navbar card with auto-discovery of HA Areas
- Room Popup with scenes and ordered cards
- Light card (dual-context, brightness slider, RGB, color temp, presets)
- Weather card (sparkline, forecast tabs, ambient background)
- Config Panel sidebar (dashboard, navbar, popup, light, weather tabs)
- Backend Python integration (WebSocket API, store, permissions)
- i18n support (French, English)
- Ambient day/night background cycle
