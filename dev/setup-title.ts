// Title-card harness — title + period + sources (input_select/scenes/booleans).

import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeCardHass, type MockEntitySpec } from './mock-card-hass';
import type { HomeAssistant, HassEntity } from '@glass-cards/base-card';

interface TitleConfig {
  title: string;
  sources: Array<{ source_type: 'input_select' | 'scenes' | 'booleans'; entity: string; label: string; modes: Array<{ id: string; label: string; icon: string; color: string }> }>;
  period_entity: string;
  period_options: Array<{ id: string; label: string; icon: string; color: string }>;
}

interface Scenario {
  id: string; label: string; description: string;
  config: TitleConfig;
  entities: MockEntitySpec[];
}

const PERIOD_OPTIONS = [
  { id: 'Matin', label: 'Matin', icon: 'mdi:weather-sunset-up', color: '#f0a050' },
  { id: 'Après-midi', label: 'Après-midi', icon: 'mdi:white-balance-sunny', color: '#7db8e0' },
  { id: 'Soir', label: 'Soir', icon: 'mdi:weather-sunset-down', color: '#e08040' },
  { id: 'Nuit', label: 'Nuit', icon: 'mdi:weather-night', color: '#8b8ff0' },
];

const SCENARIOS: Scenario[] = [
  {
    id: 'simple_title',
    label: 'Titre + période',
    description: 'Titre statique + indicateur de période de la journée',
    config: {
      title: 'Bonjour Roland',
      period_entity: 'input_select.periode_journee',
      period_options: PERIOD_OPTIONS,
      sources: [],
    },
    entities: [{
      entity_id: 'input_select.periode_journee',
      state: 'Après-midi',
      attributes: { friendly_name: 'Période journée', options: ['Matin', 'Après-midi', 'Soir', 'Nuit'] },
    }],
  },
  {
    id: 'modes',
    label: 'Avec input_select (modes)',
    description: '4 modes maison (jour/soirée/cinéma/nuit)',
    config: {
      title: 'Maison',
      period_entity: 'input_select.periode_journee',
      period_options: PERIOD_OPTIONS,
      sources: [{
        source_type: 'input_select',
        entity: 'input_select.mode_maison',
        label: 'Mode maison',
        modes: [
          { id: 'jour', label: 'Jour', icon: 'mdi:weather-sunny', color: 'warning' },
          { id: 'soiree', label: 'Soirée', icon: 'mdi:lamp', color: 'accent' },
          { id: 'cinema', label: 'Cinéma', icon: 'mdi:filmstrip', color: 'info' },
          { id: 'nuit', label: 'Nuit', icon: 'mdi:weather-night', color: 'success' },
        ],
      }],
    },
    entities: [
      { entity_id: 'input_select.periode_journee', state: 'Soir', attributes: { friendly_name: 'Période journée', options: ['Matin', 'Après-midi', 'Soir', 'Nuit'] } },
      { entity_id: 'input_select.mode_maison', state: 'soiree', attributes: { friendly_name: 'Mode maison', options: ['jour', 'soiree', 'cinema', 'nuit'] } },
    ],
  },
  {
    id: 'scenes',
    label: 'Avec scenes',
    description: '4 scènes activables (Lecture / Détente / Repas / Travail)',
    config: {
      title: 'Salon',
      period_entity: 'input_select.periode_journee',
      period_options: PERIOD_OPTIONS,
      sources: [{
        source_type: 'scenes',
        entity: '',
        label: 'Scènes',
        modes: [
          { id: 'scene.lecture', label: 'Lecture', icon: 'mdi:book-open-page-variant', color: 'info' },
          { id: 'scene.detente', label: 'Détente', icon: 'mdi:sofa-outline', color: 'accent' },
          { id: 'scene.repas', label: 'Repas', icon: 'mdi:silverware-fork-knife', color: 'warning' },
          { id: 'scene.travail', label: 'Travail', icon: 'mdi:desktop-mac', color: 'alert' },
        ],
      }],
    },
    entities: [
      { entity_id: 'input_select.periode_journee', state: 'Matin', attributes: { friendly_name: 'Période', options: ['Matin', 'Après-midi', 'Soir', 'Nuit'] } },
      { entity_id: 'scene.lecture', state: 'unknown', attributes: { friendly_name: 'Lecture' } },
      { entity_id: 'scene.detente', state: 'unknown', attributes: { friendly_name: 'Détente' } },
      { entity_id: 'scene.repas', state: 'unknown', attributes: { friendly_name: 'Repas' } },
      { entity_id: 'scene.travail', state: 'unknown', attributes: { friendly_name: 'Travail' } },
    ],
  },
  {
    id: 'booleans',
    label: 'Avec booleans (toggles)',
    description: '3 toggles (présence / vacances / silence)',
    config: {
      title: 'Statut',
      period_entity: 'input_select.periode_journee',
      period_options: PERIOD_OPTIONS,
      sources: [{
        source_type: 'booleans',
        entity: '',
        label: 'Toggles',
        modes: [
          { id: 'input_boolean.presence_simulee', label: 'Présence simulée', icon: 'mdi:home-account', color: 'success' },
          { id: 'input_boolean.vacances', label: 'Vacances', icon: 'mdi:beach', color: 'warning' },
          { id: 'input_boolean.silence', label: 'Silence', icon: 'mdi:volume-off', color: 'neutral' },
        ],
      }],
    },
    entities: [
      { entity_id: 'input_select.periode_journee', state: 'Nuit', attributes: { friendly_name: 'Période', options: ['Matin', 'Après-midi', 'Soir', 'Nuit'] } },
      { entity_id: 'input_boolean.presence_simulee', state: 'on', attributes: { friendly_name: 'Présence simulée' } },
      { entity_id: 'input_boolean.vacances', state: 'off', attributes: { friendly_name: 'Vacances' } },
      { entity_id: 'input_boolean.silence', state: 'off', attributes: { friendly_name: 'Silence' } },
    ],
  },
  {
    id: 'full',
    label: 'Full (modes + scenes + booleans)',
    description: '3 sources empilées dans le fold',
    config: {
      title: 'Maison',
      period_entity: 'input_select.periode_journee',
      period_options: PERIOD_OPTIONS,
      sources: [
        {
          source_type: 'input_select', entity: 'input_select.mode_maison', label: 'Mode',
          modes: [
            { id: 'jour', label: 'Jour', icon: 'mdi:weather-sunny', color: 'warning' },
            { id: 'soiree', label: 'Soirée', icon: 'mdi:lamp', color: 'accent' },
            { id: 'nuit', label: 'Nuit', icon: 'mdi:weather-night', color: 'success' },
          ],
        },
        {
          source_type: 'scenes', entity: '', label: 'Scènes',
          modes: [
            { id: 'scene.detente', label: 'Détente', icon: 'mdi:sofa-outline', color: 'accent' },
            { id: 'scene.travail', label: 'Travail', icon: 'mdi:desktop-mac', color: 'info' },
          ],
        },
        {
          source_type: 'booleans', entity: '', label: 'Toggles',
          modes: [
            { id: 'input_boolean.vacances', label: 'Vacances', icon: 'mdi:beach', color: 'warning' },
          ],
        },
      ],
    },
    entities: [
      { entity_id: 'input_select.periode_journee', state: 'Après-midi', attributes: { friendly_name: 'Période', options: ['Matin', 'Après-midi', 'Soir', 'Nuit'] } },
      { entity_id: 'input_select.mode_maison', state: 'jour', attributes: { friendly_name: 'Mode', options: ['jour', 'soiree', 'nuit'] } },
      { entity_id: 'scene.detente', state: 'unknown', attributes: { friendly_name: 'Détente' } },
      { entity_id: 'scene.travail', state: 'unknown', attributes: { friendly_name: 'Travail' } },
      { entity_id: 'input_boolean.vacances', state: 'off', attributes: { friendly_name: 'Vacances' } },
    ],
  },
];

function handleTitleService(states: Record<string, HassEntity>, _domain: string, service: string, data: Record<string, unknown> | undefined, target: { entity_id?: string | string[] } | undefined): void {
  const ids = ([] as string[]).concat(target?.entity_id ?? []);
  for (const id of ids) {
    const cur = states[id];
    if (!cur) continue;
    let next = cur.state;
    if (service === 'select_option' && data?.option) next = data.option as string;
    if (service === 'turn_on') next = 'on';
    if (service === 'turn_off') next = 'off';
    if (service === 'toggle') next = cur.state === 'on' ? 'off' : 'on';
    states[id] = { ...cur, state: next, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() };
  }
}

export async function setupTitle(): Promise<void> {
  await import('../cards/title-card/src/index');

  let current = SCENARIOS[0];

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-title-card') as HTMLElement & { hass?: HomeAssistant };
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
      entities: current.entities,
      cardConfig: { title_card: current.config },
      serviceHandler: handleTitleService,
    }, (h) => { card.hass = h; });
    card.hass = hass;
  }

  renderToolbar();
  rebuild();
}
