import { html, nothing, type TemplateResult } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';

export function renderDashboardPreview(self: GlassConfigPanel) {
  const enabled = new Set(self._dashboardEnabledCards);
  const CARD_META: Record<string, { icon: string; label: string; titleStyle?: string }> = {
    title: { icon: 'mdi:format-title', label: self._titleText || t('config.title_title_placeholder'), titleStyle: 'font-size:11px;font-weight:700;color:var(--t1);' },
    weather: { icon: 'mdi:weather-partly-cloudy', label: t('weather.title') },
    climate: { icon: 'mdi:thermostat', label: t('climate.title') },
    light: { icon: 'mdi:lightbulb-group', label: t('light.title') },
    media: { icon: 'mdi:speaker', label: t('media.title') },
    fan: { icon: 'mdi:fan', label: t('fan.title') },
    cover: { icon: 'mdi:blinds', label: t('cover.title') },
    spotify: { icon: 'mdi:spotify', label: t('spotify.title') },
    presence: { icon: 'mdi:account-group', label: t('presence.title') },
  };
  const ordered = self._dashboardCardOrder.filter((k) => enabled.has(k));

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

export function renderDashboardTab(self: GlassConfigPanel) {
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

  const enabledSet = new Set(self._dashboardEnabledCards);

  return html`
    <div class="tab-panel" id="panel-dashboard">
      <div class="section-label">${t('config.dashboard_display')}</div>
      <div class="section-desc">${t('config.dashboard_display_desc')}</div>

      <div class="check-item mt-12">
        <button
          class="toggle ${self._dashboardHideHeader ? 'on' : ''}"
          @click=${() => { if (self._saving) return; self._beginSuppressAutoSave(); self._dashboardHideHeader = !self._dashboardHideHeader; self._saveDashboard(); }}
          role="switch"
          aria-checked=${self._dashboardHideHeader ? 'true' : 'false'}
          aria-label=${t('config.dashboard_hide_header')}
        ></button>
        <div class="check-label">
          <span>${t('config.dashboard_hide_header')}</span>
          <span class="check-desc">${t('config.dashboard_hide_header_desc')}</span>
        </div>
      </div>
      <div class="check-item mb-8">
        <button
          class="toggle ${self._dashboardHideSidebar ? 'on' : ''}"
          @click=${() => { if (self._saving) return; self._beginSuppressAutoSave(); self._dashboardHideSidebar = !self._dashboardHideSidebar; self._saveDashboard(); }}
          role="switch"
          aria-checked=${self._dashboardHideSidebar ? 'true' : 'false'}
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
        ${self._dashboardCardOrder.map((key, idx) => {
          const meta = CARD_META[key];
          if (!meta) return nothing;
          const enabled = enabledSet.has(key);
          const isDragging = self._dragIdx === idx && self._dragContext === 'dashboard_cards';
          const isDropTarget = self._dropIdx === idx && self._dragContext === 'dashboard_cards';
          const expanded = self._dashboardExpanded.has(key);
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
              @dragstart=${() => self._onDragStart(idx, 'dashboard_cards')}
              @dragover=${(ev: DragEvent) => self._onDragOver(idx, ev)}
              @dragleave=${() => self._onDragLeave()}
              @drop=${(ev: DragEvent) => self._onDropDashboardCard(idx, ev)}
              @dragend=${() => self._onDragEnd()}
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
                    @click=${(e: Event) => { e.stopPropagation(); self._toggleDashboardExpand(key); }}
                  >
                    <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
                  </button>
                ` : nothing}
                <button
                  class="toggle ${enabled ? 'on' : ''}"
                  @click=${(e: Event) => { e.stopPropagation(); self._toggleDashboardCard(key); }}
                  role="switch"
                  aria-checked=${enabled ? 'true' : 'false'}
                  aria-label="${enabled ? t('common.hide') : t('common.show')} ${t(meta.nameKey)}"
                ></button>
              </div>
              ${meta.hasSub ? html`
                <div class="fold-sep ${expanded && enabled ? 'visible' : ''}"></div>
              ` : nothing}
              ${self._renderDashboardCardSub(key, enabled, expanded)}
            </div>
          `;
        })}
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._loadDashboardConfig()}>${t('common.reset')}</button>
      </div>
    </div>
  `;
}

