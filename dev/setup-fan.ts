// Fan-card harness — supported_features driven scenarios.

import { bus } from '@glass-cards/event-bus';
import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeCardHass, type MockEntitySpec } from './mock-card-hass';
import type { HomeAssistant, HassEntity } from '@glass-cards/base-card';

// FanEntityFeature bitmask
const F = { SET_SPEED: 1, OSCILLATE: 2, DIRECTION: 4, PRESET_MODE: 8, TURN_OFF: 16, TURN_ON: 32 };
const FULL = F.SET_SPEED | F.OSCILLATE | F.DIRECTION | F.PRESET_MODE | F.TURN_ON | F.TURN_OFF;

interface Scenario { id: string; label: string; description: string; entities: MockEntitySpec[] }

const SCENARIOS: Scenario[] = [
  {
    id: 'simple_on',
    label: 'Simple on/off',
    description: 'Ventilateur on/off uniquement',
    entities: [{
      entity_id: 'fan.sdb_vmc',
      state: 'on',
      area_id: 'salle_de_bain',
      attributes: {
        friendly_name: 'VMC SDB',
        supported_features: F.TURN_ON | F.TURN_OFF,
      },
    }],
  },
  {
    id: 'speed',
    label: 'Vitesse variable',
    description: 'Ventilo 60% avec 4 vitesses',
    entities: [{
      entity_id: 'fan.bureau_ventilo',
      state: 'on',
      area_id: 'bureau',
      attributes: {
        friendly_name: 'Ventilateur bureau',
        percentage: 60,
        percentage_step: 25,
        supported_features: F.TURN_ON | F.TURN_OFF | F.SET_SPEED,
      },
    }],
  },
  {
    id: 'ceiling',
    label: 'Plafonnier full features',
    description: 'Ventilo plafond avec speed + oscillation + direction + preset',
    entities: [{
      entity_id: 'fan.salon_plafond',
      state: 'on',
      area_id: 'salon',
      attributes: {
        friendly_name: 'Ventilateur plafond',
        percentage: 75,
        percentage_step: 25,
        oscillating: true,
        direction: 'forward',
        preset_modes: ['auto', 'eco', 'night', 'turbo'],
        preset_mode: 'eco',
        supported_features: FULL,
      },
    }],
  },
  {
    id: 'reverse',
    label: 'Direction reverse',
    description: 'Direction inversée (hiver)',
    entities: [{
      entity_id: 'fan.salon_plafond',
      state: 'on',
      area_id: 'salon',
      attributes: {
        friendly_name: 'Ventilateur plafond',
        percentage: 40,
        percentage_step: 25,
        oscillating: false,
        direction: 'reverse',
        preset_modes: ['auto', 'eco', 'night'],
        preset_mode: 'auto',
        supported_features: FULL,
      },
    }],
  },
  {
    id: 'multi',
    label: 'Multi (3 ventilos)',
    description: 'Salon avec plafonnier + bureau + VMC',
    entities: [
      {
        entity_id: 'fan.salon_plafond', state: 'on', area_id: 'salon',
        attributes: { friendly_name: 'Plafonnier', percentage: 50, percentage_step: 25, oscillating: true, direction: 'forward', preset_modes: ['auto', 'eco'], preset_mode: 'auto', supported_features: FULL },
      },
      {
        entity_id: 'fan.salon_box', state: 'off', area_id: 'salon',
        attributes: { friendly_name: 'Box fan', percentage: 0, percentage_step: 25, supported_features: F.TURN_ON | F.TURN_OFF | F.SET_SPEED },
      },
      {
        entity_id: 'fan.salon_vmc', state: 'on', area_id: 'salon',
        attributes: { friendly_name: 'VMC', supported_features: F.TURN_ON | F.TURN_OFF },
      },
    ],
  },
  {
    id: 'unavailable',
    label: 'Indisponible',
    description: 'Fan état unavailable',
    entities: [{
      entity_id: 'fan.salon_offline', state: 'unavailable', area_id: 'salon',
      attributes: { friendly_name: 'Ventilo HS' },
    }],
  },
];

function handleFanService(states: Record<string, HassEntity>, _domain: string, service: string, data: Record<string, unknown> | undefined, target: { entity_id?: string | string[] } | undefined): void {
  const ids = ([] as string[]).concat(target?.entity_id ?? []);
  for (const id of ids) {
    const cur = states[id];
    if (!cur) continue;
    const attrs = { ...cur.attributes };
    let next = cur.state;

    switch (service) {
      case 'turn_on':
        next = 'on';
        if (data?.percentage !== undefined) attrs.percentage = data.percentage;
        if (data?.preset_mode !== undefined) attrs.preset_mode = data.preset_mode;
        break;
      case 'turn_off':
        next = 'off';
        attrs.percentage = 0;
        break;
      case 'toggle':
        next = cur.state === 'on' ? 'off' : 'on';
        if (next === 'off') attrs.percentage = 0;
        break;
      case 'set_percentage':
        attrs.percentage = data?.percentage ?? 0;
        next = (attrs.percentage as number) > 0 ? 'on' : 'off';
        break;
      case 'set_preset_mode':
        attrs.preset_mode = data?.preset_mode;
        next = 'on';
        break;
      case 'oscillate':
        attrs.oscillating = data?.oscillating;
        break;
      case 'set_direction':
        attrs.direction = data?.direction;
        break;
    }
    states[id] = { ...cur, state: next, attributes: attrs, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() };
  }
}

export async function setupFan(): Promise<void> {
  await import('../cards/fan-card/src/index');

  let current = SCENARIOS[0];
  let context: 'popup' | 'dashboard' = 'popup';

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-fan-card') as HTMLElement & {
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
      cardConfig: { fan_card: { show_header: true } },
      serviceHandler: handleFanService,
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
