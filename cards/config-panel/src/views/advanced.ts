import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import type { BackendService, HomeAssistant } from '@glass-cards/base-card';
import type { PropertyValues } from 'lit';

export class ConfigAdvancedView extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) backend?: BackendService;
  @property({ attribute: false }) configData: Record<string, unknown> = {};
  @property({ attribute: false }) rooms: unknown[] = [];
  @property() subSection?: string;
  @state() private _autoSort = true;
  private _reconfigDispatchedFor: string | null = null;

  protected createRenderRoot() {
    return this;
  }

  override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('configData') && this.configData) {
      const cfg = this.configData as Record<string, unknown>;
      this._autoSort = cfg.auto_sort !== false;
    }
    if (changedProps.has('subSection')) {
      if (this.subSection === 'reconfig' && this._reconfigDispatchedFor !== 'reconfig') {
        this._reconfigDispatchedFor = 'reconfig';
        this.dispatchEvent(new CustomEvent('reconfig-wizard', { bubbles: true, composed: true }));
      } else if (this.subSection !== 'reconfig') {
        this._reconfigDispatchedFor = null;
      }
    }
  }

  protected render(): TemplateResult {
    if (this.subSection) {
      if (this.subSection === 'reconfig') {
        return html`
          <glass-empty-state variant="inline" class="reconfig-loading" .icon=${'mdi:loading'} .title=${t('config.advanced_reconfig_loading')}></glass-empty-state>
        `;
      }
      return this._renderSubSection(this.subSection);
    }

    return html`
      <div class="cfg-info">
        <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
        <span>${t('config.advanced_info')}</span>
      </div>

      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">1</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.advanced_settings_title')}</span>
          </div>
        </header>
        <ul class="pref-list" role="list">
          ${this._renderPrefRow('navbar', 'mdi:dock-bottom', 'config.advanced_navbar_title', 'config.advanced_navbar_desc')}
          ${this._renderPrefRow('orphans', 'mdi:puzzle-outline', 'config.advanced_orphans_title', 'config.advanced_orphans_desc')}
        </ul>
      </section>

      <section class="cfg-section danger">
        <header class="cfg-section-head">
          <span class="cfg-section-num">2</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.advanced_danger_title')}</span>
          </div>
        </header>
        <ul class="pref-list" role="list">
          ${this._renderPrefRow('reconfig', 'mdi:refresh', 'config.advanced_reconfig_title', 'config.advanced_reconfig_desc', true)}
        </ul>
      </section>
    `;
  }

  private _renderPrefRow(
    id: string,
    icon: string,
    titleKey: Parameters<typeof t>[0],
    descKey: Parameters<typeof t>[0],
    danger = false,
  ): TemplateResult {
    return html`
      <li>
        <button
          class="pref-row ${danger ? 'danger' : ''}"
          type="button"
          @click=${() => this.dispatchEvent(new CustomEvent('sub-select', { detail: id, bubbles: true, composed: true }))}
          aria-label=${t(titleKey)}
        >
          <span class="pref-row-icon">
            <ha-icon .icon=${icon}></ha-icon>
          </span>
          <span class="pref-row-text">
            <span class="pref-row-name">${t(titleKey)}</span>
            <span class="pref-row-desc">${t(descKey)}</span>
          </span>
          <ha-icon class="pref-row-chev" .icon=${'mdi:chevron-right'}></ha-icon>
        </button>
      </li>
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
        return html`<glass-empty-state variant="inline" .title=${id}></glass-empty-state>`;
    }
  }

  private _renderNavbarSettings(): TemplateResult {
    return html`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">1</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.navbar_settings')}</span>
          </div>
        </header>
        <div class="feature-list">
          <button class="feature-row" role="switch" aria-checked=${this._autoSort ? 'true' : 'false'} @click=${this._toggleAutoSort}>
            <div class="feature-icon"><ha-icon .icon=${'mdi:sort-bool-ascending'}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${t('config.navbar_auto_sort')}</div>
              <div class="feature-desc">${t('config.navbar_auto_sort_desc')}</div>
            </div>
            <glass-toggle presentation .checked=${this._autoSort}></glass-toggle>
          </button>
        </div>
      </section>
    `;
  }

  private async _toggleAutoSort() {
    const prev = this._autoSort;
    this._autoSort = !prev;
    if (!this.backend) return;
    try {
      await this.backend.send('set_navbar', { auto_sort: this._autoSort });
      this.dispatchEvent(new CustomEvent('tab-toast', { detail: { success: true }, bubbles: true, composed: true }));
    } catch {
      // Revert the optimistic toggle so the UI reflects the persisted state
      this._autoSort = prev;
      this.dispatchEvent(new CustomEvent('tab-toast', { detail: { success: false }, bubbles: true, composed: true }));
    }
  }
}

try {
  customElements.define('config-advanced-view', ConfigAdvancedView);
} catch {
  /* already registered */
}
