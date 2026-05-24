// Showcase for the @glass-cards/ui-core primitive components.
// Renders each primitive in multiple states + an a11y inspector that
// outlines tap targets <44px in red.

import {
  glassTokens,
  glassMixin,
  hostMixin,
  type GlassTabItem,
} from '@glass-cards/ui-core';
import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

class PrimitivesShowcase extends LitElement {
  @property({ type: Boolean }) inspector = false;
  @property({ type: Boolean }) tableActive1 = false;
  @property({ type: Boolean }) tableChecked = true;
  @property({ type: String }) tabValue = 'hourly';
  @property({ type: String }) tabValue2 = 'salon';
  @property({ type: String }) selectedColor = '#fbbf24';
  @property({ type: String }) inputValue = '';

  static styles = [
    glassTokens,
    hostMixin,
    glassMixin,
    css`
      :host {
        display: block;
        padding: 1.5rem;
        max-width: 720px;
        margin: 0 auto;
      }
      h2 {
        font-size: var(--fz-xs);
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: var(--t4);
        margin: 2.5rem 0 1rem;
      }
      h2:first-of-type { margin-top: 0; }
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        border-radius: var(--radius-lg);
        background: rgba(0, 0, 0, 0.18);
        border: 1px solid var(--b1);
        margin-bottom: 0.75rem;
      }
      .row + .row { margin-top: -0.25rem; }
      .label {
        font-size: var(--fz-sm);
        color: var(--t3);
        min-width: 6rem;
      }
      .toolbar {
        display: flex;
        gap: 0.75rem;
        padding: 0.75rem 0;
        position: sticky;
        top: 0;
        background: rgba(15, 20, 30, 0.85);
        backdrop-filter: blur(20px);
        z-index: 10;
        margin: -1.5rem -1.5rem 1rem;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--b1);
      }
      .toolbar-label {
        flex: 1;
        font-weight: 700;
        font-size: var(--fz-md);
        color: var(--t1);
        display: flex;
        align-items: center;
      }
      /* Inspector — visualizes every primitive whose visual is smaller than
         44px. Cyan outline = the visual box. Dashed red ::after = the
         tactile envelope (44×44 via builtin hit-area on coarse pointers).
         Useful to confirm a control is reachable even when it looks tiny. */
      :host([inspector]) glass-icon-button[size='xs'],
      :host([inspector]) glass-icon-button[size='sm'],
      :host([inspector]) glass-chip[size='sm'],
      :host([inspector]) glass-color-swatch,
      :host([inspector]) glass-drag-handle,
      :host([inspector]) glass-pill[interactive],
      :host([inspector]) glass-chevron[interactive],
      :host([inspector]) glass-progress-bar[interactive],
      :host([inspector]) glass-button[size='sm'] {
        outline: 1px solid rgba(56, 189, 248, 0.7);
        outline-offset: 0;
        position: relative;
      }
      :host([inspector]) glass-icon-button[size='xs']::after,
      :host([inspector]) glass-icon-button[size='sm']::after,
      :host([inspector]) glass-chip[size='sm']::after,
      :host([inspector]) glass-color-swatch::after,
      :host([inspector]) glass-drag-handle::after,
      :host([inspector]) glass-pill[interactive]::after,
      :host([inspector]) glass-chevron[interactive]::after,
      :host([inspector]) glass-button[size='sm']::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: var(--tap-lg);
        height: var(--tap-lg);
        transform: translate(-50%, -50%);
        border: 1px dashed rgba(248, 113, 113, 0.7);
        border-radius: 4px;
        pointer-events: none;
        z-index: 999;
      }
      .sub {
        font-size: var(--fz-sm);
        color: var(--t4);
        margin-bottom: 0.5rem;
      }
      .swatches {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    `,
  ];

