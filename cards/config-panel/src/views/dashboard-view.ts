import { LitElement, html, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import type { HomeAssistant, BackendService } from '@glass-cards/base-card';
import { DOMAIN_COLORS } from '@glass-cards/ui-core';
import type { RoomEntry } from '../types';
import { createSaveScheduler } from '../utils/save-scheduler';

// Card metadata for the grid
interface DashCardMeta {
  id: string;
  icon: string;
  nameKey: Parameters<typeof t>[0];
  color: string;
}

/** `color` is an RGB triplet string ("251,191,36") used as `rgb(var(--icon-color))`
 *  and `rgba(var(--icon-color), x)` for tints. Falls back to accent in the CSS. */
const DASH_CARD_META: DashCardMeta[] = [
  { id: 'title', icon: 'mdi:format-title', nameKey: 'config.dashboard_card_title', color: DOMAIN_COLORS.title.rgb },
  { id: 'light', icon: 'mdi:lightbulb-group', nameKey: 'config.dashboard_card_light', color: DOMAIN_COLORS.light.rgb },
  { id: 'weather', icon: 'mdi:weather-partly-cloudy', nameKey: 'config.dashboard_card_weather', color: DOMAIN_COLORS.weather.rgb },
  { id: 'cover', icon: 'mdi:blinds', nameKey: 'config.dashboard_card_cover', color: DOMAIN_COLORS.cover.rgb },
  { id: 'climate', icon: 'mdi:thermostat', nameKey: 'config.dashboard_card_climate', color: DOMAIN_COLORS.climate.rgb },
  { id: 'fan', icon: 'mdi:fan', nameKey: 'config.dashboard_card_fan', color: DOMAIN_COLORS.fan.rgb },
  { id: 'media', icon: 'mdi:speaker', nameKey: 'config.dashboard_card_media', color: DOMAIN_COLORS.media.rgb },
  { id: 'spotify', icon: 'mdi:spotify', nameKey: 'config.dashboard_card_spotify', color: DOMAIN_COLORS.spotify.rgb },
  { id: 'presence', icon: 'mdi:account-group', nameKey: 'config.dashboard_card_presence', color: DOMAIN_COLORS.presence.rgb },
  { id: 'camera_carousel', icon: 'mdi:cctv', nameKey: 'config.dashboard_card_camera_carousel', color: DOMAIN_COLORS.camera.rgb },
  { id: 'calendar', icon: 'mdi:calendar-month', nameKey: 'config.dashboard_card_calendar', color: DOMAIN_COLORS.calendar.rgb },
];

// Map card IDs to sub-section IDs used by tabs
const SUB_MAP: Record<string, string> = {
  title: 'title', light: 'light', weather: 'weather',
  cover: 'cover', climate: 'climate', fan: 'fan', media: 'media',
  spotify: 'spotify', presence: 'presence', camera_carousel: 'camera',
  calendar: 'calendar',
};

// Map sub-section IDs to backend config keys (used by _sliceFor)
const CONFIG_KEYS: Record<string, string> = {
  title: 'title_card', weather: 'weather', light: 'light_card', cover: 'cover_card',
  climate: 'climate_card', fan: 'fan_card', media: 'media_card',
  spotify: 'spotify_card', presence: 'presence_card', camera: 'camera_carousel',
  calendar: 'calendar_card',
};

export class ConfigDashboardView extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) backend?: BackendService;
  @property({ attribute: false }) configData: Record<string, unknown> = {};
  @property({ attribute: false }) rooms: RoomEntry[] = [];
  @property() subSection?: string;

  // Dashboard state
  @state() _enabledCards: string[] = ['weather'];
  @state() _cardOrder: string[] = [];
  @state() _hideHeader = false;
  @state() _hideSidebar = false;
  @state() _dynamicBackground = true;

  // Drag state
  @state() _dragIdx: number | null = null;
  @state() _dropIdx: number | null = null;

  private _saveScheduler = createSaveScheduler();

  protected createRenderRoot() { return this; }

  override updated(changedProps: PropertyValues): void {
    if (changedProps.has('configData') && this.configData) {
      this._loadFromConfig(this.configData);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._saveScheduler.cancel();
  }

  // ── Load ──

  private _loadFromConfig(config: Record<string, unknown>): void {
    const dash = config.dashboard as {
      enabled_cards?: string[];
      card_order?: string[];
      hide_header?: boolean;
      hide_sidebar?: boolean;
      dynamic_background?: boolean;
    } | undefined;

    if (dash) {
      this._enabledCards = dash.enabled_cards ?? ['weather'];
      this._cardOrder = dash.card_order ?? DASH_CARD_META.map(c => c.id);
      this._hideHeader = dash.hide_header ?? false;
      this._hideSidebar = dash.hide_sidebar ?? false;
      this._dynamicBackground = dash.dynamic_background ?? true;
    }

  }

  // ── Save ──

  private _scheduleSave(): void {
    this._saveScheduler.schedule(() => this._save());
  }

  private async _save(): Promise<void> {
    if (!this.backend) return;
    try {
      await this.backend.send('set_dashboard', {
        enabled_cards: this._enabledCards,
        card_order: this._cardOrder,
        hide_header: this._hideHeader,
        hide_sidebar: this._hideSidebar,
        dynamic_background: this._dynamicBackground,
      });

      bus.emit('dashboard-config-changed', undefined);
      this.dispatchEvent(new CustomEvent('tab-toast', { detail: { success: true }, bubbles: true, composed: true }));
    } catch {
      this.dispatchEvent(new CustomEvent('tab-toast', { detail: { success: false }, bubbles: true, composed: true }));
    }
  }

  // ── Actions ──

  private _toggleCard(cardId: string): void {
    const set = new Set(this._enabledCards);
    if (set.has(cardId)) set.delete(cardId); else set.add(cardId);
    this._enabledCards = [...set];
    this._scheduleSave();
  }

  private _toggleHideHeader(): void { this._hideHeader = !this._hideHeader; this._scheduleSave(); }
  private _toggleHideSidebar(): void { this._hideSidebar = !this._hideSidebar; this._scheduleSave(); }
  private _toggleDynamicBg(): void { this._dynamicBackground = !this._dynamicBackground; this._scheduleSave(); }

  // ── Drag & drop ──

  private _onDragStart(idx: number): void { this._dragIdx = idx; }
  private _onDragOver(idx: number, e: DragEvent): void { e.preventDefault(); this._dropIdx = idx; }
  private _onDragLeave(): void { this._dropIdx = null; }
  private _onDragEnd(): void { this._dragIdx = null; this._dropIdx = null; }

  private _onDrop(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._dragIdx !== null && this._dragIdx !== idx) {
      const arr = [...this._cardOrder];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._cardOrder = arr;
      this._scheduleSave();
    }
    this._dragIdx = null;
    this._dropIdx = null;
  }

  // ── Navigate to card config ──

  private _navigateToCard(cardId: string): void {
    const sub = SUB_MAP[cardId] ?? cardId;
    this.dispatchEvent(new CustomEvent('sub-select', { detail: sub, bubbles: true, composed: true }));
  }

  // ── Render ──

  protected render(): TemplateResult {
    if (this.subSection) return this._renderSubSection(this.subSection);
    return this._renderDashboard();
  }

  private _renderDashboard(): TemplateResult {
    const enabledSet = new Set(this._enabledCards);

    // Build ordered list from _cardOrder, filling in any missing cards
    const allIds = new Set(DASH_CARD_META.map(c => c.id));
    const ordered = this._cardOrder.filter(id => allIds.has(id));
    for (const c of DASH_CARD_META) {
      if (!ordered.includes(c.id)) ordered.push(c.id);
    }

    // Split into active (in display order) and disabled (alphabetical)
    const activeIds = ordered.filter((id) => enabledSet.has(id));
    const disabledIds = ordered
      .filter((id) => !enabledSet.has(id))
      .sort((a, b) => {
        const labelA = t((DASH_CARD_META.find((c) => c.id === a)?.nameKey ?? 'config.dashboard_title') as Parameters<typeof t>[0]);
        const labelB = t((DASH_CARD_META.find((c) => c.id === b)?.nameKey ?? 'config.dashboard_title') as Parameters<typeof t>[0]);
        return labelA.localeCompare(labelB);
      });

    return html`
      <div class="cfg-info">
        <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
        <span>${t('config.dashboard_info')}</span>
      </div>

      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">1</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.dashboard_title')}</span>
            <span class="section-desc">${t('config.dashboard_desc')}</span>
          </div>
          <span class="cfg-section-count" aria-label="${t('common.count_visible', { count: activeIds.length, total: ordered.length })}">
            ${activeIds.length}/${ordered.length}
          </span>
        </header>

        ${activeIds.length === 0 ? html`
          <div class="cfg-empty">
            <ha-icon .icon=${'mdi:view-dashboard-outline'}></ha-icon>
            <span>${t('config.dashboard_desc')}</span>
          </div>
        ` : html`
          <ol class="dash-active-list" role="list" aria-label="${t('config.dashboard_title')}">
            ${activeIds.map((cardId, listIdx) => {
              const meta = DASH_CARD_META.find((c) => c.id === cardId);
              if (!meta) return nothing;
              const idx = ordered.indexOf(cardId);
              const isDragging = this._dragIdx === idx;
              const isDropTarget = this._dropIdx === idx && this._dragIdx !== null && this._dragIdx !== idx;
              return html`
                <li
                  class="dash-row ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}"
                  draggable="true"
                  @dragstart=${() => this._onDragStart(idx)}
                  @dragover=${(e: DragEvent) => this._onDragOver(idx, e)}
                  @dragleave=${() => this._onDragLeave()}
                  @drop=${(e: DragEvent) => this._onDrop(idx, e)}
                  @dragend=${() => this._onDragEnd()}
                >
                  <span class="dash-row-grip" aria-hidden="true">
                    <ha-icon .icon=${'mdi:drag-vertical'}></ha-icon>
                  </span>
                  <span class="dash-row-pos" aria-hidden="true">${listIdx + 1}</span>
                  <button
                    class="dash-row-main"
                    type="button"
                    @click=${() => this._navigateToCard(cardId)}
                    aria-label="${t('config.dashboard_title')} ${t(meta.nameKey)}"
                  >
                    <span class="dash-row-icon" style="--icon-color:${meta.color};">
                      <ha-icon .icon=${meta.icon}></ha-icon>
                    </span>
                    <span class="dash-row-name">${t(meta.nameKey)}</span>
                    <ha-icon class="dash-row-chev" .icon=${'mdi:chevron-right'}></ha-icon>
                  </button>
                  <button
                    class="dash-row-hide"
                    type="button"
                    @click=${() => this._toggleCard(cardId)}
                    aria-label="${t('common.hide')} ${t(meta.nameKey)}"
                  >
                    <ha-icon .icon=${'mdi:close'}></ha-icon>
                  </button>
                </li>
              `;
            })}
          </ol>
        `}

        ${disabledIds.length === 0 ? nothing : html`
          <div class="dash-divider"></div>
          <div class="cfg-sublabel dash-section-disabled">${t('common.disabled')} <span class="dash-section-count">${disabledIds.length}</span></div>
          <div class="dash-chip-grid">
            ${disabledIds.map((cardId) => {
              const meta = DASH_CARD_META.find((c) => c.id === cardId);
              if (!meta) return nothing;
              return html`
                <button
                  class="dash-chip"
                  type="button"
                  @click=${() => { this._toggleCard(cardId); this._navigateToCard(cardId); }}
                  aria-label="${t('common.show')} ${t(meta.nameKey)}"
                >
                  <span class="dash-chip-icon" style="--icon-color:${meta.color};">
                    <ha-icon .icon=${meta.icon}></ha-icon>
                  </span>
                  <span class="dash-chip-name">${t(meta.nameKey)}</span>
                  <ha-icon class="dash-chip-plus" .icon=${'mdi:plus'}></ha-icon>
                </button>
              `;
            })}
          </div>
        `}
      </section>

      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">2</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.dashboard_display')}</span>
            <span class="section-desc">${t('config.dashboard_display_desc')}</span>
          </div>
        </header>
        <div class="feature-list">
          <button class="feature-row" role="switch" aria-checked=${this._hideHeader ? 'true' : 'false'}
            @click=${() => this._toggleHideHeader()}>
            <div class="feature-icon"><ha-icon .icon=${'mdi:page-layout-header'}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${t('config.dashboard_hide_header')}</div>
              <div class="feature-desc">${t('config.dashboard_hide_header_desc')}</div>
            </div>
            <span class="toggle ${this._hideHeader ? 'on' : ''}"></span>
          </button>

          <button class="feature-row" role="switch" aria-checked=${this._hideSidebar ? 'true' : 'false'}
            @click=${() => this._toggleHideSidebar()}>
            <div class="feature-icon"><ha-icon .icon=${'mdi:page-layout-sidebar-left'}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${t('config.dashboard_hide_sidebar')}</div>
              <div class="feature-desc">${t('config.dashboard_hide_sidebar_desc')}</div>
            </div>
            <span class="toggle ${this._hideSidebar ? 'on' : ''}"></span>
          </button>

          <button class="feature-row" role="switch" aria-checked=${this._dynamicBackground ? 'true' : 'false'}
            @click=${() => this._toggleDynamicBg()}>
            <div class="feature-icon"><ha-icon .icon=${'mdi:weather-night'}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${t('config.dashboard_dynamic_bg')}</div>
              <div class="feature-desc">${t('config.dashboard_dynamic_bg_desc')}</div>
            </div>
            <span class="toggle ${this._dynamicBackground ? 'on' : ''}"></span>
          </button>
        </div>
      </section>
    `;
  }

  /** Extract the config slice for a specific card tab from the full config. */
  private _sliceFor(key: string): Record<string, unknown> {
    const configKey = CONFIG_KEYS[key];
    return ((this.configData as Record<string, unknown>)?.[configKey ?? ''] ?? {}) as Record<string, unknown>;
  }

  private _renderSubSection(id: string): TemplateResult {
    const slice = this._sliceFor(id);
    switch (id) {
      case 'title':
        return html`<config-tab-title .hass=${this.hass} .configData=${slice} .backend=${this.backend}></config-tab-title>`;
      case 'spotify':
        return html`<config-tab-spotify .hass=${this.hass} .configData=${slice} .backend=${this.backend}></config-tab-spotify>`;
      case 'presence':
        return html`<config-tab-presence .hass=${this.hass} .configData=${slice} .backend=${this.backend}></config-tab-presence>`;
      case 'camera':
        return html`<config-tab-camera .hass=${this.hass} .configData=${slice} .backend=${this.backend}></config-tab-camera>`;
      case 'weather':
        return html`<config-tab-weather .hass=${this.hass} .configData=${slice} .backend=${this.backend}></config-tab-weather>`;
      case 'light':
        return html`<config-tab-light .hass=${this.hass} .configData=${slice} .backend=${this.backend}></config-tab-light>`;
      case 'cover':
        return html`<config-tab-cover .hass=${this.hass} .configData=${slice} .backend=${this.backend}></config-tab-cover>`;
      case 'climate':
        return html`<config-tab-climate .hass=${this.hass} .configData=${slice} .backend=${this.backend}></config-tab-climate>`;
      case 'fan':
        return html`<config-tab-fan .hass=${this.hass} .configData=${slice} .backend=${this.backend}></config-tab-fan>`;
      case 'media':
        return html`<config-tab-media .hass=${this.hass} .configData=${slice} .backend=${this.backend}></config-tab-media>`;
      case 'calendar':
        return html`<config-tab-calendar .hass=${this.hass} .configData=${slice} .backend=${this.backend}></config-tab-calendar>`;
      default:
        return html`<div class="placeholder"><ha-icon .icon=${'mdi:hammer-wrench'}></ha-icon><span>${id}</span></div>`;
    }
  }
}

try { customElements.define('config-dashboard-view', ConfigDashboardView); } catch { /* already registered */ }
