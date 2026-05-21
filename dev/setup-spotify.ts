// Spotify-card harness — mock spotify_status/browse/search/check_saved/etc.

import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeCardHass } from './mock-card-hass';
import type { HomeAssistant, HassConnection } from '@glass-cards/base-card';

interface SpotifyItem {
  id: string; name: string; type: string;
  uri?: string;
  images?: { url: string; width?: number }[];
  artists?: { name: string }[];
  album?: { name: string; images?: { url: string; width?: number }[] };
  owner?: { display_name: string };
  tracks?: { total: number };
  total_tracks?: number;
  description?: string;
  track?: SpotifyItem;
  show?: SpotifyItem;
  added_at?: string;
  played_at?: string;
}

const img = (seed: string, size = 300) => ({ url: `https://picsum.photos/seed/${seed}/${size}/${size}`, width: size });

const PLAYLISTS: SpotifyItem[] = [
  { id: 'pl1', name: 'Lofi Beats', type: 'playlist', uri: 'spotify:playlist:lofi', images: [img('lofi')], owner: { display_name: 'Spotify' }, tracks: { total: 124 } },
  { id: 'pl2', name: 'Discover Weekly', type: 'playlist', uri: 'spotify:playlist:dw', images: [img('discover')], owner: { display_name: 'Spotify' }, tracks: { total: 30 } },
  { id: 'pl3', name: 'Coding Focus', type: 'playlist', uri: 'spotify:playlist:focus', images: [img('focus')], owner: { display_name: 'Roland' }, tracks: { total: 56 } },
  { id: 'pl4', name: 'Jazz Classics', type: 'playlist', uri: 'spotify:playlist:jazz', images: [img('jazz')], owner: { display_name: 'Roland' }, tracks: { total: 89 } },
  { id: 'pl5', name: 'Workout Mix', type: 'playlist', uri: 'spotify:playlist:gym', images: [img('gym')], owner: { display_name: 'Roland' }, tracks: { total: 42 } },
  { id: 'pl6', name: 'Daily Mix 1', type: 'playlist', uri: 'spotify:playlist:dm1', images: [img('dm1')], owner: { display_name: 'Spotify' }, tracks: { total: 50 } },
];

const RECENT: SpotifyItem[] = [
  { id: 'r1', name: '', type: 'track', played_at: new Date(Date.now() - 60000).toISOString(), track: { id: 't1', name: 'Take Five', type: 'track', artists: [{ name: 'Dave Brubeck' }], album: { name: 'Time Out', images: [img('takefive')] }, uri: 'spotify:track:t1' } },
  { id: 'r2', name: '', type: 'track', played_at: new Date(Date.now() - 300000).toISOString(), track: { id: 't2', name: 'Blue in Green', type: 'track', artists: [{ name: 'Miles Davis' }], album: { name: 'Kind of Blue', images: [img('blue')] }, uri: 'spotify:track:t2' } },
  { id: 'r3', name: '', type: 'track', played_at: new Date(Date.now() - 900000).toISOString(), track: { id: 't3', name: 'So What', type: 'track', artists: [{ name: 'Miles Davis' }], album: { name: 'Kind of Blue', images: [img('blue')] }, uri: 'spotify:track:t3' } },
  { id: 'r4', name: '', type: 'track', played_at: new Date(Date.now() - 1800000).toISOString(), track: { id: 't4', name: 'Strawberry Swing', type: 'track', artists: [{ name: 'Coldplay' }], album: { name: 'Viva la Vida', images: [img('coldplay')] }, uri: 'spotify:track:t4' } },
];

const SAVED_TRACKS: SpotifyItem[] = [
  { id: 's1', name: '', type: 'track', added_at: '2025-12-01', track: { id: 't10', name: 'Bohemian Rhapsody', type: 'track', artists: [{ name: 'Queen' }], album: { name: 'A Night at the Opera', images: [img('queen')] }, uri: 'spotify:track:t10' } },
  { id: 's2', name: '', type: 'track', added_at: '2025-11-15', track: { id: 't11', name: 'Hotel California', type: 'track', artists: [{ name: 'Eagles' }], album: { name: 'Hotel California', images: [img('eagles')] }, uri: 'spotify:track:t11' } },
];

