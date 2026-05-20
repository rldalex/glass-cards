// Navbar-card harness — full house mock, auto-discovery rooms + dashboard cards stack.

import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeFullHouseHass } from './full-house';
import type { HomeAssistant } from '@glass-cards/base-card';

export async function setupNavbar(): Promise<void> {
  // Eagerly register the dashboard sub-cards that navbar might mount
  await Promise.all([
    import('../cards/navbar-card/src/index'),
    import('../cards/climate-card/src/index'),
    import('../cards/light-card/src/index'),
    import('../cards/weather-card/src/index'),
    import('../cards/title-card/src/index'),
    import('../cards/cover-card/src/index'),
    import('../cards/fan-card/src/index'),
    import('../cards/media-card/src/index'),
    import('../cards/presence-card/src/index'),
    import('../cards/camera-carousel/src/index'),
    import('../cards/popup-card/src/index'),
  ]);

  const { toolbar, stage } = layoutHarness();
  stage.style.padding = '0';
  stage.style.minHeight = '100vh';

  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; margin: 0 auto;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-navbar-card') as HTMLElement & {
    hass?: HomeAssistant;
    setConfig?: (c: unknown) => void;
  };
  card.setAttribute('size', 'sm');
  wrap.appendChild(card);

  function renderToolbar(): void {
    toolbar.replaceChildren();
    toolbar.appendChild(rowEl('Mock', [
      chipEl('Full house (5 pièces, tous domaines)', true, () => { /* noop */ }),
    ]));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = 'Navbar avec auto-discovery — clique sur une pièce pour ouvrir son popup.';
    toolbar.appendChild(meta);
  }

  function mount(): void {
    const hass = makeFullHouseHass((h) => { card.hass = h; });
    card.hass = hass;
    card.setConfig?.({ type: 'custom:glass-navbar-card' });
  }

  renderToolbar();
  mount();
}
