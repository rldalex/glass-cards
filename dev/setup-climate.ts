// Climate-card harness — moved from dev-entrypoint.

import { bus } from '@glass-cards/event-bus';
import { makeMockHass, SCENARIOS, type MockScenario } from './mock-hass';
import type { HomeAssistant } from '@glass-cards/base-card';

export async function setupClimate(): Promise<void> {
  await import('../cards/climate-card/src/index');

  let currentScenario: MockScenario = SCENARIOS[0];
  let displayMode: 'list' | 'normal' = 'normal';
  let context: 'dashboard' | 'popup' = 'popup';
  let hass: HomeAssistant;

  const { toolbar, stage } = layoutHarness();

  const cardWrap = document.createElement('div');
  cardWrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(cardWrap);

  const card = document.createElement('glass-climate-card') as HTMLElement & {
    hass?: HomeAssistant; areaId?: string;
  };
  cardWrap.appendChild(card);

  function renderToolbar(): void {
    toolbar.replaceChildren();
    toolbar.appendChild(rowEl('Scenario', SCENARIOS.map((s) =>
      chipEl(s.label, s.id === currentScenario.id, () => { currentScenario = s; rebuildHass(); renderToolbar(); }),
    )));
    toolbar.appendChild(rowEl('Mode', (['normal', 'list'] as const).map((m) =>
      chipEl(m, m === displayMode, () => { displayMode = m; bus.emit('climate-config-changed', undefined); renderToolbar(); }),
    )));
    toolbar.appendChild(rowEl('Context', (['popup', 'dashboard'] as const).map((c) =>
      chipEl(c, c === context, () => { context = c; applyContext(); renderToolbar(); }),
    )));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = currentScenario.description;
    toolbar.appendChild(meta);
  }

  function rebuildHass(): void {
    hass = makeMockHass(currentScenario, () => displayMode, (h) => { hass = h; card.hass = h; });
    card.hass = hass;
    applyContext();
    bus.emit('climate-config-changed', undefined);
  }

  function applyContext(): void {
    if (context === 'popup') {
      const firstId = currentScenario.entities[0]?.entity_id;
      card.areaId = currentScenario.areas?.[firstId] ?? 'living';
    } else {
      card.areaId = undefined;
    }
  }

  renderToolbar();
  rebuildHass();
}

// ───────────────────────── shared layout helpers ─────────────────────────

export function layoutHarness(): { toolbar: HTMLDivElement; stage: HTMLDivElement } {
  document.documentElement.style.fontSize = '';
  document.body.replaceChildren();
  document.body.style.cssText = `
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: linear-gradient(135deg, #1a1f2e 0%, #0f1419 100%);
    color: rgba(255,255,255,0.88);
    min-height: 100vh; margin: 0; padding: 0;
    display: grid; grid-template-rows: auto 1fr;
  `;

  const toolbar = document.createElement('div');
  toolbar.id = 'toolbar';
  toolbar.style.cssText = `
    padding: 16px 20px;
    background: rgba(15,20,30,0.72);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; flex-direction: column; gap: 10px;
    position: sticky; top: 0; z-index: 10;
  `;
  document.body.appendChild(toolbar);

  const stage = document.createElement('div');
  stage.id = 'stage';
  stage.style.cssText = `
    display: flex; align-items: flex-start; justify-content: center;
    padding: 32px 16px 80px;
  `;
  document.body.appendChild(stage);

  return { toolbar, stage };
}

export function chipEl(label: string, active: boolean, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = `
    appearance: none;
    border: 1px solid ${active ? 'rgba(167,139,250,0.45)' : 'rgba(255,255,255,0.08)'};
    background: ${active ? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.04)'};
    color: ${active ? '#fff' : 'rgba(255,255,255,0.7)'};
    font-family: inherit; font-size: 13px;
    font-weight: ${active ? '600' : '500'};
    padding: 6px 12px; border-radius: 999px; cursor: pointer;
    transition: all 150ms ease;
  `;
  b.addEventListener('click', onClick);
  return b;
}

export function rowEl(label: string, children: HTMLElement[]): HTMLDivElement {
  const r = document.createElement('div');
  r.style.cssText = 'display:flex; align-items:center; gap:8px; flex-wrap:wrap;';
  const l = document.createElement('span');
  l.textContent = label;
  l.style.cssText = 'font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-right:4px;';
  r.appendChild(l);
  children.forEach((c) => r.appendChild(c));
  return r;
}
