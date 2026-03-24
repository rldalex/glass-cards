import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import type { BackendService, HomeAssistant } from '@glass-cards/base-card';
import type { PropertyValues } from 'lit';

interface SubSectionDef {
  id: string;
  label: string;
  icon: string;
}

const ADVANCED_SUBS: SubSectionDef[] = [
  { id: 'navbar', label: 'Navbar', icon: 'mdi:dock-bottom' },
  { id: 'orphans', label: 'Entités orphelines', icon: 'mdi:puzzle-outline' },
  { id: 'reconfig', label: 'Reconfigurer', icon: 'mdi:refresh' },
];

export class ConfigAdvancedView extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) backend?: BackendService;
  @property({ attribute: false }) configData: Record<string, unknown> = {};
  @property({ attribute: false }) rooms: unknown[] = [];
  @property() subSection?: string;
  @state() private _autoSort = true;

  protected createRenderRoot() {
    return this;
  }

  override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('configData') && this.configData) {
      const cfg = this.configData as Record<string, unknown>;
      this._autoSort = cfg.auto_sort !== false;
    }
  }

  protected render(): TemplateResult {
    if (this.subSection) {
      if (this.subSection === 'reconfig') {
        this.dispatchEvent(new CustomEvent('reconfig-wizard', { bubbles: true, composed: true }));
        return html`<div class="empty-state">Relancement du wizard...</div>`;
      }
      return this._renderSubSection(this.subSection);
    }

    return html`
      <div class="room-grid">
        ${ADVANCED_SUBS.map(
          (sub) => html`
            <button
              class="room-card"
              @click=${() =>
                this.dispatchEvent(
                  new CustomEvent('sub-select', { detail: sub.id, bubbles: true, composed: true }),
                )}
              aria-label=${sub.label}
            >
              <ha-icon .icon=${sub.icon}></ha-icon>
              <span class="room-name">${sub.label}</span>
            </button>
          `,
        )}
      </div>
    `;
  }

  private _renderSubSection(id: string): TemplateResult {
    switch (id) {
      case 'navbar':
        return this._renderNavbarSettings();
      case 'orphans':
        return html`<config-tab-unassigned
          .hass=${this.hass}
          .configData=${this.configData}
          .backend=${this.backend}
        ></config-tab-unassigned>`;
      default:
        return html`<div>Section inconnue</div>`;
    }
  }

  private _renderNavbarSettings(): TemplateResult {
    return html`
      <div class="section-label">${t('config.navbar_settings')}</div>
      <div class="feature-list">
        <button class="feature-row" @click=${this._toggleAutoSort}>
          <div class="feature-icon"><ha-icon .icon=${'mdi:sort-bool-ascending'}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${t('config.navbar_auto_sort')}</div>
            <div class="feature-desc">${t('config.navbar_auto_sort_desc')}</div>
          </div>
          <span class="toggle ${this._autoSort ? 'on' : ''}" role="switch" aria-checked=${this._autoSort ? 'true' : 'false'} aria-label=${t('config.navbar_auto_sort')}></span>
        </button>
      </div>
    `;
  }

  private async _toggleAutoSort() {
    this._autoSort = !this._autoSort;
    if (this.backend) {
      try {
        await this.backend.send('set_navbar', { auto_sort: this._autoSort });
      } catch { /* error handled by parent */ }
    }
  }
}

try {
  customElements.define('config-advanced-view', ConfigAdvancedView);
} catch {
  /* already registered */
}
