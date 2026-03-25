import { LitElement, html, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import type { HomeAssistant, BackendService } from '@glass-cards/base-card';
import type { RoomEntry } from '../types';
import { createSaveScheduler } from '../utils/save-scheduler';

// Card metadata for the grid
interface DashCardMeta {
  id: string;
  icon: string;
  nameKey: Parameters<typeof t>[0];
  color: string;
}

const DASH_CARD_META: DashCardMeta[] = [
  { id: 'title', icon: 'mdi:format-title', nameKey: 'config.dashboard_card_title', color: 'var(--c-accent)' },
  { id: 'light', icon: 'mdi:lightbulb-group', nameKey: 'config.dashboard_card_light', color: 'var(--c-light-glow)' },
  { id: 'weather', icon: 'mdi:weather-partly-cloudy', nameKey: 'config.dashboard_card_weather', color: 'var(--c-info)' },
  { id: 'cover', icon: 'mdi:blinds', nameKey: 'config.dashboard_card_cover', color: 'var(--c-purple)' },
  { id: 'climate', icon: 'mdi:thermostat', nameKey: 'config.dashboard_card_climate', color: 'var(--c-purple)' },
  { id: 'fan', icon: 'mdi:fan', nameKey: 'config.dashboard_card_fan', color: 'var(--c-accent)' },
  { id: 'media', icon: 'mdi:speaker', nameKey: 'config.dashboard_card_media', color: 'var(--c-accent)' },
  { id: 'spotify', icon: 'mdi:spotify', nameKey: 'config.dashboard_card_spotify', color: 'var(--c-spotify)' },
  { id: 'presence', icon: 'mdi:account-group', nameKey: 'config.dashboard_card_presence', color: 'var(--c-accent)' },
  { id: 'camera_carousel', icon: 'mdi:cctv', nameKey: 'config.dashboard_card_camera_carousel', color: 'var(--c-alert)' },
];

// WS command map for saving sub-configs
const CARD_WS_MAP: Record<string, { cmd: string; configKey: string }> = {
  light: { cmd: 'set_light_config', configKey: 'light_card' },
  weather: { cmd: 'set_weather', configKey: 'weather' },
  cover: { cmd: 'set_cover_config', configKey: 'cover_card' },
  fan: { cmd: 'set_fan_config', configKey: 'fan_card' },
  spotify: { cmd: 'set_spotify_config', configKey: 'spotify_card' },
  media: { cmd: 'set_media_config', configKey: 'media_card' },
  presence: { cmd: 'set_presence_config', configKey: 'presence_card' },
  climate: { cmd: 'set_climate_config', configKey: 'climate_card' },
  camera_carousel: { cmd: 'set_camera_carousel_config', configKey: 'camera_carousel' },
};

// Map card IDs to sub-section IDs used by tabs
const SUB_MAP: Record<string, string> = {
  title: 'title', light: 'light', weather: 'weather',
  cover: 'cover', climate: 'climate', fan: 'fan', media: 'media',
  spotify: 'spotify', presence: 'presence', camera_carousel: 'camera',
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

  // Sub-config extras for pass-through save
  private _cardSubExtras: Record<string, Record<string, unknown>> = {};

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

    // Collect sub-config extras for save pass-through
    this._cardSubExtras = {};
    const c = config as Record<string, Record<string, unknown> | undefined>;
    for (const [key, meta] of Object.entries(CARD_WS_MAP)) {
      const slice = c[meta.configKey];
      if (slice) this._cardSubExtras[key] = { ...slice };
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

      // Pass-through save for sub-configs
      for (const [, meta] of Object.entries(CARD_WS_MAP)) {
        const extras = this._cardSubExtras[meta.configKey.replace('_card', '')] ?? this._cardSubExtras[meta.configKey];
        if (extras) await this.backend.send(meta.cmd, extras);
      }

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

    let enabledIdx = 0;

    return html`
      <div class="section-label">${t('config.dashboard_title')}</div>
      <div class="section-desc">${t('config.dashboard_desc')}</div>

      <div class="room-grid pw-db-grid-mt">
        ${ordered.map((cardId, idx) => {
          const meta = DASH_CARD_META.find(c => c.id === cardId);
          if (!meta) return nothing;
          const enabled = enabledSet.has(cardId);
          if (enabled) enabledIdx++;
          const currentOrder = enabled ? enabledIdx : 0;
          const isDragging = this._dragIdx === idx;
          const isDropTarget = this._dropIdx === idx && this._dragIdx !== null && this._dragIdx !== idx;

          return html`
            <div
              class="room-card dash-card ${enabled ? '' : 'off'} ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}"
              draggable="true"
              @dragstart=${() => this._onDragStart(idx)}
              @dragover=${(e: DragEvent) => this._onDragOver(idx, e)}
              @dragleave=${() => this._onDragLeave()}
              @drop=${(e: DragEvent) => this._onDrop(idx, e)}
              @dragend=${() => this._onDragEnd()}
              @click=${() => this._navigateToCard(cardId)}
            >
              ${enabled ? html`<span class="dash-order">${currentOrder}</span>` : nothing}
              <button
                class="dash-toggle ${enabled ? 'on' : ''}"
                @click=${(e: Event) => { e.stopPropagation(); this._toggleCard(cardId); }}
                aria-label="${t('common.show')} ${t(meta.nameKey)}"
              ></button>
              <div class="room-card-icon" style="--icon-color:${meta.color};">
                <ha-icon .icon=${meta.icon}></ha-icon>
              </div>
              <span class="room-name">${t(meta.nameKey)}</span>
              <span class="dash-drag-hint"><ha-icon .icon=${'mdi:drag'}></ha-icon></span>
            </div>
          `;
        })}
      </div>

      <div class="fold-sep visible pw-db-sep"></div>

      <div class="section-label">${t('config.dashboard_display')}</div>
      <div class="section-desc">${t('config.dashboard_display_desc')}</div>

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
    `;
  }

  private _renderSubSection(id: string): TemplateResult {
    switch (id) {
      case 'title':
        return html`<config-tab-title .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-title>`;
      case 'spotify':
        return html`<config-tab-spotify .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-spotify>`;
      case 'presence':
        return html`<config-tab-presence .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-presence>`;
      case 'camera':
        return html`<config-tab-camera .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-camera>`;
      case 'weather':
        return html`<config-tab-weather .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-weather>`;
      case 'light':
        return html`<config-tab-light .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-light>`;
      case 'cover':
        return html`<config-tab-cover .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-cover>`;
      case 'climate':
        return html`<config-tab-climate .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-climate>`;
      case 'fan':
        return html`<config-tab-fan .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-fan>`;
      case 'media':
        return html`<config-tab-media .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-media>`;
      default:
        return html`<div class="placeholder"><ha-icon .icon=${'mdi:hammer-wrench'}></ha-icon><span>${id}</span></div>`;
    }
  }
}

try { customElements.define('config-dashboard-view', ConfigDashboardView); } catch { /* already registered */ }