const SAVED_SHOWS: SpotifyItem[] = [
  { id: 'sh1', name: '', type: 'show', added_at: '2025-12-01', show: { id: 'sh10', name: 'Lex Fridman Podcast', type: 'show', images: [img('lex')], description: 'Conversations about science, technology, history, philosophy.' } },
  { id: 'sh2', name: '', type: 'show', added_at: '2025-11-01', show: { id: 'sh11', name: 'Huberman Lab', type: 'show', images: [img('huberman')], description: 'Science-based tools for everyday life.' } },
];

const PLAYLIST_TRACKS_BY_ID: Record<string, SpotifyItem[]> = {
  pl1: [
    { id: 'lf1', name: 'Morning Coffee', type: 'track', artists: [{ name: 'Jinsang' }], album: { name: 'Solitude', images: [img('jinsang')] }, uri: 'spotify:track:lf1' },
    { id: 'lf2', name: 'Rainy Window', type: 'track', artists: [{ name: 'Idealism' }], album: { name: 'Through Tokyo', images: [img('idealism')] }, uri: 'spotify:track:lf2' },
    { id: 'lf3', name: 'Late Night Drive', type: 'track', artists: [{ name: 'Tomppabeats' }], album: { name: 'Harbor', images: [img('tomppa')] }, uri: 'spotify:track:lf3' },
    { id: 'lf4', name: 'Slow Burn', type: 'track', artists: [{ name: 'Bsd.u' }], album: { name: 'Embers', images: [img('bsdu')] }, uri: 'spotify:track:lf4' },
    { id: 'lf5', name: 'Snowfall', type: 'track', artists: [{ name: 'Saib' }], album: { name: 'Sailing', images: [img('saib')] }, uri: 'spotify:track:lf5' },
    { id: 'lf6', name: 'Memories', type: 'track', artists: [{ name: 'Aso' }], album: { name: 'Distant', images: [img('aso')] }, uri: 'spotify:track:lf6' },
  ],
};

interface Scenario { id: string; label: string; description: string; configured: boolean; entity_state: string; entity_attrs: Record<string, unknown> }

interface SpeakerMock {
  entity_id: string;
  state: 'playing' | 'paused' | 'idle' | 'off';
  attributes: Record<string, unknown>;
}

const SPEAKERS: SpeakerMock[] = [
  {
    entity_id: 'media_player.sonos_salon',
    state: 'playing',
    attributes: {
      friendly_name: 'Sonos Salon',
      media_title: 'So What',
      media_artist: 'Miles Davis',
      volume_level: 0.42,
      device_class: 'speaker',
      supported_features: 524288 | 1,
    },
  },
  {
    entity_id: 'media_player.sonos_cuisine',
    state: 'idle',
    attributes: { friendly_name: 'Sonos Cuisine', device_class: 'speaker', supported_features: 524288 },
  },
  {
    entity_id: 'media_player.sonos_sdb',
    state: 'paused',
    attributes: { friendly_name: 'Sonos Salle de Bain', media_title: 'Yacht Rock', device_class: 'speaker', supported_features: 524288 },
  },
  {
    entity_id: 'media_player.tv_salon',
    state: 'idle',
    attributes: { friendly_name: 'TV Salon', device_class: 'tv' },
  },
  {
    entity_id: 'media_player.echo_show_chambre',
    state: 'off',
    attributes: { friendly_name: 'Echo Show Chambre' },
  },
];

