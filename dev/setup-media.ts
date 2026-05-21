// Media-card harness — media_player avec features variées.

import { bus } from '@glass-cards/event-bus';
import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeCardHass, type MockEntitySpec } from './mock-card-hass';
import type { HomeAssistant, HassEntity } from '@glass-cards/base-card';

// MediaPlayerEntityFeature bitmask
const F_PAUSE = 1, F_SEEK = 2, F_VOLUME_SET = 4, F_VOLUME_MUTE = 8;
const F_PREVIOUS = 16, F_NEXT = 32, F_SELECT_SOURCE = 2048, F_STOP = 4096;
const F_PLAY = 16384, F_SHUFFLE_SET = 32768;
const F_REPEAT_SET = 262144, F_GROUPING = 524288;
const FULL = F_PAUSE | F_SEEK | F_VOLUME_SET | F_VOLUME_MUTE | F_PREVIOUS | F_NEXT | F_SELECT_SOURCE | F_STOP | F_PLAY | F_SHUFFLE_SET | F_REPEAT_SET;

interface Scenario { id: string; label: string; description: string; entities: MockEntitySpec[] }

const NOW_ISO = new Date().toISOString();

const SCENARIOS: Scenario[] = [
  {
    id: 'playing',
    label: 'En lecture',
    description: 'TV salon en lecture avec metadata + album art',
    entities: [{
      entity_id: 'media_player.salon_tv',
      state: 'playing',
      area_id: 'salon',
      attributes: {
        friendly_name: 'TV Salon',
        media_title: 'Inception',
        media_artist: 'Hans Zimmer',
        media_album_name: 'Inception OST',
        app_name: 'Plex',
        entity_picture: 'https://picsum.photos/seed/inception/200/200',
        volume_level: 0.4,
        is_volume_muted: false,
        media_duration: 8950,
        media_position: 2340,
        media_position_updated_at: NOW_ISO,
        source: 'Plex',
        source_list: ['Plex', 'Netflix', 'Apple TV', 'HDMI 1'],
        supported_features: FULL | F_SELECT_SOURCE,
      },
    }],
  },
  {
    id: 'paused',
    label: 'En pause',
    description: 'Lecture en pause, position à 35:23',
    entities: [{
      entity_id: 'media_player.salon_tv',
      state: 'paused',
      area_id: 'salon',
      attributes: {
        friendly_name: 'TV Salon',
        media_title: 'Stranger Things — S04E03',
        media_artist: 'Netflix',
        entity_picture: 'https://picsum.photos/seed/stranger/200/200',
        volume_level: 0.55,
        is_volume_muted: false,
        media_duration: 3120,
        media_position: 2123,
        media_position_updated_at: NOW_ISO,
        supported_features: FULL,
      },
    }],
  },
  {
    id: 'idle',
    label: 'Idle',
    description: 'Enceinte allumée sans média',
    entities: [{
      entity_id: 'media_player.bureau_speaker',
      state: 'idle',
      area_id: 'bureau',
      attributes: {
        friendly_name: 'Sonos Bureau',
        volume_level: 0.3,
        source: 'Spotify Connect',
        source_list: ['Spotify Connect', 'AirPlay', 'Line In'],
        supported_features: FULL,
      },
    }],
  },
  {
    id: 'off',
    label: 'Éteint',
    description: 'Media player off',
    entities: [{
      entity_id: 'media_player.salon_tv',
      state: 'off',
      area_id: 'salon',
      attributes: {
        friendly_name: 'TV Salon',
        supported_features: FULL,
      },
    }],
  },
  {
    id: 'multi',
    label: 'Multi (3 players)',
    description: 'TV salon playing + Sonos cuisine idle + chambre off',
    entities: [
      {
        entity_id: 'media_player.salon_tv', state: 'playing', area_id: 'salon',
        attributes: {
          friendly_name: 'TV Salon', media_title: 'The Bear', media_artist: 'Disney+',
          entity_picture: 'https://picsum.photos/seed/bear/200/200',
          volume_level: 0.45, media_duration: 1800, media_position: 600, media_position_updated_at: NOW_ISO,
          supported_features: FULL,
        },
      },
      {
        entity_id: 'media_player.cuisine_sonos', state: 'playing', area_id: 'cuisine',
        attributes: {
          friendly_name: 'Sonos Cuisine', media_title: 'Lofi Hip Hop Radio', media_artist: 'ChilledCow',
          entity_picture: 'https://picsum.photos/seed/lofi/200/200',
          volume_level: 0.25, supported_features: FULL,
          group_members: ['media_player.cuisine_sonos'],
        },
      },
      {
        entity_id: 'media_player.chambre_radio', state: 'off', area_id: 'chambre',
        attributes: { friendly_name: 'Radio Chambre', supported_features: FULL },
      },
    ],
  },
  {
    id: 'grouping',
    label: 'Sonos groupés',
    description: '3 Sonos groupés en multi-room (master + slaves)',
    entities: [
      {
        entity_id: 'media_player.sonos_salon', state: 'playing', area_id: 'salon',
        attributes: {
          friendly_name: 'Sonos Salon', media_title: 'Take Five', media_artist: 'Dave Brubeck',
          entity_picture: 'https://picsum.photos/seed/jazz/200/200',
          volume_level: 0.4, supported_features: FULL | F_GROUPING,
          group_members: ['media_player.sonos_salon', 'media_player.sonos_cuisine', 'media_player.sonos_sdb'],
        },
      },
      {
        entity_id: 'media_player.sonos_cuisine', state: 'playing', area_id: 'cuisine',
        attributes: { friendly_name: 'Sonos Cuisine', volume_level: 0.35, supported_features: FULL | F_GROUPING, group_members: ['media_player.sonos_salon', 'media_player.sonos_cuisine', 'media_player.sonos_sdb'] },
      },
      {
        entity_id: 'media_player.sonos_sdb', state: 'playing', area_id: 'salle_de_bain',
        attributes: { friendly_name: 'Sonos SDB', volume_level: 0.25, supported_features: FULL | F_GROUPING, group_members: ['media_player.sonos_salon', 'media_player.sonos_cuisine', 'media_player.sonos_sdb'] },
      },
    ],
  },
  {
    id: 'unavailable',
    label: 'Indisponible',
    description: 'Player unavailable',
    entities: [{
      entity_id: 'media_player.salon_tv', state: 'unavailable', area_id: 'salon',
      attributes: { friendly_name: 'TV Salon' },
    }],
  },
];

