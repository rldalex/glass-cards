import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { BaseConfigTab } from '../base-tab';

// — WS command map: card key → { ws command, show_header field path } —

interface CardSubConfig {
  wsCommand: string;
  showHeader: boolean;
  extras?: Record<string, unknown>;
}

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

// — Component —

export class ConfigTabDashboard extends BaseConfigTab {
  // Dashboard-specific state
  @state() _dashboardEnabledCards: string[] = ['weather'];
  @state() _dashboardCardOrder: string[] = ['title', 'weather', 'climate', 'light', 'media', 'fan', 'cover', 'camera_carousel', 'spotify', 'presence'];
  @state() _dashboardHideHeader = false;
  @state() _dashboardHideSidebar = false;
  @state() _dashboardExpanded = new Set<string>();

  // Sub-config states for show_header toggles and card-specific settings
  private _cardSubConfigs: Record<string, CardSubConfig> = {};

  // Cover-specific dashboard settings
  @state() _coverDashboardCompact = true;
  @state() _coverDashboardEntities: string[] = [];
  @state() _coverDashboardOrder: string[] = [];

  // Climate-specific dashboard settings
  @state() _climateDashboardDisplayMode: 'list' | 'normal' = 'list';

  // Local drag state
  @state() _dragIdx: number | null = null;
  @state() _dropIdx: number | null = null;
  @state() _dragContext = '';

