// Light-card harness — covers all 4 light types (simple, dimmable, color_temp, rgb).

import { bus } from '@glass-cards/event-bus';
import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeCardHass, type MockEntitySpec } from './mock-card-hass';
import type { HomeAssistant, HassEntity } from '@glass-cards/base-card';

interface Scenario {
  id: string;
  label: string;
  description: string;
  entities: MockEntitySpec[];
  /** Areas occupied by the scenario — first one is used as popup areaId. */
  areas?: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'simple',
    label: 'Simple on/off',
    description: 'Lampe basique sans dimmer',
    entities: [{
      entity_id: 'light.salon_simple',
      state: 'on',
      area_id: 'salon',
      attributes: {
        friendly_name: 'Lampe salon',
        supported_color_modes: ['onoff'],
        color_mode: 'onoff',
      },
    }],
  },
  {
    id: 'dimmable',
    label: 'Dimmable (brightness)',
    description: 'Lampe avec dimmer 0-100%',
    entities: [{
      entity_id: 'light.salon_dimmable',
      state: 'on',
      area_id: 'salon',
      attributes: {
        friendly_name: 'Lampadaire salon',
        supported_color_modes: ['brightness'],
        color_mode: 'brightness',
        brightness: 180,
      },
    }],
  },
  {
    id: 'color_temp',
    label: 'Color temperature',
    description: 'Lampe avec température de couleur (warm ↔ cold)',
    entities: [{
      entity_id: 'light.salon_ct',
      state: 'on',
      area_id: 'salon',
      attributes: {
        friendly_name: 'Spot cuisine',
        supported_color_modes: ['color_temp'],
        color_mode: 'color_temp',
        brightness: 220,
        color_temp_kelvin: 3500,
        min_color_temp_kelvin: 2200,
        max_color_temp_kelvin: 6500,
      },
    }],
  },
  {
    id: 'rgb',
    label: 'RGB (full color)',
    description: 'Lampe avec roue chromatique RGB',
    entities: [{
      entity_id: 'light.salon_rgb',
      state: 'on',
      area_id: 'salon',
      attributes: {
        friendly_name: 'LED salon',
        supported_color_modes: ['hs', 'rgb', 'color_temp'],
        color_mode: 'rgb',
        brightness: 200,
        rgb_color: [129, 140, 248],
        hs_color: [232, 48],
        color_temp_kelvin: 3500,
        min_color_temp_kelvin: 2200,
        max_color_temp_kelvin: 6500,
        effect_list: ['none', 'candle', 'fire', 'pulse'],
        effect: 'none',
      },
    }],
  },
  {
    id: 'multi',
    label: 'Multi (4 lampes mixées)',
    description: 'Salon avec simple + dimmable + color_temp + RGB',
    entities: [
      {
        entity_id: 'light.salon_plafond',
        state: 'on',
        area_id: 'salon',
        attributes: {
          friendly_name: 'Plafonnier',
          supported_color_modes: ['brightness'],
          color_mode: 'brightness',
          brightness: 200,
        },
      },
      {
        entity_id: 'light.salon_lampadaire',
        state: 'on',
        area_id: 'salon',
        attributes: {
          friendly_name: 'Lampadaire',
          supported_color_modes: ['color_temp'],
          color_mode: 'color_temp',
          brightness: 150,
          color_temp_kelvin: 2800,
          min_color_temp_kelvin: 2200,
          max_color_temp_kelvin: 6500,
        },
      },
      {
        entity_id: 'light.salon_strip',
        state: 'on',
        area_id: 'salon',
        attributes: {
          friendly_name: 'Strip LED',
          supported_color_modes: ['hs', 'rgb'],
          color_mode: 'rgb',
          brightness: 180,
          rgb_color: [244, 114, 182],
          hs_color: [328, 53],
        },
      },
      {
        entity_id: 'light.salon_meuble',
        state: 'off',
        area_id: 'salon',
        attributes: {
          friendly_name: 'Meuble TV',
          supported_color_modes: ['onoff'],
          color_mode: 'onoff',
        },
      },
    ],
  },
  {
    id: 'all_off',
    label: 'Tout éteint',
    description: '4 lampes éteintes',
    entities: [
      { entity_id: 'light.salon_plafond', state: 'off', area_id: 'salon', attributes: { friendly_name: 'Plafonnier', supported_color_modes: ['brightness'] } },
      { entity_id: 'light.salon_lampadaire', state: 'off', area_id: 'salon', attributes: { friendly_name: 'Lampadaire', supported_color_modes: ['color_temp'] } },
      { entity_id: 'light.salon_strip', state: 'off', area_id: 'salon', attributes: { friendly_name: 'Strip LED', supported_color_modes: ['hs'] } },
      { entity_id: 'light.salon_meuble', state: 'off', area_id: 'salon', attributes: { friendly_name: 'Meuble TV', supported_color_modes: ['onoff'] } },
    ],
  },
  {
    id: 'unavailable',
    label: 'Indisponible',
    description: 'Lampe avec état unavailable',
    entities: [{
      entity_id: 'light.salon_offline',
      state: 'unavailable',
      area_id: 'salon',
      attributes: { friendly_name: 'Lampe hors-ligne' },
    }],
  },
];

// Reactive callService for lights
function handleLightService(states: Record<string, HassEntity>, _domain: string, service: string, data: Record<string, unknown> | undefined, target: { entity_id?: string | string[] } | undefined): void {
  const ids = ([] as string[]).concat(target?.entity_id ?? []);
  for (const id of ids) {
    const cur = states[id];
    if (!cur) continue;
    const attrs = { ...cur.attributes };
    let next = cur.state;

    switch (service) {
      case 'turn_on':
        next = 'on';
        if (data?.brightness !== undefined) attrs.brightness = data.brightness;
        if (data?.brightness_pct !== undefined) attrs.brightness = Math.round(((data.brightness_pct as number) / 100) * 255);
        if (data?.color_temp_kelvin !== undefined) { attrs.color_temp_kelvin = data.color_temp_kelvin; attrs.color_mode = 'color_temp'; }
        if (data?.rgb_color !== undefined) { attrs.rgb_color = data.rgb_color; attrs.color_mode = 'rgb'; }
        if (data?.hs_color !== undefined) { attrs.hs_color = data.hs_color; attrs.color_mode = 'hs'; }
        if (data?.effect !== undefined) attrs.effect = data.effect;
        break;
      case 'turn_off':
        next = 'off';
        break;
      case 'toggle':
        next = cur.state === 'on' ? 'off' : 'on';
        break;
    }

    states[id] = { ...cur, state: next, attributes: attrs, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() };
  }
}

export async function setupLight(): Promise<void> {
  await import('../cards/light-card/src/index');

  let current = SCENARIOS[0];
  let context: 'popup' | 'dashboard' = 'popup';

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-light-card') as HTMLElement & {
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
      cardConfig: { light_card: { show_header: true } },
      serviceHandler: handleLightService,
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
