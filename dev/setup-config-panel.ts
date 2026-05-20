// Config-panel harness — mounts <glass-config-panel> with rich mock house data.
// All sub-cards are registered so that live previews in each tab render correctly.

import { makeFullHouseHass } from './full-house';
import { layoutHarness, rowEl, chipEl } from './setup-climate';
import type { HomeAssistant } from '@glass-cards/base-card';

export async function setupConfigPanel(): Promise<void> {
  // Register all sub-cards that the config-panel mounts as previews.
  await Promise.all([
    import('../cards/config-panel/src/index'),
    import('../cards/light-card/src/index'),
    import('../cards/climate-card/src/index'),
    import('../cards/cover-card/src/index'),
    import('../cards/fan-card/src/index'),
    import('../cards/media-card/src/index'),
    import('../cards/weather-card/src/index'),
    import('../cards/title-card/src/index'),
    import('../cards/spotify-card/src/index'),
    import('../cards/presence-card/src/index'),
    import('../cards/camera-carousel/src/index'),
    import('../cards/calendar-card/src/index'),
    import('../cards/navbar-card/src/index'),
    import('../cards/popup-card/src/index'),
  ]);

  const { toolbar, stage } = layoutHarness();

  // Config panel is wider — give it more room.
  stage.style.padding = '24px 16px 80px';
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:900px;';
  stage.appendChild(wrap);

  const panel = document.createElement('glass-config-panel') as HTMLElement & {
    hass?: HomeAssistant; narrow?: boolean;
  };
  panel.style.cssText = 'display:block; width:100%; min-height:80vh;';
  wrap.appendChild(panel);

  let narrow = false;

  function renderToolbar(): void {
    toolbar.replaceChildren();
    toolbar.appendChild(rowEl('Width', (['wide', 'narrow'] as const).map((w) =>
      chipEl(w, (w === 'narrow') === narrow, () => {
        narrow = w === 'narrow';
        panel.narrow = narrow;
        wrap.style.maxWidth = narrow ? '420px' : '900px';
        renderToolbar();
      }),
    )));
    toolbar.appendChild(rowEl('Reset', [
      chipEl('Re-mount panel', false, () => mount()),
    ]));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = 'Maison complète : 6 pièces, ~60 entités (lights, climates, covers, fans, media, cameras+companions, sensors, persons, calendar, scenes, input_select/boolean). Toutes les previews de tabs sont vivantes.';
    toolbar.appendChild(meta);
  }

  function mount(): void {
    const hass = makeFullHouseHass((h) => { panel.hass = h; });
    panel.hass = hass;
    panel.narrow = narrow;
  }

  renderToolbar();
  mount();
}
