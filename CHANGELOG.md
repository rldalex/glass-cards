# Changelog

All notable changes to Glass Cards are documented here.

## v0.0.177 (2026-04-06)

### Calendar Card — Audit UX
- refactor: suppression de la mini-grille mois dans le fold (simplification)
- feat: week strip forward-looking (aujourd'hui + 6 prochains jours au lieu de la semaine calendaire)
- feat: liste d'evenements avec filtrage des passes, etat "En cours" avec glow accent, empty state
- fix: touch targets 44px sur barre compacte, toggle, jours et evenements
- fix: contraste texte rehausse (labels --t3 au lieu de --t4, tailles min 10px)
- a11y: prefers-reduced-motion respecte (CSS + arret du ticker), aria-live sur le ticker

### Title Card — Audit UX
- fix: touch targets 44px via hit area invisible (dash trigger + chips) sans changer la taille visuelle
- fix: period indicator crossfade au lieu de slide horizontal (supprime la fausse affordance de swipe)
- fix: pulse de confirmation uniforme sur input_select, scenes et booleans
- fix: contraste labels, chip scale 0.98, dash line 3px, alignement espacements prod/prototype
- a11y: prefers-reduced-motion, aria-live sur le period indicator

## v0.0.176 (2026-04-06)

### Config Panel — Cover Dashboard Layout
- feat(cover): choix compact/full par entité dans l'onglet dashboard, identique au fonctionnement des pièces
- migration automatique de l'ancien booléen global `dashboard_compact` vers les layouts par entité

### Persistance
- fix: suppression des auto-saves parasites déclenchés lors du chargement de la config (flag `_loading` dans BaseConfigTab)
- fix: les édits en cours ne sont plus écrasés quand le parent recharge la config

## v0.0.175 (2026-04-04)

### Config Panel — Visibilité des entités
- feat(camera): toggle par caméra pour masquer/afficher sur le dashboard, avec auto-save
- feat(climate): réordonnement et toggle de visibilité des thermostats en mode dashboard
- feat(media): toggle par lecteur média pour masquer/afficher sur le dashboard
- fix(climate): le mode normal respecte l'ordre utilisateur au lieu de trier par action HVAC

### Navbar — Tri par présence
- feat: toggle "Tri auto par lumières" et "Tri auto par présence" par pièce
- feat: sélection du capteur de présence par pièce (auto-détection ou choix manuel)
- feat: les pièces occupées remontent dans la navbar comme les pièces éclairées

### Design System
- feat: couleurs de domaine centralisées dans `DOMAIN_COLORS` (ui-core), valeurs hex fixes indépendantes du thème
- fix: alignement des couleurs d'icônes entre le dashboard et les vues room du config panel

### Camera Carousel
- fix: le clic/tap sur la caméra lance le stream live (gesture handler corrigé)
- fix: l'indicateur REC ne s'affiche que lorsque le stream est en live

## v0.0.174 (2026-03-27)

### UI Consistency
- fix: toggle switch du header cover et fan aligne sur le style standard de la light card (pill avec knob glissant)
- chore: `.claude/` exclu du lint ESLint, correction erreur `no-explicit-any` dans resize-mixin

### Mobile UX
- fix: le dashboard ne defile plus derriere le popup room ouvert (scroll lock body + touch-action overlay)
- fix: suppression du rectangle bleu au tap sur les sliders (`-webkit-tap-highlight-color` sur glass-slider + hostMixin global)
- fix: le peek animation des scenes ne fait plus scintiller le backdrop du popup (`contain: layout style`)

## v0.0.158 (2026-03-26)

### Responsive Design System
- feat: suppression du max-width 31.25rem hardcode sur les 11 cartes — les cartes remplissent 100% du conteneur HA (Masonry, Sections, layouts custom)
- feat: design system responsive — ResizeObserver dans BaseCard, attribut `size` (xs/sm/md/lg/xl) sur toutes les cartes
- feat: spacing tokens `--sp-1` a `--sp-10` dans glassTokens
- feat: breakpoints, resize-mixin et base-styles exportes depuis ui-core

### Config Panel
- feat: breakpoints responsive pour le config panel — page-wrap adaptatif (40rem tablette, 56rem desktop, 72rem ultrawide)
- feat: grille des pieces et icon picker adaptent le nombre de colonnes selon la taille d'ecran
- fix: contenu des tabs limite a 40rem pour la lisibilite des formulaires sur grand ecran

### Corrections
- fix: detection de swipe preservee lors du mouvement horizontal du doigt (le mouvement vertical annule le geste, pas l'horizontal)
- fix: fond focus-within persistant sur la cover card apres ouverture du fold
- fix: fallback placeholder quand l'artwork media echoue (Sonos Bluetooth — proxy HA retourne HTTP 500)
- fix: swipe fonctionne sur le placeholder de la camera carousel meme quand le stream n'est pas live
- fix: revert de l'override responsive sur light/cover/fan qui cassait le mode compact 2 colonnes sur mobile
- fix: race condition navbar au premier chargement — attente du custom element popup + updates autorisees pendant le chargement config

## v0.0.147 (2026-03-26)

### Mobile UX
- fix: remplacement des 55 `transition: all` par des proprietes explicites sur 12 cartes — elimine le scintillement des icones lors des animations fold
- fix: desactivation du copier-coller par appui long sur toutes les cartes (`user-select: none`)
- fix: rectangle bleu au tap sur light card (tap highlight + pointer-events isolation sur les folds)
- fix: grille config panel passe a 3 colonnes sur mobile (au lieu de 4 trop petites)

### Navbar
- feat: hauteur augmentee de 58px a 64px, icones proportionnellement agrandies (22→24px)
- feat: bouton parametres visible uniquement pour les admins (`hass.user.is_admin`)

### Haptic & Scrollbars
- fix: retour haptique unifie en `light` partout (convention HA officielle)
- fix: scrollbars masquees globalement (dropdowns, icon pickers, grilles inline)

### Fan Card
- fix: affichage vitesse simplifie au pourcentage seul (suppression "Vitesse 1/6")

### Hue Icons
- feat: integration de hass-hue-icons v1.2.53 (512 icones SVG Philips Hue, licence MIT)
- les icones sont disponibles comme `hue:nom-icone` dans tout HA sans installation separee

## v0.0.144 (2026-03-25)

### Config Panel
- fix: les tabs dashboard recoivent le bon slice de config via `_sliceFor()` — corrige la persistance des reglages (display mode climate, etc.)
- fix: suppression du pass-through save qui ecrasait les configs individuelles des tabs
- feat: selecteur d'entites volets pour le dashboard (cover dashboard entity picker)
- feat: reordonnement des personnes par drag-and-drop dans la carte presence
- feat: numeros d'ordre sur les grilles pieces et cartes dashboard
- feat: toggles deplaces en bas des cartes grille avec separateur et label Active/Desactive
- fix: toggle mode d'affichage climat adapte au contexte (dashboard vs popup)
- fix: tab entites orphelines — layout restructure, scrollbar masquee, breadcrumb renomme
- fix: capteurs smartphone presence compactes (labels redondants supprimes)
- fix: ombres des cartes preview visibles (padding panel + overflow visible sur folds ouverts)
- fix: suppression du separateur permanent dans le detail de piece

### Climate Card
- feat: gestes uniformises — tap = toggle on/off, long-press = expand controles (liste et normal)
- feat: tabs entites affichent le nom de la piece sur l'onglet selectionne
- i18n: Climat renomme en Thermostat (fr)

### Base Card / Preview
- fix: fallback `visibleAreaIds` sur toutes les areas `hass.areas` pour les previews (light, climate, fan)
- feat: title card affiche un placeholder en mode configPreview quand le titre est vide

## 2026-03-25

### Config Panel
- refactor: suppression complete du systeme de preview custom (~2600 lignes CSS + render code)
- feat: live card preview — les vraies cartes s'affichent dans chaque tab du config panel en mode lecture seule
- refactor: BaseConfigTab centralise auto-save (debounce), template method save/_performSave, drag/drop, dropdown, room entity helpers
- refactor: suppression du routing save via persistence.ts — chaque tab se sauvegarde directement
- fix: breadcrumb traduit en francais dans les sous-tabs dashboard
- fix: onglet par defaut = Dashboard au lieu de Pieces
- fix: ombres des cartes non clippees (overflow-x: clip)
- fix: toast de sauvegarde en position fixed (visible en toutes circonstances)
- fix: suppression du separateur gradient dans le tab Dashboard

### Base Card
- feat: propriete `configPreview` — desactive gestes et service calls en mode preview
- feat: helper `_safeCallService` — guard pour bloquer les appels de service en preview
- refactor: migration des 9 cartes vers `_safeCallService` (80 appels)

### Event Bus
- fix: singleton global `window.__glassEventBus` — partage du bus entre bundles IIFE (dashboard + panel)

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