const SCENARIOS: Scenario[] = [
  {
    id: 'idle',
    label: 'Configuré, idle',
    description: 'Spotify connecté mais rien en cours',
    configured: true,
    entity_state: 'idle',
    entity_attrs: { friendly_name: 'Spotify', source: 'Sonos Salon', source_list: ['Sonos Salon', 'Sonos Cuisine', 'Sonos SDB'] },
  },
  {
    id: 'playing',
    label: 'Playing',
    description: 'Spotify joue Take Five sur Sonos Salon',
    configured: true,
    entity_state: 'playing',
    entity_attrs: {
      friendly_name: 'Spotify',
      media_title: 'Take Five', media_artist: 'Dave Brubeck', media_album_name: 'Time Out',
      entity_picture: 'https://picsum.photos/seed/takefive/300/300',
      volume_level: 0.45, media_duration: 324, media_position: 87, media_position_updated_at: new Date().toISOString(),
      source: 'Sonos Salon', source_list: ['Sonos Salon', 'Sonos Cuisine', 'Sonos SDB'],
    },
  },
  {
    id: 'paused',
    label: 'Paused',
    description: 'Now-playing bar avec icône play (au lieu de pause)',
    configured: true,
    entity_state: 'paused',
    entity_attrs: {
      friendly_name: 'Spotify',
      media_title: 'Blue in Green', media_artist: 'Miles Davis', media_album_name: 'Kind of Blue',
      entity_picture: 'https://picsum.photos/seed/blue/300/300',
      volume_level: 0.32, media_duration: 337, media_position: 120,
      source: 'Sonos Cuisine',
    },
  },
  {
    id: 'no_results',
    label: 'Recherche vide',
    description: 'Query qui retourne 0 résultats (empty state search)',
    configured: true,
    entity_state: 'idle',
    entity_attrs: { friendly_name: 'Spotify' },
  },
  {
    id: 'picker',
    label: 'Picker ouvert',
    description: '5 enceintes mockées, picker auto-ouvert sur Take Five',
    configured: true,
    entity_state: 'idle',
    entity_attrs: { friendly_name: 'Spotify', source_list: ['Sonos Salon', 'Sonos Cuisine', 'Sonos SDB'] },
  },
  {
    id: 'drilldown',
    label: 'Drilldown ouvert',
    description: 'Playlist Lofi Beats ouverte avec tracks mockés',
    configured: true,
    entity_state: 'idle',
    entity_attrs: { friendly_name: 'Spotify' },
  },
  {
    id: 'search',
    label: 'Recherche en cours',
    description: 'Query "Lofi" pré-fill, fold ouvert, résultats mockés',
    configured: true,
    entity_state: 'idle',
    entity_attrs: { friendly_name: 'Spotify' },
  },
  {
    id: 'not_configured',
    label: 'Non configuré',
    description: 'Aucune intégration Spotify détectée',
    configured: false,
    entity_state: 'unavailable',
    entity_attrs: { friendly_name: 'Spotify' },
  },
];

function browseHandler(category: string, limit: number, offset: number, contentId?: string): { items: SpotifyItem[]; total: number } {
  switch (category) {
    case 'playlists': return { items: PLAYLISTS.slice(offset, offset + limit), total: PLAYLISTS.length };
    case 'recently_played': return { items: RECENT.slice(offset, offset + limit), total: RECENT.length };
    case 'saved_tracks': return { items: SAVED_TRACKS.slice(offset, offset + limit), total: SAVED_TRACKS.length };
    case 'saved_shows': return { items: SAVED_SHOWS.slice(offset, offset + limit), total: SAVED_SHOWS.length };
    case 'playlist_tracks':
    case 'album_tracks': {
      const tracks = (contentId && PLAYLIST_TRACKS_BY_ID[contentId]) || PLAYLIST_TRACKS_BY_ID.pl1;
      return { items: tracks.slice(offset, offset + limit), total: tracks.length };
    }
    default: return { items: [], total: 0 };
  }
}

function searchHandler(query: string): Record<string, { items: SpotifyItem[]; total: number }> {
  const q = query.toLowerCase();
  const filter = (arr: SpotifyItem[]) => arr.filter((i) => {
    const name = (i.name || i.track?.name || i.show?.name || '').toLowerCase();
    return name.includes(q);
  });
  return {
    tracks: { items: filter(SAVED_TRACKS).slice(0, 6), total: filter(SAVED_TRACKS).length },
    playlists: { items: PLAYLISTS.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6), total: PLAYLISTS.filter((p) => p.name.toLowerCase().includes(q)).length },
    albums: { items: [], total: 0 },
    shows: { items: filter(SAVED_SHOWS).slice(0, 6), total: filter(SAVED_SHOWS).length },
  };
}

