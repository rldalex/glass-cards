// Calendar-card harness — 3 event scenarios (busy / light / empty), open toggle.

import { layoutHarness, rowEl, chipEl } from './setup-climate';
import type { CalendarEvent } from '../cards/calendar-card/src/index';

interface CalScenario { id: string; label: string; description: string; events: CalendarEvent[] }

const SCENARIOS: CalScenario[] = [
  {
    id: 'busy',
    label: 'Semaine remplie',
    description: 'Today + demain + jours suivants, dont une vacance multi-jours (J+2 → J+4)',
    events: [
      // Today (J+0)
      { title: 'Daily standup', time: '09:00 - 09:30', cal: 'travail', dayOffset: 0 },
      { title: 'Dentiste Luca', time: '10:15 - 11:00', cal: 'famille', now: true, dayOffset: 0 },
      { title: 'Revue sprint Q2', time: '14:00 - 15:30', cal: 'travail', dayOffset: 0 },
      { title: 'Courses Migros', time: '17:00', cal: 'taches', dayOffset: 0 },
      { title: 'Anniversaire Maman', cal: 'anniversaires', allday: true, dayOffset: 0 },
      { title: 'Yoga', time: '18:30 - 19:30', cal: 'perso', dayOffset: 0 },
      { title: 'Appel Marc', time: '20:00', cal: 'perso', dayOffset: 0 },
      // Tomorrow (J+1)
      { title: 'Rendez-vous médecin', time: '08:30 - 09:15', cal: 'perso', dayOffset: 1 },
      { title: 'Lunch avec Sarah', time: '12:30 - 14:00', cal: 'travail', dayOffset: 1 },
      { title: 'École Luca: réunion', time: '17:00 - 18:00', cal: 'famille', dayOffset: 1 },
      { title: 'Préparer valises', time: '20:00 - 21:00', cal: 'taches', dayOffset: 1 },
      // Multi-day all-day vacation (J+2 → J+4, end exclusive in CalDAV → spans 2, 3, 4)
      // Each day adds its own timed event for visual distinguishability
      { title: 'Vacances Annecy', cal: 'perso', allday: true, dayOffset: 2 },
      { title: 'Vol Genève → Annecy', time: '15:00 - 16:30', cal: 'travail', dayOffset: 2 },
      { title: 'Vacances Annecy', cal: 'perso', allday: true, dayOffset: 3 },
      { title: 'Randonnée Lac d\'Annecy', time: '09:00 - 14:00', cal: 'perso', dayOffset: 3 },
      { title: 'Anniversaire Léa', cal: 'anniversaires', allday: true, dayOffset: 3 },
      { title: 'Vacances Annecy', cal: 'perso', allday: true, dayOffset: 4 },
      { title: 'Retour Genève', time: '18:00 - 19:30', cal: 'travail', dayOffset: 4 },
      // J+5
      { title: 'Brunch Maman', time: '11:00 - 13:00', cal: 'famille', dayOffset: 5 },
      { title: 'Sport', time: '17:00 - 18:30', cal: 'perso', dayOffset: 5 },
      // J+6 : empty (montre l'empty state)
    ],
  },
  {
    id: 'light',
    label: 'Journée légère',
    description: '2 événements aujourd\'hui, rien les autres jours',
    events: [
      { title: 'Brunch dimanche', time: '11:00 - 13:00', cal: 'famille', dayOffset: 0 },
      { title: 'Lessive', cal: 'taches', allday: true, dayOffset: 0 },
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
