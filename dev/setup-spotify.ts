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

interface Scenario { id: string; label: string; description: string; configured: boolean; entity_state: string; entity_attrs: Record<string, unknown> }

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
    id: 'not_configured',
    label: 'Non configuré',
    description: 'Aucune intégration Spotify détectée',
    configured: false,
    entity_state: 'unavailable',
    entity_attrs: { friendly_name: 'Spotify' },
  },
];

function browseHandler(category: string, limit: number, offset: number): { items: SpotifyItem[]; total: number } {
  switch (category) {
    case 'playlists': return { items: PLAYLISTS.slice(offset, offset + limit), total: PLAYLISTS.length };
    case 'recently_played': return { items: RECENT.slice(offset, offset + limit), total: RECENT.length };
    case 'saved_tracks': return { items: SAVED_TRACKS.slice(offset, offset + limit), total: SAVED_TRACKS.length };
    case 'saved_shows': return { items: SAVED_SHOWS.slice(offset, offset + limit), total: SAVED_SHOWS.length };
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
    const hass = makeCardHass({
      entities: [{
        entity_id: 'media_player.spotify',
        state: current.entity_state,
        area_id: 'salon',
        attributes: current.entity_attrs,
      }],
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
      if (type === 'glass_cards/spotify_browse') return browseHandler(msg.category as string, msg.limit as number, msg.offset as number) as unknown as T;
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
  }

  renderToolbar();
  rebuild();
}