export function renderDashboardCardSub(self: GlassConfigPanel, key: string, enabled: boolean, expanded: boolean): TemplateResult | typeof nothing {
  const open = enabled && expanded;

  if (key === 'light') {
    return html`
      <div class="feature-sub ${open ? 'open' : ''}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${(e: Event) => { e.stopPropagation(); self._lightShowHeader = !self._lightShowHeader; }}
              role="switch"
              aria-checked=${self._lightShowHeader ? 'true' : 'false'}
            >
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t('config.light_show_header')}</div>
                <div class="feature-desc">${t('config.light_show_header_desc')}</div>
              </div>
              <span
                class="toggle ${self._lightShowHeader ? 'on' : ''}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (key === 'weather') {
    return html`
      <div class="feature-sub ${open ? 'open' : ''}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${(e: Event) => { e.stopPropagation(); self._weatherShowHeader = !self._weatherShowHeader; }}
              role="switch"
              aria-checked=${self._weatherShowHeader ? 'true' : 'false'}
            >
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t('config.weather_show_header')}</div>
                <div class="feature-desc">${t('config.weather_show_header_desc')}</div>
              </div>
              <span
                class="toggle ${self._weatherShowHeader ? 'on' : ''}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (key === 'cover') {
    return html`
      <div class="feature-sub ${open ? 'open' : ''}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${(e: Event) => { e.stopPropagation(); self._coverShowHeader = !self._coverShowHeader; }}
              role="switch"
              aria-checked=${self._coverShowHeader ? 'true' : 'false'}
            >
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t('config.cover_show_header')}</div>
                <div class="feature-desc">${t('config.cover_show_header_desc')}</div>
              </div>
              <span
                class="toggle ${self._coverShowHeader ? 'on' : ''}"
              ></span>
            </button>
            <button
              class="feature-row"
              @click=${(e: Event) => { e.stopPropagation(); self._coverDashboardCompact = !self._coverDashboardCompact; }}
              role="switch"
              aria-checked=${self._coverDashboardCompact ? 'true' : 'false'}
            >
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:view-grid-outline'}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t('config.cover_dashboard_compact')}</div>
                <div class="feature-desc">${t('config.cover_dashboard_compact_desc')}</div>
              </div>
              <span
                class="toggle ${self._coverDashboardCompact ? 'on' : ''}"
              ></span>
            </button>
            <div class="section-label" style="margin-top:10px;">${t('config.cover_dashboard_entities')}</div>
            <div class="section-desc">${t('config.cover_dashboard_entities_desc')}</div>
            <div class="item-list">
              ${self._coverDashboardOrder.map((entityId, idx) => {
                const allCovers = self._getAllCoverEntities();
                const cv = allCovers.find((c) => c.entityId === entityId);
                if (!cv) return nothing;
                const sel = self._coverDashboardEntities.includes(cv.entityId);
                const isDragging = self._dragIdx === idx && self._dragContext === 'dashboard_covers';
                const isDropTarget = self._dropIdx === idx && self._dragContext === 'dashboard_covers';
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
                    @dragstart=${(ev: DragEvent) => { ev.stopPropagation(); self._onDragStart(idx, 'dashboard_covers'); }}
                    @dragover=${(ev: DragEvent) => { ev.stopPropagation(); self._onDragOver(idx, ev); }}
                    @dragleave=${() => self._onDragLeave()}
                    @drop=${(ev: DragEvent) => { ev.stopPropagation(); self._onDropDashboardCover(idx, ev); }}
                    @dragend=${() => self._onDragEnd()}
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
                      @click=${(e: Event) => { e.stopPropagation(); self._toggleCoverDashboardEntity(cv.entityId); }}
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
    return html`
      <div class="feature-sub ${open ? 'open' : ''}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${(e: Event) => { e.stopPropagation(); self._climateShowHeader = !self._climateShowHeader; }}
              role="switch"
              aria-checked=${self._climateShowHeader ? 'true' : 'false'}
            >
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t('config.climate_show_header')}</div>
                <div class="feature-desc">${t('config.climate_show_header_desc')}</div>
              </div>
              <span
                class="toggle ${self._climateShowHeader ? 'on' : ''}"
              ></span>
            </button>
            <div class="section-label" style="margin-top:10px;">${t('config.climate_display_mode')}</div>
            <div style="display:flex;gap:6px;margin-top:6px;padding:0 4px;">
              <button class="chip ${self._climateDashboardDisplayMode === 'list' ? 'active' : ''}"
                @click=${(e: Event) => { e.stopPropagation(); self._climateDashboardDisplayMode = 'list'; }}>
                <ha-icon .icon=${'mdi:format-list-bulleted'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                ${t('config.climate_mode_list')}
              </button>
              <button class="chip ${self._climateDashboardDisplayMode === 'normal' ? 'active' : ''}"
                @click=${(e: Event) => { e.stopPropagation(); self._climateDashboardDisplayMode = 'normal'; }}>
                <ha-icon .icon=${'mdi:gauge'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                ${t('config.climate_mode_normal')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (key === 'spotify') {
    return html`
      <div class="feature-sub ${open ? 'open' : ''}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${(e: Event) => { e.stopPropagation(); self._spotifyShowHeader = !self._spotifyShowHeader; }}
              role="switch"
              aria-checked=${self._spotifyShowHeader ? 'true' : 'false'}
            >
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t('config.spotify_show_header')}</div>
                <div class="feature-desc">${t('config.spotify_show_header_desc')}</div>
              </div>
              <span
                class="toggle ${self._spotifyShowHeader ? 'on' : ''}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (key === 'media') {
    return html`
      <div class="feature-sub ${open ? 'open' : ''}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${(e: Event) => { e.stopPropagation(); self._mediaShowHeader = !self._mediaShowHeader; }}
              role="switch"
              aria-checked=${self._mediaShowHeader ? 'true' : 'false'}
            >
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t('config.media_show_header')}</div>
                <div class="feature-desc">${t('config.media_show_header_desc')}</div>
              </div>
              <span
                class="toggle ${self._mediaShowHeader ? 'on' : ''}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (key === 'fan') {
    return html`
      <div class="feature-sub ${open ? 'open' : ''}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${(e: Event) => { e.stopPropagation(); self._fanShowHeader = !self._fanShowHeader; }}
              role="switch"
              aria-checked=${self._fanShowHeader ? 'true' : 'false'}
            >
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t('config.fan_show_header')}</div>
                <div class="feature-desc">${t('config.fan_show_header_desc')}</div>
              </div>
              <span
                class="toggle ${self._fanShowHeader ? 'on' : ''}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (key === 'presence') {
    return html`
      <div class="feature-sub ${open ? 'open' : ''}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${(e: Event) => { e.stopPropagation(); self._presenceShowHeader = !self._presenceShowHeader; }}
              role="switch"
              aria-checked=${self._presenceShowHeader ? 'true' : 'false'}
            >
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t('config.presence_show_header')}</div>
                <div class="feature-desc">${t('config.presence_show_header_desc')}</div>
              </div>
              <span
                class="toggle ${self._presenceShowHeader ? 'on' : ''}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  return nothing;
}

export function toggleDashboardCard(self: GlassConfigPanel, card: string) {
  const set = new Set(self._dashboardEnabledCards);
  if (set.has(card)) set.delete(card);
  else set.add(card);
  self._dashboardEnabledCards = [...set];
}

export function toggleDashboardExpand(self: GlassConfigPanel, card: string) {
  const next = new Set(self._dashboardExpanded);
  if (next.has(card)) next.delete(card);
  else next.add(card);
  self._dashboardExpanded = next;
}

export function onDropDashboardCard(self: GlassConfigPanel, idx: number, e: DragEvent) {
  e.preventDefault();
  if (self._dragIdx === null || self._dragIdx === idx || self._dragContext !== 'dashboard_cards') {
    self._dragIdx = null;
    self._dropIdx = null;
    return;
  }
  const arr = [...self._dashboardCardOrder];
  const [moved] = arr.splice(self._dragIdx, 1);
  arr.splice(idx, 0, moved);
  self._dashboardCardOrder = arr;
  self._dragIdx = null;
  self._dropIdx = null;
}
