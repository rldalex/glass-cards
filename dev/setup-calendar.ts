// Calendar-card harness — 3 event scenarios (busy / light / empty), open toggle.

import { layoutHarness, rowEl, chipEl } from './setup-climate';
import type { CalendarEvent } from '../cards/calendar-card/src/index';

interface CalScenario { id: string; label: string; description: string; events: CalendarEvent[] }

const SCENARIOS: CalScenario[] = [
  {
    id: 'busy',
    label: 'Journée chargée',
    description: '7 événements — un en cours, un all-day',
    events: [
      { title: 'Daily standup', time: '09:00 - 09:30', cal: 'travail' },
      { title: 'Dentiste Luca', time: '10:15 - 11:00', cal: 'famille', now: true },
      { title: 'Revue sprint Q2', time: '14:00 - 15:30', cal: 'travail' },
      { title: 'Courses Migros', time: '17:00', cal: 'taches' },
      { title: 'Anniversaire Maman', cal: 'anniversaires', allday: true },
      { title: 'Yoga', time: '18:30 - 19:30', cal: 'perso' },
      { title: 'Appel Marc', time: '20:00', cal: 'perso' },
    ],
  },
  {
    id: 'light',
    label: 'Journée légère',
    description: '2 événements',
    events: [
      { title: 'Brunch dimanche', time: '11:00 - 13:00', cal: 'famille' },
      { title: 'Lessive', cal: 'taches', allday: true },
    ],
  },
  {
    id: 'empty',
    label: 'Vide',
    description: 'Aucun événement',
    events: [],
  },
];

export async function setupCalendar(): Promise<void> {
  await import('../cards/calendar-card/src/index');

  let current = SCENARIOS[0];
  let openByDefault = false;

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-calendar-card') as HTMLElement & {
    events?: CalendarEvent[];
  };
  wrap.appendChild(card);

  function renderToolbar(): void {
    toolbar.replaceChildren();
    toolbar.appendChild(rowEl('Scenario', SCENARIOS.map((s) =>
      chipEl(s.label, s.id === current.id, () => { current = s; apply(); renderToolbar(); }),
    )));
    toolbar.appendChild(rowEl('Fold', [
      chipEl('Toggle open', false, () => {
        openByDefault = !openByDefault;
        // Trigger toggle on the card directly via the compact bar
        const compact = card.shadowRoot?.querySelector('.v4-compact') as HTMLElement | null;
        compact?.click();
      }),
    ]));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = current.description;
    toolbar.appendChild(meta);
  }

  function apply(): void {
    card.events = [...current.events];
  }

  renderToolbar();
  apply();
}
