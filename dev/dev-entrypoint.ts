// Router for the dev harness. Picks a card setup based on ?card=<id>.
// Available setups live in dev/setup-*.ts and are imported lazily so each
// bundle only pulls in the dependencies of the card under development.

import { installHistoryIntercept } from '@glass-cards/event-bus';
import { getThemeManager } from '@glass-cards/ui-core';
import './mock-ha-icon';
import { mountAgentation } from './agentation-mount';

// ───────────────────────── Setup registry ─────────────────────────

interface SetupEntry {
  id: string;
  label: string;
  description: string;
  load: () => Promise<() => Promise<void>>;
}

const SETUPS: SetupEntry[] = [
  {
    id: 'climate',
    label: 'Climate Card',
    description: 'Thermostat — list & normal modes, 8 scenarios, popup/dashboard contexts.',
    load: () => import('./setup-climate').then((m) => m.setupClimate),
  },
  {
    id: 'config-panel',
    label: 'Config Panel',
    description: 'Configuration panel — full house mock (5 rooms, all card domains).',
    load: () => import('./setup-config-panel').then((m) => m.setupConfigPanel),
  },
  {
    id: 'calendar',
    label: 'Calendar Card',
    description: 'Calendrier compact + fold — 3 scénarios (chargé, léger, vide).',
    load: () => import('./setup-calendar').then((m) => m.setupCalendar),
  },
  {
    id: 'light',
    label: 'Light Card',
    description: '4 types de lampes (simple/dimmable/color_temp/RGB) + multi-pièce.',
    load: () => import('./setup-light').then((m) => m.setupLight),
  },
  {
    id: 'cover',
    label: 'Cover Card',
    description: 'Tous device_class (shutter/blind/curtain/garage/gate/door) + tilt.',
    load: () => import('./setup-cover').then((m) => m.setupCover),
  },
  {
    id: 'fan',
    label: 'Fan Card',
    description: 'Simple/speed/oscillating/direction/preset + multi-ventilos.',
    load: () => import('./setup-fan').then((m) => m.setupFan),
  },
  {
    id: 'presence',
    label: 'Presence Card',
    description: 'Solo/couple/famille avec smartphone sensors (battery, location, driving).',
    load: () => import('./setup-presence').then((m) => m.setupPresence),
  },
  {
    id: 'weather',
    label: 'Weather Card',
    description: '6 conditions (sunny/cloudy/rainy/snowy/stormy/clear-night) + forecast.',
    load: () => import('./setup-weather').then((m) => m.setupWeather),
  },
  {
    id: 'media',
    label: 'Media Card',
    description: 'Playing/paused/idle/off + Sonos groupés + multi-pièce.',
    load: () => import('./setup-media').then((m) => m.setupMedia),
  },
  {
    id: 'title',
    label: 'Title Card',
    description: 'Titre + période + sources (input_select/scenes/booleans).',
    load: () => import('./setup-title').then((m) => m.setupTitle),
  },
  {
    id: 'spotify',
    label: 'Spotify Card',
    description: 'Browse playlists / recently_played / saved_tracks + search.',
    load: () => import('./setup-spotify').then((m) => m.setupSpotify),
  },
  {
    id: 'camera-carousel',
    label: 'Camera Carousel',
    description: 'Multi cameras avec motion/recording/AI person via companion entities.',
    load: () => import('./setup-camera-carousel').then((m) => m.setupCameraCarousel),
  },
  {
    id: 'navbar',
    label: 'Navbar Card',
    description: 'Full house — auto-discovery rooms + dashboard cards stack.',
    load: () => import('./setup-navbar').then((m) => m.setupNavbar),
  },
  {
    id: 'popup',
    label: 'Popup Card',
    description: 'Popup pièce ouvert avec sub-cards mountées dynamiquement.',
    load: () => import('./setup-popup').then((m) => m.setupPopup),
  },
  {
    id: 'vacuum',
    label: 'Vacuum Card',
    description: 'Roborock Saros 10R — 9 scenarios (docked/cleaning/returning/error/...) avec auto-discovery 49 entités.',
    load: () => import('./setup-vacuum').then((m) => m.setupVacuum),
  },
];

// ───────────────────────── Boot ─────────────────────────

installHistoryIntercept();
getThemeManager().applyAmbient('day');

const params = new URLSearchParams(window.location.search);
const cardId = params.get('card');
const target = SETUPS.find((s) => s.id === cardId);

if (target) {
  void target.load().then((run) => run()).then(() => mountAgentation());
} else {
  renderLanding();
}

console.log('[Glass Cards Dev]', { cardId, available: SETUPS.map((s) => s.id) });

// ───────────────────────── Landing page ─────────────────────────

function renderLanding(): void {
  document.body.replaceChildren();
  document.body.style.cssText = `
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: linear-gradient(135deg, #1a1f2e 0%, #0f1419 100%);
    color: rgba(255,255,255,0.88);
    min-height: 100vh; margin: 0; padding: 60px 20px;
    display: flex; align-items: flex-start; justify-content: center;
  `;

  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:560px; width:100%; display:flex; flex-direction:column; gap:24px;';

  const title = document.createElement('div');
  title.textContent = 'Glass Cards — Dev Harness';
  title.style.cssText = 'font-size:24px; font-weight:700; letter-spacing:-0.5px;';
  wrap.appendChild(title);

  const sub = document.createElement('div');
  sub.textContent = 'Sélectionne une card à monter.';
  sub.style.cssText = 'font-size:14px; color:rgba(255,255,255,0.55); margin-top:-12px;';
  wrap.appendChild(sub);

  for (const s of SETUPS) {
    const a = document.createElement('a');
    a.href = `?card=${s.id}`;
    a.style.cssText = `
      display:block; padding:16px 18px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      text-decoration: none; color: inherit;
      transition: all 150ms ease;
    `;
    a.addEventListener('mouseenter', () => {
      a.style.background = 'rgba(167,139,250,0.12)';
      a.style.borderColor = 'rgba(167,139,250,0.35)';
    });
    a.addEventListener('mouseleave', () => {
      a.style.background = 'rgba(255,255,255,0.04)';
      a.style.borderColor = 'rgba(255,255,255,0.08)';
    });

    const h = document.createElement('div');
    h.textContent = s.label;
    h.style.cssText = 'font-weight:600; font-size:15px; margin-bottom:4px;';
    a.appendChild(h);

    const d = document.createElement('div');
    d.textContent = s.description;
    d.style.cssText = 'font-size:13px; color:rgba(255,255,255,0.55);';
    a.appendChild(d);

    wrap.appendChild(a);
  }

  document.body.appendChild(wrap);
}