export async function setupSpotify(): Promise<void> {
  await import('../cards/spotify-card/src/index');

  let current = SCENARIOS[0];

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-spotify-card') as HTMLElement & { hass?: HomeAssistant };
  wrap.appendChild(card);

  function renderToolbar(): void {
    toolbar.replaceChildren();
    toolbar.appendChild(rowEl('Scenario', SCENARIOS.map((s) =>
      chipEl(s.label, s.id === current.id, () => { current = s; rebuild(); renderToolbar(); }),
    )));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = current.description;
    toolbar.appendChild(meta);
  }

  function rebuild(): void {
    const speakerEntities = SPEAKERS.map((sp) => ({
      entity_id: sp.entity_id,
      state: sp.state,
      area_id: 'salon',
      attributes: sp.attributes,
    }));
    const hass = makeCardHass({
      entities: [
        {
          entity_id: 'media_player.spotify',
          state: current.entity_state,
          area_id: 'salon',
          attributes: current.entity_attrs,
        },
        ...speakerEntities,
      ],
      cardConfig: { spotify_card: { show_header: true, entity_id: 'media_player.spotify', sort_order: 'recent_first', max_items_per_section: 6, visible_speakers: [] } },
      serviceHandler: (states, _d, service, data) => {
        console.debug('[spotify] service', service, data);
        // Simulate play state changes
        const cur = states['media_player.spotify'];
        if (!cur) return;
        const attrs = { ...cur.attributes };
        let next = cur.state;
        if (service === 'media_play_pause') next = cur.state === 'playing' ? 'paused' : 'playing';
        if (service === 'media_play') next = 'playing';
        if (service === 'media_pause') next = 'paused';
        if (service === 'volume_set') attrs.volume_level = data?.volume_level ?? attrs.volume_level;
        states['media_player.spotify'] = { ...cur, state: next, attributes: attrs };
      },
    }, (h) => { card.hass = h; });

    // Override the connection sendMessagePromise to handle spotify-specific commands
    const origSend = hass.connection.sendMessagePromise;
    (hass.connection as { sendMessagePromise: HassConnection['sendMessagePromise'] }).sendMessagePromise = async <T,>(msg: Record<string, unknown>): Promise<T> => {
      const type = msg.type as string;
      if (type === 'glass_cards/spotify_status') return { configured: current.configured } as unknown as T;
      if (type === 'glass_cards/spotify_browse') return browseHandler(msg.category as string, msg.limit as number, msg.offset as number, msg.content_id as string | undefined) as unknown as T;
      if (type === 'glass_cards/spotify_search') return searchHandler(msg.query as string) as unknown as T;
      if (type === 'glass_cards/spotify_check_saved') {
        const ids = (msg.track_ids as string[]) ?? [];
        return Object.fromEntries(ids.map((id) => [id, true])) as unknown as T;
      }
      if (type === 'glass_cards/spotify_add_to_queue' || type === 'glass_cards/spotify_save_tracks' || type === 'glass_cards/spotify_remove_tracks') {
        return { ok: true } as unknown as T;
      }
      return origSend(msg);
    };

    card.hass = hass;

    if (current.id === 'picker') {
      // Auto-open the speaker picker on a sample track once config is loaded
      const sample = RECENT[0].track;
      if (!sample) return;
      const openOnReady = (): void => {
        const pickerOpener = (card as unknown as { _openPicker?: (item: unknown) => void })._openPicker;
        if (pickerOpener) {
          pickerOpener.call(card, sample);
        } else {
          window.setTimeout(openOnReady, 100);
        }
      };
      window.setTimeout(openOnReady, 250);
    }

    if (current.id === 'drilldown') {
      // Auto-open the drilldown on the first playlist once config is loaded
      const pl = PLAYLISTS[0];
      const openOnReady = (): void => {
        const opener = (card as unknown as { _openDrilldown?: (type: string, id: string, title: string, image?: string, subtitle?: string) => void })._openDrilldown;
        if (opener) {
          const imgUrl = pl.images?.[0]?.url;
          opener.call(card, 'playlist', pl.id, pl.name, imgUrl, pl.owner?.display_name);
        } else {
          window.setTimeout(openOnReady, 100);
        }
      };
      window.setTimeout(openOnReady, 250);
    }

    if (current.id === 'search') {
      // Auto-fill the search input and fire input event so the card runs its real search flow
      const triggerSearch = (attempt = 0): void => {
        const input = card.shadowRoot?.querySelector('input.search-input') as HTMLInputElement | null;
        if (input) {
          input.focus();
          input.value = 'Lofi';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        } else if (attempt < 20) {
          window.setTimeout(() => triggerSearch(attempt + 1), 100);
        }
      };
      window.setTimeout(triggerSearch, 250);
    }

    if (current.id === 'no_results') {
      // Query that returns 0 results -> empty search state
      const triggerEmpty = (attempt = 0): void => {
        const input = card.shadowRoot?.querySelector('input.search-input') as HTMLInputElement | null;
        if (input) {
          input.focus();
          input.value = 'zzzzzz_no_match_zzzzzz';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        } else if (attempt < 20) {
          window.setTimeout(() => triggerEmpty(attempt + 1), 100);
        }
      };
      window.setTimeout(triggerEmpty, 250);
    }
  }

  renderToolbar();
  rebuild();
}