  // Title config (for preview)
  private _titleConfig: Record<string, unknown> = {};

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_dashboardEnabledCards', '_dashboardCardOrder', '_dashboardHideHeader', '_dashboardHideSidebar',
  ]);

  // — Lifecycle —

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    // config contains dashboard slice + all card configs for sub-section toggles
    const dashboard = (config as { dashboard?: { enabled_cards?: string[]; card_order?: string[]; hide_header?: boolean; hide_sidebar?: boolean } }).dashboard;
    if (dashboard) {
      this._dashboardEnabledCards = dashboard.enabled_cards ?? ['weather'];
      this._dashboardCardOrder = dashboard.card_order ?? ['title', 'weather', 'climate', 'light', 'media', 'fan', 'cover', 'camera_carousel', 'spotify', 'presence'];
      this._dashboardHideHeader = dashboard.hide_header ?? false;
      this._dashboardHideSidebar = dashboard.hide_sidebar ?? false;
    }

    // Load show_header from each card's config slice
    const c = config as Record<string, Record<string, unknown> | undefined>;

    // Title config for preview
    this._titleConfig = c.title_card ?? {};

    // Build sub-configs from all card slices
    this._cardSubConfigs = {};
    for (const [key, meta] of Object.entries(CARD_WS_MAP)) {
      const slice = c[meta.configKey];
      this._cardSubConfigs[key] = {
        wsCommand: meta.cmd,
        showHeader: (slice as { show_header?: boolean })?.show_header ?? true,
        extras: slice ? { ...slice } : {},
      };
    }

    // Cover-specific
    const coverSlice = c.cover_card as { dashboard_compact?: boolean; dashboard_entities?: string[]; dashboard_order?: string[] } | undefined;
    this._coverDashboardCompact = coverSlice?.dashboard_compact ?? true;
    this._coverDashboardEntities = coverSlice?.dashboard_entities ?? [];
    this._initCoverDashboardOrder();

    // Climate-specific
    const climateSlice = c.climate_card as { dashboard_display_mode?: string } | undefined;
    this._climateDashboardDisplayMode = climateSlice?.dashboard_display_mode === 'normal' ? 'normal' : 'list';
  }

  collectSaveData(): Record<string, unknown> {
    return {
      enabled_cards: this._dashboardEnabledCards,
      card_order: this._dashboardCardOrder,
      hide_header: this._dashboardHideHeader,
      hide_sidebar: this._dashboardHideSidebar,
    };
  }

  async save(): Promise<void> {
    if (!this.backend) return;
    try {
      // Save dashboard config
      await this.backend.send('set_dashboard', this.collectSaveData());

      // Save all card sub-configs (show_header toggles + extras)
      for (const [key, sub] of Object.entries(this._cardSubConfigs)) {
        const payload: Record<string, unknown> = { show_header: sub.showHeader };

        // Merge card-specific extras
        if (sub.extras) {
          Object.assign(payload, sub.extras);
        }

        // Override with dashboard-specific state for cover
        if (key === 'cover') {
          const orderedDashCovers = this._coverDashboardOrder.filter((id) =>
            this._coverDashboardEntities.includes(id),
          );
          payload.dashboard_compact = this._coverDashboardCompact;
          payload.dashboard_entities = orderedDashCovers;
        }

        // Override with dashboard-specific state for climate
        if (key === 'climate') {
          payload.dashboard_display_mode = this._climateDashboardDisplayMode;
        }

        await this.backend.send(sub.wsCommand, payload);
      }

      this._fireToast(true);
      bus.emit('dashboard-config-changed', undefined);
      bus.emit('light-config-changed', undefined);
      bus.emit('weather-config-changed', undefined);
      bus.emit('cover-config-changed', undefined);
      bus.emit('fan-config-changed', undefined);
      bus.emit('spotify-config-changed', undefined);
      bus.emit('media-config-changed', undefined);
      bus.emit('presence-config-changed', undefined);
      bus.emit('climate-config-changed', undefined);
      bus.emit('camera-carousel-config-changed', undefined);
    } catch {
      this._fireToast(false);
    }
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<Record<string, unknown>>('get_config');
      if (result) this.loadFromConfig(result);
    } catch { /* ignore */ }
  }

  // — Cover helpers —

  private _getAllCoverEntities(): { entityId: string; name: string }[] {
    if (!this.hass) return [];
    const covers: { entityId: string; name: string }[] = [];
    for (const [id, entity] of Object.entries(this.hass.states)) {
      if (!id.startsWith('cover.')) continue;
      covers.push({ entityId: id, name: (entity.attributes?.friendly_name as string) || id.split('.')[1] || id });
    }
    return covers.sort((a, b) => a.name.localeCompare(b.name));
  }

  private _initCoverDashboardOrder(): void {
    const all = new Set(this._getAllCoverEntities().map((c) => c.entityId));
    this._coverDashboardOrder = [
      ...this._coverDashboardEntities.filter((id) => all.has(id)),
      ...[...all].filter((id) => !this._coverDashboardEntities.includes(id)),
    ];
  }

  private _toggleCoverDashboardEntity(entityId: string): void {
    const set = new Set(this._coverDashboardEntities);
    if (set.has(entityId)) {
      set.delete(entityId);
      this._coverDashboardOrder = this._coverDashboardOrder.filter((id) => id !== entityId);
    } else {
      set.add(entityId);
      if (!this._coverDashboardOrder.includes(entityId)) {
        this._coverDashboardOrder = [...this._coverDashboardOrder, entityId];
      }
    }
    this._coverDashboardEntities = [...set];
    this._fireDirty();
  }

  // — Dashboard actions —

  private _toggleDashboardCard(card: string): void {
    const set = new Set(this._dashboardEnabledCards);
    if (set.has(card)) set.delete(card);
    else set.add(card);
    this._dashboardEnabledCards = [...set];
  }

  private _toggleDashboardExpand(card: string): void {
    const next = new Set(this._dashboardExpanded);
    if (next.has(card)) next.delete(card);
    else next.add(card);
    this._dashboardExpanded = next;
  }

  private _setShowHeader(key: string, val: boolean): void {
    const sub = this._cardSubConfigs[key];
    if (!sub) return;
    this._cardSubConfigs = {
      ...this._cardSubConfigs,
      [key]: { ...sub, showHeader: val },
    };
    this.requestUpdate();
    this._fireDirty();
  }

  private _getShowHeader(key: string): boolean {
    return this._cardSubConfigs[key]?.showHeader ?? true;
  }

  // — Drag & drop —

  private _onLocalDragStart(idx: number, context: string): void {
    this._dragIdx = idx;
    this._dragContext = context;
  }

  private _onLocalDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    this._dropIdx = idx;
  }

  private _onLocalDragLeave(): void {
    this._dropIdx = null;
  }

  private _onLocalDragEnd(): void {
    this._dragIdx = null;
    this._dropIdx = null;
    this._dragContext = '';
  }

  private _onDropDashboardCard(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx || this._dragContext !== 'dashboard_cards') {
      this._dragIdx = null;
      this._dropIdx = null;
      return;
    }
    const arr = [...this._dashboardCardOrder];
    const [moved] = arr.splice(this._dragIdx, 1);
    arr.splice(idx, 0, moved);
    this._dashboardCardOrder = arr;
    this._dragIdx = null;
    this._dropIdx = null;
  }

  private _onDropDashboardCover(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx || this._dragContext !== 'dashboard_covers') {
      this._dragIdx = null;
      this._dropIdx = null;
      return;
    }
    const arr = [...this._coverDashboardOrder];
    const [moved] = arr.splice(this._dragIdx, 1);
    arr.splice(idx, 0, moved);
    this._coverDashboardOrder = arr;
    this._dragIdx = null;
    this._dropIdx = null;
    this._fireDirty();
  }

  // — Render —

  renderPreview(): TemplateResult | typeof nothing {
    const enabled = new Set(this._dashboardEnabledCards);
    const CARD_META: Record<string, { icon: string; label: string; titleStyle?: string }> = {
      title: { icon: 'mdi:format-title', label: (this._titleConfig as { title?: string }).title || t('config.title_title_placeholder'), titleStyle: 'font-size:11px;font-weight:700;color:var(--t1);' },
      weather: { icon: 'mdi:weather-partly-cloudy', label: t('weather.title') },
      climate: { icon: 'mdi:thermostat', label: t('climate.title') },
      light: { icon: 'mdi:lightbulb-group', label: t('light.title') },
      media: { icon: 'mdi:speaker', label: t('media.title') },
      fan: { icon: 'mdi:fan', label: t('fan.title') },
      cover: { icon: 'mdi:blinds', label: t('cover.title') },
      spotify: { icon: 'mdi:spotify', label: t('spotify.title') },
      presence: { icon: 'mdi:account-group', label: t('presence.title') },
    };
    const ordered = this._dashboardCardOrder.filter((k) => enabled.has(k));

    return html`
      <div class="preview-dashboard">
        <div class="preview-dashboard-cards">
          ${ordered.length === 0 ? html`<div class="preview-dashboard-empty">—</div>` : nothing}
          ${ordered.map((key) => {
            const meta = CARD_META[key];
            if (!meta) return nothing;
            return html`
              <div class="preview-dashboard-card ${key}">
                ${meta.titleStyle
                  ? html`<span style=${meta.titleStyle}>${meta.label}</span>`
                  : html`<ha-icon .icon=${meta.icon}></ha-icon><span>${meta.label}</span>`}
              </div>
            `;
          })}
        </div>
        <div class="preview-dashboard-navbar">
          <ha-icon .icon=${'mdi:sofa'}></ha-icon>
          <ha-icon .icon=${'mdi:stove'}></ha-icon>
          <ha-icon .icon=${'mdi:bed'}></ha-icon>
        </div>
      </div>
    `;
  }

  private _renderCardSub(key: string, enabled: boolean, expanded: boolean): TemplateResult | typeof nothing {
    const open = enabled && expanded;

    if (key === 'light' || key === 'weather' || key === 'fan' || key === 'spotify' || key === 'media' || key === 'presence') {
      const showHeader = this._getShowHeader(key);
      const nameKeyMap: Record<string, Parameters<typeof t>[0]> = {
        light: 'config.light_show_header',
        weather: 'config.weather_show_header',
        fan: 'config.fan_show_header',
        spotify: 'config.spotify_show_header',
        media: 'config.media_show_header',
        presence: 'config.presence_show_header',
      };
      const descKeyMap: Record<string, Parameters<typeof t>[0]> = {
        light: 'config.light_show_header_desc',
        weather: 'config.weather_show_header_desc',
        fan: 'config.fan_show_header_desc',
        spotify: 'config.spotify_show_header_desc',
        media: 'config.media_show_header_desc',
        presence: 'config.presence_show_header_desc',
      };
      return html`
        <div class="feature-sub ${open ? 'open' : ''}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${(e: Event) => { e.stopPropagation(); this._setShowHeader(key, !showHeader); }}
                role="switch"
                aria-checked=${showHeader ? 'true' : 'false'}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${t(nameKeyMap[key])}</div>
                  <div class="feature-desc">${t(descKeyMap[key])}</div>
                </div>
                <span
                  class="toggle ${showHeader ? 'on' : ''}"
                ></span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    if (key === 'cover') {
      const showHeader = this._getShowHeader('cover');
      return html`
        <div class="feature-sub ${open ? 'open' : ''}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${(e: Event) => { e.stopPropagation(); this._setShowHeader('cover', !showHeader); }}
                role="switch"
                aria-checked=${showHeader ? 'true' : 'false'}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${t('config.cover_show_header')}</div>
                  <div class="feature-desc">${t('config.cover_show_header_desc')}</div>
                </div>
                <span
                  class="toggle ${showHeader ? 'on' : ''}"
                ></span>
              </button>
              <button
                class="feature-row"
                @click=${(e: Event) => { e.stopPropagation(); this._coverDashboardCompact = !this._coverDashboardCompact; this._fireDirty(); }}
                role="switch"
                aria-checked=${this._coverDashboardCompact ? 'true' : 'false'}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${'mdi:view-grid-outline'}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${t('config.cover_dashboard_compact')}</div>
                  <div class="feature-desc">${t('config.cover_dashboard_compact_desc')}</div>
                </div>
                <span
                  class="toggle ${this._coverDashboardCompact ? 'on' : ''}"
                ></span>
              </button>
              <div class="section-label" style="margin-top:10px;">${t('config.cover_dashboard_entities')}</div>
              <div class="section-desc">${t('config.cover_dashboard_entities_desc')}</div>
              <div class="item-list">
                ${this._coverDashboardOrder.map((entityId, idx) => {
                  const allCovers = this._getAllCoverEntities();
                  const cv = allCovers.find((c) => c.entityId === entityId);
                  if (!cv) return nothing;
                  const sel = this._coverDashboardEntities.includes(cv.entityId);
                  const isDragging = this._dragIdx === idx && this._dragContext === 'dashboard_covers';
                  const isDropTarget = this._dropIdx === idx && this._dragContext === 'dashboard_covers';
                  const rowClasses = [
                    'item-row',
                    !sel ? 'disabled' : '',
                    isDragging ? 'dragging' : '',
                    isDropTarget ? 'drop-target' : '',
                  ].filter(Boolean).join(' ');
                  return html`
                    <div
                      class=${rowClasses}
                      draggable="true"
                      @dragstart=${(ev: DragEvent) => { ev.stopPropagation(); this._onLocalDragStart(idx, 'dashboard_covers'); }}
                      @dragover=${(ev: DragEvent) => { ev.stopPropagation(); this._onLocalDragOver(idx, ev); }}
                      @dragleave=${() => this._onLocalDragLeave()}
                      @drop=${(ev: DragEvent) => { ev.stopPropagation(); this._onDropDashboardCover(idx, ev); }}
                      @dragend=${() => this._onLocalDragEnd()}
                    >
                      <span class="drag-handle">
                        <ha-icon .icon=${'mdi:drag'}></ha-icon>
                      </span>
                      <div class="item-info">
                        <span class="item-name">${cv.name}</span>
                        <span class="item-meta">${cv.entityId}</span>
                      </div>
                      <button
                        class="toggle ${sel ? 'on' : ''}"
                        @click=${(e: Event) => { e.stopPropagation(); this._toggleCoverDashboardEntity(cv.entityId); }}
                        role="switch"
                        aria-checked=${sel ? 'true' : 'false'}
                        aria-label="${sel ? t('common.hide') : t('common.show')} ${cv.name}"
                      ></button>
                    </div>
                  `;
                })}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (key === 'climate') {
      const showHeader = this._getShowHeader('climate');
      return html`
        <div class="feature-sub ${open ? 'open' : ''}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${(e: Event) => { e.stopPropagation(); this._setShowHeader('climate', !showHeader); }}
                role="switch"
                aria-checked=${showHeader ? 'true' : 'false'}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${t('config.climate_show_header')}</div>
                  <div class="feature-desc">${t('config.climate_show_header_desc')}</div>
                </div>
                <span
                  class="toggle ${showHeader ? 'on' : ''}"
                ></span>
              </button>
              <div class="section-label" style="margin-top:10px;">${t('config.climate_display_mode')}</div>
              <div style="display:flex;gap:6px;margin-top:6px;padding:0 4px;">
                <button class="chip ${this._climateDashboardDisplayMode === 'list' ? 'active' : ''}"
                  @click=${(e: Event) => { e.stopPropagation(); this._climateDashboardDisplayMode = 'list'; this._fireDirty(); }}>
                  <ha-icon .icon=${'mdi:format-list-bulleted'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                  ${t('config.climate_mode_list')}
                </button>
                <button class="chip ${this._climateDashboardDisplayMode === 'normal' ? 'active' : ''}"
                  @click=${(e: Event) => { e.stopPropagation(); this._climateDashboardDisplayMode = 'normal'; this._fireDirty(); }}>
                  <ha-icon .icon=${'mdi:gauge'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                  ${t('config.climate_mode_normal')}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return nothing;
  }

  renderTab(): TemplateResult {
    void this._lang;
    const CARD_META: Record<string, { icon: string; nameKey: Parameters<typeof t>[0]; descKey: Parameters<typeof t>[0]; hasSub: boolean }> = {
      title: { icon: 'mdi:format-title', nameKey: 'config.dashboard_card_title', descKey: 'config.dashboard_card_title_desc', hasSub: false },
      weather: { icon: 'mdi:weather-partly-cloudy', nameKey: 'config.dashboard_card_weather', descKey: 'config.dashboard_card_weather_desc', hasSub: true },
      climate: { icon: 'mdi:thermostat', nameKey: 'config.dashboard_card_climate', descKey: 'config.dashboard_card_climate_desc', hasSub: true },
      light: { icon: 'mdi:lightbulb-group', nameKey: 'config.dashboard_card_light', descKey: 'config.dashboard_card_light_desc', hasSub: true },
      cover: { icon: 'mdi:blinds', nameKey: 'config.dashboard_card_cover', descKey: 'config.dashboard_card_cover_desc', hasSub: true },
      spotify: { icon: 'mdi:spotify', nameKey: 'config.dashboard_card_spotify', descKey: 'config.dashboard_card_spotify_desc', hasSub: true },
      media: { icon: 'mdi:speaker', nameKey: 'config.dashboard_card_media', descKey: 'config.dashboard_card_media_desc', hasSub: true },
      fan: { icon: 'mdi:fan', nameKey: 'config.dashboard_card_fan', descKey: 'config.dashboard_card_fan_desc', hasSub: true },
      presence: { icon: 'mdi:account-group', nameKey: 'config.dashboard_card_presence', descKey: 'config.dashboard_card_presence_desc', hasSub: true },
      camera_carousel: { icon: 'mdi:cctv', nameKey: 'config.dashboard_card_camera_carousel', descKey: 'config.dashboard_card_camera_carousel_desc', hasSub: false },
    };

    const enabledSet = new Set(this._dashboardEnabledCards);

    return html`
      <div class="preview-encart">
        <div class="preview-label">${t('config.preview')}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-dashboard">
        <div class="section-label">${t('config.dashboard_display')}</div>
        <div class="section-desc">${t('config.dashboard_display_desc')}</div>

        <div class="check-item mt-12">
          <button
            class="toggle ${this._dashboardHideHeader ? 'on' : ''}"
            @click=${() => { this._dashboardHideHeader = !this._dashboardHideHeader; this._fireDirty(); }}
            role="switch"
            aria-checked=${this._dashboardHideHeader ? 'true' : 'false'}
            aria-label=${t('config.dashboard_hide_header')}
          ></button>
          <div class="check-label">
            <span>${t('config.dashboard_hide_header')}</span>
            <span class="check-desc">${t('config.dashboard_hide_header_desc')}</span>
          </div>
        </div>
        <div class="check-item mb-8">
          <button
            class="toggle ${this._dashboardHideSidebar ? 'on' : ''}"
            @click=${() => { this._dashboardHideSidebar = !this._dashboardHideSidebar; this._fireDirty(); }}
            role="switch"
            aria-checked=${this._dashboardHideSidebar ? 'true' : 'false'}
            aria-label=${t('config.dashboard_hide_sidebar')}
          ></button>
          <div class="check-label">
            <span>${t('config.dashboard_hide_sidebar')}</span>
            <span class="check-desc">${t('config.dashboard_hide_sidebar_desc')}</span>
          </div>
        </div>

        <div class="fold-sep" style="margin:16px 0;"></div>

        <div class="section-label">${t('config.dashboard_title')}</div>
        <div class="section-desc">${t('config.dashboard_desc')}</div>
        <div class="item-list">
          ${this._dashboardCardOrder.map((key, idx) => {
            const meta = CARD_META[key];
            if (!meta) return nothing;
            const enabled = enabledSet.has(key);
            const isDragging = this._dragIdx === idx && this._dragContext === 'dashboard_cards';
            const isDropTarget = this._dropIdx === idx && this._dragContext === 'dashboard_cards';
            const expanded = this._dashboardExpanded.has(key);
            const rowClasses = [
              'item-row',
              !enabled ? 'disabled' : '',
              isDragging ? 'dragging' : '',
              isDropTarget ? 'drop-target' : '',
            ].filter(Boolean).join(' ');

            const cardClasses = [
              'item-card',
              expanded ? 'expanded' : '',
            ].filter(Boolean).join(' ');

            return html`
              <div
                class=${meta.hasSub ? cardClasses : ''}
                draggable="true"
                @dragstart=${() => this._onLocalDragStart(idx, 'dashboard_cards')}
                @dragover=${(ev: DragEvent) => this._onLocalDragOver(idx, ev)}
                @dragleave=${() => this._onLocalDragLeave()}
                @drop=${(ev: DragEvent) => this._onDropDashboardCard(idx, ev)}
                @dragend=${() => this._onLocalDragEnd()}
              >
                <div class=${rowClasses}>
                  <span class="drag-handle">
                    <ha-icon .icon=${'mdi:drag'}></ha-icon>
                  </span>
                  <div class="feature-icon">
                    <ha-icon .icon=${meta.icon}></ha-icon>
                  </div>
                  <div class="item-info">
                    <span class="item-name">${t(meta.nameKey)}</span>
                    <span class="item-meta">${t(meta.descKey)}</span>
                  </div>
                  ${meta.hasSub && enabled ? html`
                    <button
                      class="btn-icon xs"
                      aria-label=${expanded ? t('common.hide') : t('common.show')}
                      aria-expanded=${expanded ? 'true' : 'false'}
                      @click=${(e: Event) => { e.stopPropagation(); this._toggleDashboardExpand(key); }}
                    >
                      <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
                    </button>
                  ` : nothing}
                  <button
                    class="toggle ${enabled ? 'on' : ''}"
                    @click=${(e: Event) => { e.stopPropagation(); this._toggleDashboardCard(key); }}
                    role="switch"
                    aria-checked=${enabled ? 'true' : 'false'}
                    aria-label="${enabled ? t('common.hide') : t('common.show')} ${t(meta.nameKey)}"
                  ></button>
                </div>
                ${meta.hasSub ? html`
                  <div class="fold-sep ${expanded && enabled ? 'visible' : ''}"></div>
                ` : nothing}
                ${this._renderCardSub(key, enabled, expanded)}
              </div>
            `;
          })}
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-dashboard', ConfigTabDashboard); } catch { /* already registered */ }