function touchStates(states: Record<string, HassEntity>, ids: string[], mutate: (attrs: Record<string, unknown>) => void): void {
  const now = new Date().toISOString();
  for (const id of ids) {
    const cur = states[id];
    if (!cur) continue;
    const attrs = { ...cur.attributes };
    mutate(attrs);
    states[id] = { ...cur, attributes: attrs, last_changed: now, last_updated: now };
  }
}

function handleMediaService(states: Record<string, HassEntity>, _domain: string, service: string, data: Record<string, unknown> | undefined, target: { entity_id?: string | string[] } | undefined): void {
  const ids = ([] as string[]).concat(target?.entity_id ?? []);

  // Multiroom: join adds members to coordinator's group; unjoin pulls the
  // target speaker out into its own (solo) group. Both update group_members
  // on every affected speaker so the UI re-renders consistently.
  if (service === 'join') {
    const coordinator = ids[0];
    if (!coordinator || !states[coordinator]) return;
    const newMembers = (data?.group_members as string[]) || [];
    const current = (states[coordinator].attributes.group_members as string[]) || [coordinator];
    const merged = Array.from(new Set([coordinator, ...current, ...newMembers]));
    touchStates(states, merged, (attrs) => { attrs.group_members = merged; });
    return;
  }
  if (service === 'unjoin') {
    for (const id of ids) {
      const cur = states[id];
      if (!cur) continue;
      const oldGroup = (cur.attributes.group_members as string[]) || [id];
      const remaining = oldGroup.filter((m) => m !== id);
      touchStates(states, [id], (attrs) => { attrs.group_members = [id]; });
      if (remaining.length > 0) {
        touchStates(states, remaining, (attrs) => { attrs.group_members = remaining; });
      }
    }
    return;
  }

  for (const id of ids) {
    const cur = states[id];
    if (!cur) continue;
    const attrs = { ...cur.attributes };
    let next = cur.state;

    switch (service) {
      case 'media_play': next = 'playing'; break;
      case 'media_pause': next = 'paused'; break;
      case 'media_stop': next = 'idle'; break;
      case 'media_play_pause': next = cur.state === 'playing' ? 'paused' : 'playing'; break;
      case 'media_next_track':
      case 'media_previous_track':
        // No-op for mock; could rotate a list later
        break;
      case 'volume_set': attrs.volume_level = data?.volume_level ?? 0; break;
      case 'volume_mute': attrs.is_volume_muted = data?.is_volume_muted ?? false; break;
      case 'select_source': attrs.source = data?.source; break;
      case 'turn_on': next = 'idle'; break;
      case 'turn_off': next = 'off'; break;
      case 'shuffle_set': attrs.shuffle = data?.shuffle; break;
      case 'repeat_set': attrs.repeat = data?.repeat; break;
    }
    states[id] = { ...cur, state: next, attributes: attrs, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() };
  }
}

export async function setupMedia(): Promise<void> {
  await import('../cards/media-card/src/index');

  let current = SCENARIOS[0];
  let context: 'popup' | 'dashboard' = 'popup';

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-media-card') as HTMLElement & {
    hass?: HomeAssistant; areaId?: string; visibleAreaIds?: string[];
  };
  wrap.appendChild(card);

  function renderToolbar(): void {
    toolbar.replaceChildren();
    toolbar.appendChild(rowEl('Scenario', SCENARIOS.map((s) =>
      chipEl(s.label, s.id === current.id, () => { current = s; rebuild(); renderToolbar(); }),
    )));
    toolbar.appendChild(rowEl('Context', (['popup', 'dashboard'] as const).map((c) =>
      chipEl(c, c === context, () => { context = c; applyContext(); renderToolbar(); }),
    )));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = current.description;
    toolbar.appendChild(meta);
  }

  function rebuild(): void {
    const hass = makeCardHass({
      entities: current.entities,
      cardConfig: { media_card: { show_header: true, extra_entities: {}, hidden_entities: [] } },
      serviceHandler: handleMediaService,
    }, (h) => { card.hass = h; });
    card.hass = hass;
    applyContext();
    bus.emit('dashboard-config-changed', undefined);
  }

  function applyContext(): void {
    if (context === 'popup') {
      card.areaId = current.entities[0]?.area_id ?? 'salon';
      card.visibleAreaIds = undefined;
    } else {
      card.areaId = undefined;
      card.visibleAreaIds = ['salon', 'chambre', 'cuisine', 'bureau', 'salle_de_bain'];
    }
  }

  renderToolbar();
  rebuild();
}
