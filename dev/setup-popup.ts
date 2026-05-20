// Popup-card harness — déclenche un popup ouvert sur une pièce mockée.

import { bus } from '@glass-cards/event-bus';
import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeFullHouseHass } from './full-house';
import type { HomeAssistant } from '@glass-cards/base-card';

const AREAS = ['salon', 'chambre', 'cuisine', 'bureau', 'salle_de_bain'] as const;

export async function setupPopup(): Promise<void> {
  // The popup mounts area-scoped sub-cards. Register all that might appear.
  await Promise.all([
    import('../cards/popup-card/src/index'),
    import('../cards/climate-card/src/index'),
    import('../cards/light-card/src/index'),
    import('../cards/cover-card/src/index'),
    import('../cards/fan-card/src/index'),
    import('../cards/media-card/src/index'),
    import('../cards/camera-carousel/src/index'),
  ]);

  let currentArea: typeof AREAS[number] = 'salon';

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; padding: 24px 16px; text-align: center; color: rgba(255,255,255,0.6);';
  wrap.textContent = 'Le popup s\'ouvre par-dessus. Utilise la toolbar pour changer de pièce ou fermer.';
  stage.appendChild(wrap);

  const popup = document.createElement('glass-room-popup') as HTMLElement & { hass?: HomeAssistant };
  document.body.appendChild(popup);

  function renderToolbar(): void {
    toolbar.replaceChildren();
    toolbar.appendChild(rowEl('Pièce', AREAS.map((a) =>
      chipEl(a, a === currentArea, () => { currentArea = a; openPopup(); renderToolbar(); }),
    )));
    toolbar.appendChild(rowEl('Action', [
      chipEl('Fermer popup', false, () => bus.emit('popup-close', undefined)),
      chipEl('Re-ouvrir', false, () => openPopup()),
    ]));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = `Popup sur "${currentArea}" — auto-mount des cards selon entités présentes.`;
    toolbar.appendChild(meta);
  }

  function openPopup(): void {
    bus.emit('popup-open', { areaId: currentArea });
  }

  function mount(): void {
    const hass = makeFullHouseHass((h) => { popup.hass = h; });
    popup.hass = hass;
    setTimeout(() => openPopup(), 100);
  }

  renderToolbar();
  mount();
}