  private _tabs1: GlassTabItem[] = [
    { value: 'hourly', label: 'Heure', icon: 'mdi:clock-outline' },
    { value: 'daily', label: 'Jour', icon: 'mdi:calendar' },
  ];
  private _tabs2: GlassTabItem[] = [
    { value: 'salon', label: 'Salon' },
    { value: 'chambre', label: 'Chambre' },
    { value: 'cuisine', label: 'Cuisine' },
  ];
  private _swatches = ['#fbbf24', '#f87171', '#60a5fa', '#4ade80', '#a78bfa', '#f97316', '#ffffff'];

  protected render() {
    return html`
      <div class="toolbar">
        <div class="toolbar-label">Glass Cards — UI Primitives</div>
        <glass-toggle
          .checked=${this.inspector}
          @glass-toggle-change=${(e: CustomEvent) => { this.inspector = e.detail.checked; }}
        ></glass-toggle>
        <span class="label">Inspector</span>
      </div>

      <h2>glass-icon-button</h2>
      <div class="sub">Square rounded icon button. Sizes: <code>xs</code> 28px / <code>sm</code> 32px / <code>md</code> 44px (default) / <code>lg</code> 52px. Anything &lt;44px gets a transparent ::after extension on coarse pointers so the tactile area is always at least 44px.</div>
      <div class="row">
        <span class="label">xs (28px)</span>
        <glass-icon-button icon="mdi:close" size="xs" aria-label="close xs"></glass-icon-button>
        <glass-icon-button icon="mdi:pencil" size="xs" aria-label="edit xs"></glass-icon-button>
        <glass-icon-button icon="mdi:delete-outline" size="xs" active active-color="alert" aria-label="delete xs"></glass-icon-button>
        <glass-icon-button icon="mdi:tune-vertical" size="xs" active active-color="purple" aria-label="presets xs"></glass-icon-button>
        <glass-icon-button icon="mdi:calendar-clock" size="xs" active active-color="accent" aria-label="schedule xs"></glass-icon-button>
      </div>
      <div class="row">
        <span class="label">sm (32px)</span>
        <glass-icon-button icon="mdi:close" size="sm" aria-label="close"></glass-icon-button>
        <glass-icon-button icon="mdi:heart" size="sm" active active-color="alert" aria-label="favorite"></glass-icon-button>
      </div>
      <div class="row">
        <span class="label">md (44px, default)</span>
        <glass-icon-button icon="mdi:lightbulb" aria-label="lightbulb idle"></glass-icon-button>
        <glass-icon-button icon="mdi:lightbulb" active active-color="light-glow" glow aria-label="lightbulb on"></glass-icon-button>
        <glass-icon-button icon="mdi:lightbulb-off" disabled aria-label="lightbulb disabled"></glass-icon-button>
        <glass-icon-button icon="mdi:alert" unavailable aria-label="lightbulb unavailable"></glass-icon-button>
      </div>
      <div class="row">
        <span class="label">lg (52px)</span>
        <glass-icon-button icon="mdi:play" size="lg" active active-color="accent" aria-label="play"></glass-icon-button>
      </div>
      <div class="row">
        <span class="label">colors</span>
        <glass-icon-button icon="mdi:fan" active active-color="cool" aria-label="fan"></glass-icon-button>
        <glass-icon-button icon="mdi:thermometer" active active-color="heat" aria-label="heat"></glass-icon-button>
        <glass-icon-button icon="mdi:music" active active-color="purple" aria-label="music"></glass-icon-button>
        <glass-icon-button icon="mdi:spotify" active active-color="spotify" aria-label="spotify"></glass-icon-button>
      </div>

      <h2>glass-chip</h2>
      <div class="sub">Mode/preset/scene chip. Min height = 44px always. Use <code>size="sm"</code> for visual density (visual 28px, tactile 44px via hit-area).</div>
      <div class="row">
        <glass-chip>50%</glass-chip>
        <glass-chip active>Stop</glass-chip>
        <glass-chip icon="mdi:weather-sunny">Soleil</glass-chip>
        <glass-chip active active-color="success" icon="mdi:check">Validé</glass-chip>
        <glass-chip disabled>Verrouillé</glass-chip>
      </div>
      <div class="row">
        <span class="label">size sm</span>
        <glass-chip size="sm">Cool</glass-chip>
        <glass-chip size="sm" active active-color="cool">Auto</glass-chip>
        <glass-chip size="sm">Heat</glass-chip>
      </div>

      <h2>glass-toggle</h2>
      <div class="sub">Switch on/off. Tap target = 44px wrapper. Knob track 40x22 is visual only.</div>
      <div class="row">
        <span class="label">Off</span>
        <glass-toggle aria-label="off"></glass-toggle>
        <span class="label">On</span>
        <glass-toggle checked aria-label="on"></glass-toggle>
        <span class="label">Disabled</span>
        <glass-toggle disabled aria-label="disabled"></glass-toggle>
      </div>
      <div class="row">
        <span class="label">controlled</span>
        <glass-toggle
          .checked=${this.tableChecked}
          @glass-toggle-change=${(e: CustomEvent) => { this.tableChecked = e.detail.checked; }}
          aria-label="controlled"
        ></glass-toggle>
        <span class="label">value = ${this.tableChecked ? 'on' : 'off'}</span>
      </div>
      <div class="row" style="flex-direction: column; align-items: stretch; gap: 0.25rem;">
        <span class="label">presentation mode (decorative — parent owns the click + role=switch)</span>
        <button
          style="display:flex;align-items:center;gap:0.625rem;width:100%;padding:0.5rem 0.75rem;background:var(--s1);border:1px solid var(--b1);border-radius:var(--radius-md);color:inherit;font:inherit;text-align:left;cursor:pointer;"
          role="switch"
          aria-checked=${this.tableChecked ? 'true' : 'false'}
          @click=${() => { this.tableChecked = !this.tableChecked; }}
        >
          <ha-icon .icon=${'mdi:lightbulb'}></ha-icon>
          <span style="flex:1">Tap the whole row</span>
          <glass-toggle presentation .checked=${this.tableChecked}></glass-toggle>
        </button>
      </div>

      <h2>glass-stepper-button</h2>
      <div class="sub">Stepper +/-. Two surfaces: <code>light</code> (default) for normal cards, <code>dark</code> for sub-panels (rgba black 0.25).</div>
      <div class="row">
        <span class="label">light surface</span>
        <glass-stepper-button icon="mdi:minus" aria-label="decrease"></glass-stepper-button>
        <glass-stepper-button icon="mdi:plus" aria-label="increase"></glass-stepper-button>
      </div>
      <div class="row" style="background: rgba(0,0,0,0.35);">
        <span class="label">dark surface</span>
        <glass-stepper-button icon="mdi:minus" surface="dark" aria-label="decrease"></glass-stepper-button>
        <glass-stepper-button icon="mdi:plus" surface="dark" aria-label="increase"></glass-stepper-button>
      </div>

      <h2>glass-transport-button</h2>
      <div class="sub">Media transport. Standard = 44px, main = 52px circular emphasis.</div>
      <div class="row">
        <glass-transport-button icon="mdi:skip-previous" aria-label="prev"></glass-transport-button>
        <glass-transport-button icon="mdi:play" variant="main" aria-label="play"></glass-transport-button>
        <glass-transport-button icon="mdi:skip-next" aria-label="next"></glass-transport-button>
        <glass-transport-button icon="mdi:shuffle" active active-color="spotify" aria-label="shuffle"></glass-transport-button>
      </div>

      <h2>glass-tabs</h2>
      <div class="sub">Segmented control / tabs. Each tab is 44px tall.</div>
      <div class="row">
        <glass-tabs
          .items=${this._tabs1}
          .value=${this.tabValue}
          @glass-tab-change=${(e: CustomEvent) => { this.tabValue = e.detail.value; }}
          aria-label="forecast type"
        ></glass-tabs>
      </div>
      <div class="row">
        <span class="label">rail</span>
        <glass-tabs
          .items=${this._tabs2}
          .value=${this.tabValue2}
          layout="rail"
          @glass-tab-change=${(e: CustomEvent) => { this.tabValue2 = e.detail.value; }}
          aria-label="rooms"
        ></glass-tabs>
      </div>

      <h2>glass-pill</h2>
      <div class="sub">Decorative badge. Static by default. Pass <code>interactive</code> for clickable variant with hit-area.</div>
      <div class="row">
        <glass-pill>12</glass-pill>
        <glass-pill tone="accent">Live</glass-pill>
        <glass-pill tone="success">Connected</glass-pill>
        <glass-pill tone="warning">Stale</glass-pill>
        <glass-pill tone="alert">Offline</glass-pill>
        <glass-pill tone="info">New</glass-pill>
      </div>
      <div class="row">
        <span class="label">interactive</span>
        <glass-pill interactive tone="accent" aria-label="open">Open all</glass-pill>
        <glass-pill interactive tone="alert" aria-label="dismiss">×</glass-pill>
      </div>

      <h2>glass-section-title</h2>
      <div class="row" style="flex-direction: column; align-items: stretch;">
        <glass-section-title label="Programmes"></glass-section-title>
        <glass-section-title label="Notifications">
          <glass-pill slot="end" tone="accent">3</glass-pill>
        </glass-section-title>
      </div>

      <h2>glass-fold-separator</h2>
      <div class="row" style="flex-direction: column; align-items: stretch; gap: 1rem;">
        <glass-fold-separator></glass-fold-separator>
        <glass-fold-separator variant="half"></glass-fold-separator>
        <glass-fold-separator tint="success"></glass-fold-separator>
      </div>

      <h2>glass-color-swatch</h2>
      <div class="sub">Palette dot. Visual 26px, tactile 44px via builtin hit-area. Default highlight = white ring. Pass <code>with-check</code> to also render a centered <code>mdi:check</code> icon — useful when swatches share similar semantic tones.</div>
      <div class="row">
        <span class="label">ring only</span>
        <div class="swatches">
          ${this._swatches.map((c) => html`
            <glass-color-swatch
              .color=${c}
              ?selected=${this.selectedColor === c}
              @click=${() => { this.selectedColor = c; }}
              aria-label="color ${c}"
            ></glass-color-swatch>
          `)}
        </div>
      </div>
      <div class="row">
        <span class="label">with-check</span>
        <div class="swatches">
          ${['var(--c-success)', 'var(--c-warning)', 'var(--c-info)', 'var(--c-accent)', 'var(--c-alert)'].map((c) => html`
            <glass-color-swatch
              with-check
              .color=${c}
              ?selected=${this.selectedColor === c}
              @click=${() => { this.selectedColor = c; }}
              aria-label="semantic ${c}"
            ></glass-color-swatch>
          `)}
        </div>
      </div>

      <h2>glass-form-input</h2>
      <div class="row" style="flex-direction: column; align-items: stretch; gap: 0.5rem;">
        <glass-form-input
          placeholder="Envoyer un message…"
          .value=${this.inputValue}
          @glass-input=${(e: CustomEvent) => { this.inputValue = e.detail.value; }}
          aria-label="notification"
        ></glass-form-input>
        <glass-form-input
          multiline
          placeholder="Multi-ligne…"
          aria-label="notes"
        ></glass-form-input>
      </div>

      <h2>glass-button</h2>
      <div class="row">
        <glass-button variant="primary" icon="mdi:content-save">Enregistrer</glass-button>
        <glass-button variant="secondary">Annuler</glass-button>
        <glass-button variant="ghost" icon="mdi:arrow-left">Retour</glass-button>
        <glass-button variant="danger" icon="mdi:delete">Supprimer</glass-button>
      </div>
      <div class="row">
        <glass-button size="sm">Petit</glass-button>
        <glass-button size="sm" variant="primary">Petit primary</glass-button>
        <glass-button loading variant="primary">Loading…</glass-button>
      </div>

      <h2>glass-chevron</h2>
      <div class="sub">Decorative chevron that rotates 180° when <code>open</code>. Use for fold indicators, dropdown triggers, expandable rows. Wrap in a button if you need it clickable.</div>
      <div class="row">
        <span class="label">Closed</span>
        <glass-chevron></glass-chevron>
        <span class="label">Open</span>
        <glass-chevron open></glass-chevron>
        <span class="label">Accent</span>
        <glass-chevron tone="accent"></glass-chevron>
        <glass-chevron open tone="accent"></glass-chevron>
        <span class="label">Muted</span>
        <glass-chevron tone="muted"></glass-chevron>
      </div>
      <div class="row">
        <span class="label">Sizes</span>
        <glass-chevron size="sm"></glass-chevron>
        <glass-chevron size="md"></glass-chevron>
        <glass-chevron size="lg"></glass-chevron>
      </div>
      <div class="row">
        <span class="label">Interactive</span>
        <glass-chevron interactive aria-label="toggle"></glass-chevron>
        <glass-chevron interactive open tone="accent" aria-label="toggle open"></glass-chevron>
        <span class="label">→ 44px hit-area builtin, focusable, click bubbles</span>
      </div>

      <h2>glass-status-dot</h2>
      <div class="sub">Petit cercle indicateur d'état. Non-interactif. <code>glow</code> pour halo.</div>
      <div class="row">
        <glass-status-dot></glass-status-dot>
        <glass-status-dot tone="accent" glow></glass-status-dot>
        <glass-status-dot tone="success" glow></glass-status-dot>
        <glass-status-dot tone="warning" glow></glass-status-dot>
        <glass-status-dot tone="alert" glow></glass-status-dot>
        <glass-status-dot tone="light-glow" glow></glass-status-dot>
        <glass-status-dot tone="spotify" glow></glass-status-dot>
        <glass-status-dot tone="heat" glow></glass-status-dot>
        <glass-status-dot tone="cool" glow></glass-status-dot>
        <span class="label">→ sizes</span>
        <glass-status-dot size="xs" tone="accent"></glass-status-dot>
        <glass-status-dot size="sm" tone="accent"></glass-status-dot>
        <glass-status-dot size="md" tone="accent"></glass-status-dot>
      </div>

      <h2>glass-drag-handle</h2>
      <div class="row">
        <glass-drag-handle></glass-drag-handle>
        <glass-drag-handle size="sm"></glass-drag-handle>
        <span class="label">→ cursor grab + dim, raises on hover</span>
      </div>

      <h2>glass-empty-state</h2>
      <div class="sub">4 variants: <code>default</code> (vertical, icon-in-circle), <code>alert</code> (red tint), <code>compact</code> (smaller, in folds), <code>inline</code> (horizontal with dashed border, for admin lists).</div>
      <div class="row" style="flex-direction: column; align-items: stretch; gap: 1rem;">
        <glass-empty-state
          icon="mdi:music-off"
          title="Aucune playlist"
          subtitle="Crée-en une depuis ton compte Spotify pour qu'elle apparaisse ici."
        ></glass-empty-state>
        <glass-empty-state
          icon="mdi:wifi-off"
          title="Connexion perdue"
          subtitle="Vérifie ton intégration Spotify dans Home Assistant."
          variant="alert"
        ></glass-empty-state>
        <glass-empty-state
          icon="mdi:calendar-blank"
          title="Pas d'événements"
          variant="compact"
        ></glass-empty-state>
        <glass-empty-state
          icon="mdi:cctv"
          title="Aucune caméra configurée"
          variant="inline"
        ></glass-empty-state>
        <glass-empty-state
          icon="mdi:wifi-off"
          title="Spotify déconnecté"
          variant="inline"
        ><glass-button size="sm" variant="primary">Reconnecter</glass-button></glass-empty-state>
      </div>

      <h2>glass-progress-bar</h2>
      <div class="sub">Non-interactive (battery, cleaning progress) or interactive (seek bar). The interactive track grows on hover and shows a thumb.</div>
      <div class="row" style="flex-direction: column; align-items: stretch; gap: 0.5rem;">
        <span class="label">Static — vacuum %</span>
        <glass-progress-bar value="40" fill-color="cool" aria-label="cleaning"></glass-progress-bar>
        <span class="label">Static — battery low</span>
        <glass-progress-bar value="15" fill-color="alert" aria-label="battery"></glass-progress-bar>
        <span class="label">Interactive — media seek</span>
        <glass-progress-bar interactive value="62" aria-label="seek"></glass-progress-bar>
      </div>

      <h2>glass-dropdown</h2>
      <div class="sub">Pass <code>search-placeholder</code> and <code>empty-text</code> to localise. English defaults so ui-core stays decoupled from i18n. <strong>Theming:</strong> the trigger button is exposed as <code>::part(trigger)</code> (also <code>::part(label)</code>, <code>::part(menu)</code>, <code>::part(search)</code>, <code>::part(empty)</code>, <code>::part(item)</code>, <code>::part(item-selected)</code>) — consumers override styles through CSS shadow parts instead of trying to pierce the shadow DOM.</div>
      <div class="row" style="flex-direction: column; align-items: stretch;">
        <glass-dropdown
          .items=${[
            { value: 'salon', label: 'Salon', icon: 'mdi:sofa' },
            { value: 'chambre', label: 'Chambre', icon: 'mdi:bed' },
            { value: 'cuisine', label: 'Cuisine', icon: 'mdi:silverware-fork-knife' },
            { value: 'bureau', label: 'Bureau', icon: 'mdi:desk' },
            { value: 'sdb', label: 'Salle de bain', icon: 'mdi:shower' },
          ]}
          label="Sélectionner une pièce"
          icon="mdi:home"
          searchable
          search-placeholder="Rechercher une pièce…"
          empty-text="Aucune pièce"
          aria-label="room"
        ></glass-dropdown>
      </div>

      <h2>glass-slider (existing)</h2>
      <div class="row" style="flex-direction: column; align-items: stretch; gap: 0.75rem;">
        <glass-slider value="40" min="0" max="100" step="1" label="40 %"></glass-slider>
        <glass-slider value="180" min="0" max="360" step="1" label="Hue" color="var(--rgb-purple)"></glass-slider>
      </div>

      <h2>glass-compact-bar</h2>
      <div class="row" style="flex-direction: column; align-items: stretch; padding: 0; background: transparent; border: none;">
        <div class="glass" style="position: relative; padding: 0;">
          <glass-compact-bar>
            <glass-icon-button slot="start" icon="mdi:lightbulb" active active-color="light-glow" glow aria-label="light"></glass-icon-button>
            <div style="font-weight: 600; color: var(--t1); font-size: var(--fz-md);">Plafonnier Salon</div>
            <div style="font-size: var(--fz-sm); color: var(--t3);">75 %</div>
            <glass-toggle slot="end" checked aria-label="lamp"></glass-toggle>
          </glass-compact-bar>
        </div>
      </div>
    `;
  }
}

try { customElements.define('primitives-showcase', PrimitivesShowcase); } catch { /* hmr */ }

export async function setupPrimitives(): Promise<void> {
  await import('@glass-cards/ui-core');

  // Match Home Assistant's default root font-size so rem values render at
  // the same scale as production (HA: 14px / browser default: 16px).
  document.documentElement.style.fontSize = '14px';
  document.body.replaceChildren();
  document.body.style.cssText = `
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: linear-gradient(135deg, #1a1f2e 0%, #0f1419 100%);
    color: rgba(255,255,255,0.88);
    min-height: 100vh; margin: 0; padding: 0;
  `;
  const showcase = document.createElement('primitives-showcase');
  document.body.appendChild(showcase);
}
