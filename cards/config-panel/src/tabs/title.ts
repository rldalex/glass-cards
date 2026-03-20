import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';
import { drawColorWheel, colorFromWheelEvent, hexToWheelPos } from '@glass-cards/ui-core';

// — Types —

type SourceType = 'input_select' | 'scenes' | 'booleans';
type TitleSource = { source_type: SourceType; entity: string; label: string; modes: { id: string; label: string; icon: string; color: string }[] };

const SOURCE_DEFS: { key: SourceType; label: string; icon: string }[] = [
  { key: 'input_select', label: 'Input Select', icon: 'mdi:form-select' },
  { key: 'scenes', label: 'Scènes', icon: 'mdi:palette' },
  { key: 'booleans', label: 'Toggles', icon: 'mdi:toggle-switch' },
];

const COLORS = ['neutral', 'success', 'warning', 'info', 'accent', 'alert'];

const DOT_MAP: Record<string, string> = {
  success: 'var(--c-success)', warning: 'var(--c-warning)',
  info: 'var(--c-info)', accent: 'var(--c-accent)',
  alert: 'var(--c-alert)', neutral: 'var(--t4)',
};
const resolveD = (c: string) => DOT_MAP[c] ?? (c.startsWith('#') ? c : 'var(--t4)');

// — Preview —

export function renderTitlePreview(self: GlassConfigPanel) {
  const title = self._titleText;
  if (!title) {
    return html`<div class="preview-empty">${t('config.title_title_placeholder')}</div>`;
  }

  // Collect all active colors across sources (including multiple per source)
  const activeColors: string[] = [];
  for (const src of self._titleSources) {
    if (src.source_type === 'input_select' && src.entity && self.hass) {
      const entity = self.hass.states[src.entity];
      if (entity) {
        const mode = src.modes.find((m) => m.id === entity.state);
        if (mode?.color && mode.color !== 'neutral') activeColors.push(mode.color);
      }
    } else if (src.source_type === 'booleans' && self.hass) {
      for (const mode of src.modes) {
        if (self.hass?.states[mode.id]?.state === 'on') {
          const c = mode.color || 'success';
          if (c !== 'neutral') activeColors.push(c);
        }
      }
    }
  }

  const hasSources = self._titleSources.length > 0 && self._titleSources.some((s) => s.modes.length > 0);
  const dashHasActive = activeColors.length > 0;

  let dashStyle = 'background:var(--t4);width:20px;';
  if (dashHasActive) {
    const dots = activeColors.map((c) => resolveD(c));
    const w = Math.min(20 + activeColors.length * 4, 36);
    if (dots.length === 1) {
      dashStyle = `background:${dots[0]};width:${w}px;box-shadow:0 0 6px ${dots[0]};`;
    } else {
      const n = dots.length;
      const stops = dots.flatMap((d, i) => [`${d} ${Math.round(i / n * 100)}%`, `${d} ${Math.round((i + 1) / n * 100)}%`]).join(', ');
      const glows = dots.map((d) => `0 0 6px ${d}`).join(', ');
      dashStyle = `background:linear-gradient(90deg, ${stops});width:${w}px;box-shadow:${glows};`;
    }
  }

  return html`
    <div class="preview-title-card">
      <div class="preview-title-text">${title}</div>
      ${hasSources ? html`
        <div class="preview-title-dash">
          <div class="preview-dash-line" style="${dashStyle}"></div>
        </div>
      ` : nothing}
    </div>
  `;
}

// — Tab —

export function renderTitleTab(self: GlassConfigPanel) {
  const sources = self._titleSources;

  return html`
    <div class="tab-panel" id="panel-title">
      <div class="section-label">${t('config.title_title')}</div>
      <div class="section-desc">${t('config.title_title_desc')}</div>
      <input
        class="input"
        type="text"
        .value=${self._titleText}
        placeholder=${t('config.title_title_placeholder')}
        @input=${(e: Event) => { self._titleText = (e.target as HTMLInputElement).value; }}
      />

      <div class="section-label" style="margin-top:12px;">${t('config.title_mode_source')}</div>
      <div class="section-desc">${t('config.title_mode_source_desc')}</div>

      <!-- Existing sources -->
      ${sources.map((src, srcIdx) => renderSourceEditor(self, src, srcIdx))}

      <!-- Add source button -->
      <div style="margin-top:8px;">
        <div class="dropdown ${self._titleAddSourceDropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => { self._titleAddSourceDropdownOpen = !self._titleAddSourceDropdownOpen; }}
            aria-expanded=${self._titleAddSourceDropdownOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${'mdi:plus'}></ha-icon>
            <span>${t('config.title_add_source')}</span>
            <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${SOURCE_DEFS.map((s) => html`
              <button
                class="dropdown-item"
                role="option"
                @click=${() => self._addTitleSource(s.key)}
              >
                <ha-icon .icon=${s.icon}></ha-icon>
                ${s.label}
              </button>
            `)}
          </div>
        </div>
      </div>

      <!-- Period indicator -->
      <div class="section-label" style="margin-top:16px;">${t('config.title_period_indicator')}</div>
      <div class="section-desc">${t('config.title_period_indicator_desc')}</div>

      ${renderPeriodEntitySelector(self)}
      ${self._titlePeriodEntity ? renderPeriodOptions(self) : nothing}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._loadTitleConfig()}>${t('common.reset')}</button>
      </div>
    </div>
  `;
}

// — Period indicator config —

function renderPeriodEntitySelector(self: GlassConfigPanel) {
  const allInputSelects = self.hass
    ? Object.keys(self.hass.states).filter((id) => id.startsWith('input_select.'))
    : [];
  const selectedEntity = self._titlePeriodEntity;
  const selectedName = selectedEntity
    ? (self.hass?.states[selectedEntity]?.attributes?.friendly_name as string || selectedEntity)
    : '';

  return html`
    <div style="display:flex;gap:6px;align-items:center;margin-top:8px;">
      <div class="dropdown ${self._titlePeriodDropdownOpen ? 'open' : ''}" style="flex:1;">
        <button class="dropdown-trigger"
          @click=${() => { self._titlePeriodDropdownOpen = !self._titlePeriodDropdownOpen; }}
          aria-expanded=${self._titlePeriodDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox">
          <span>${selectedEntity ? selectedName : t('config.title_period_select')}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox" style="max-height:200px;overflow-y:auto;">
          <button class="dropdown-item ${!selectedEntity ? 'active' : ''}"
            role="option" aria-selected=${!selectedEntity ? 'true' : 'false'}
            @click=${() => { self._titlePeriodEntity = ''; self._titlePeriodOptions = []; self._titlePeriodDropdownOpen = false; }}>
            <ha-icon .icon=${'mdi:close'} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            ${t('common.none')}
          </button>
          ${allInputSelects.map((id) => {
            const name = (self.hass?.states[id]?.attributes?.friendly_name as string) || id;
            return html`
              <button class="dropdown-item ${id === selectedEntity ? 'active' : ''}"
                role="option" aria-selected=${id === selectedEntity ? 'true' : 'false'}
                @click=${() => selectPeriodEntity(self, id)}>
                <ha-icon .icon=${'mdi:form-dropdown'} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                ${name}
              </button>
            `;
          })}
        </div>
      </div>
    </div>
  `;
}

function renderPeriodOptions(self: GlassConfigPanel) {
  const options = self._titlePeriodOptions;
  if (options.length === 0) {
    return self._titlePeriodEntity
      ? html`<div class="section-desc" style="margin-top:8px;">${t('config.title_no_modes')}</div>`
      : nothing;
  }

  return html`
    <div class="item-list" style="margin-top:8px;">
      ${options.map((opt, idx) => html`
        <div class="item-row">
          <div class="item-info" style="flex:1;min-width:0;">
            <span class="item-name">${opt.label || opt.id}</span>
            <span class="item-meta">${opt.id}</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <input class="input" type="text" style="width:120px;font-size:10px;padding:3px 6px;"
              placeholder="mdi:weather-sunny"
              .value=${opt.icon}
              @input=${(e: Event) => updatePeriodOption(self, idx, { icon: (e.target as HTMLInputElement).value })}
              aria-label="${t('config.title_period_icon')}"
            />
            <button class="btn-icon xs"
              aria-label="${t('config.title_period_color')}"
              @click=${() => { self._titlePeriodColorIdx = self._titlePeriodColorIdx === idx ? null : idx; }}>
              <span style="width:10px;height:10px;border-radius:50%;background:${resolveColorDot(opt.color)};display:block;"></span>
            </button>
          </div>
        </div>
        ${self._titlePeriodColorIdx === idx ? renderPeriodColorPicker(self, idx) : nothing}
      `)}
    </div>
  `;
}

function renderPeriodColorPicker(self: GlassConfigPanel, idx: number) {
  const COLORS = ['neutral', 'success', 'warning', 'info', 'accent', 'alert'];
  return html`
    <div style="display:flex;gap:4px;flex-wrap:wrap;padding:4px 8px 8px;">
      ${COLORS.map((c) => html`
        <button class="chip ${self._titlePeriodOptions[idx]?.color === c ? 'active' : ''}"
          style="padding:3px 8px;font-size:10px;"
          @click=${() => updatePeriodOption(self, idx, { color: c })}>
          ${c}
        </button>
      `)}
    </div>
  `;
}

function resolveColorDot(color: string): string {
  const map: Record<string, string> = {
    success: '#4ade80', warning: '#fbbf24', info: '#60a5fa',
    accent: '#818cf8', alert: '#f87171', neutral: 'rgba(255,255,255,0.25)',
  };
  return map[color] || color;
}

export function selectPeriodEntity(self: GlassConfigPanel, entityId: string): void {
  self._beginSuppressAutoSave();
  self._titlePeriodDropdownOpen = false;
  self._titlePeriodEntity = entityId;
  // Read options from HA entity and build initial period_options
  const entity = self.hass?.states[entityId];
  const haOptions = (entity?.attributes?.options as string[]) || [];
  // Preserve existing config for options that still exist
  const existingMap = new Map(self._titlePeriodOptions.map((o) => [o.id, o]));
  self._titlePeriodOptions = haOptions.map((opt) => {
    const existing = existingMap.get(opt);
    return existing ? { ...existing } : { id: opt, label: opt, icon: '', color: 'neutral' };
  });
}

export function updatePeriodOption(self: GlassConfigPanel, idx: number, patch: Partial<{ label: string; icon: string; color: string }>): void {
  const arr = [...self._titlePeriodOptions];
  arr[idx] = { ...arr[idx], ...patch };
  self._titlePeriodOptions = arr;
}

// — Source editor (one per source in the array) —

function renderSourceEditor(self: GlassConfigPanel, src: TitleSource, srcIdx: number) {
  const isEditing = self._titleEditingSourceIdx === srcIdx;
  const srcDef = SOURCE_DEFS.find((s) => s.key === src.source_type);
  const sourceLabel = src.label || srcDef?.label || src.source_type;
  const isDragging = self._dragIdx === srcIdx && self._dragContext === 'title_sources';
  const isDropTarget = self._dropIdx === srcIdx && self._dragContext === 'title_sources';

  return html`
    <div
      class="title-source-block ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}"
      draggable="true"
      @dragstart=${() => self._onDragStart(srcIdx, 'title_sources')}
      @dragover=${(e: DragEvent) => self._onDragOver(srcIdx, e)}
      @dragleave=${() => self._onDragLeave()}
      @drop=${(e: DragEvent) => self._onDropGeneric(srcIdx, e)}
      @dragend=${() => self._onDragEnd()}
    >
      <div class="title-source-header">
        <span class="drag-handle">
          <ha-icon .icon=${'mdi:drag'}></ha-icon>
        </span>
        <ha-icon .icon=${srcDef?.icon || 'mdi:help'}></ha-icon>
        <span class="title-source-type">${sourceLabel}</span>
        <span class="title-source-badge">${src.modes.length}</span>
        <div style="flex:1"></div>
        <button
          class="btn-icon xs"
          @click=${() => { self._titleEditingSourceIdx = isEditing ? null : srcIdx; self._titleAddEntityDropdownOpen = false; }}
          aria-label=${isEditing ? t('common.collapse') : t('common.expand')}
        >
          <ha-icon .icon=${isEditing ? 'mdi:pencil' : 'mdi:pencil-outline'}></ha-icon>
        </button>
        <button
          class="btn-icon xs"
          @click=${() => self._removeTitleSource(srcIdx)}
          aria-label=${t('config.title_remove_source')}
        >
          <ha-icon .icon=${'mdi:close'}></ha-icon>
        </button>
      </div>

      ${isEditing ? html`
        <div class="title-source-body">
          <!-- Label -->
          <div class="title-source-field">
            <span class="title-source-field-label">${t('config.title_source_label')}</span>
            <input
              class="input"
              type="text"
              .value=${src.label}
              placeholder=${srcDef?.label || ''}
              @input=${(e: Event) => self._setTitleSourceLabel(srcIdx, (e.target as HTMLInputElement).value)}
            />
          </div>

          ${src.source_type === 'input_select' ? renderInputSelectEntityPicker(self, src, srcIdx) : nothing}

          <!-- Mode list -->
          ${src.modes.length > 0 ? html`
            <div class="section-label" style="margin-top:10px;">${t('config.title_modes')}</div>
            <div class="title-modes-list">
              ${src.modes.map((mode, modeIdx) => renderModeRow(self, src, srcIdx, mode, modeIdx))}
            </div>
          ` : nothing}

          ${(src.source_type === 'scenes' || src.source_type === 'booleans') ? renderEntityAdder(self, src, srcIdx) : nothing}
        </div>
      ` : nothing}
    </div>
  `;
}

// — Input select entity picker —

function renderInputSelectEntityPicker(self: GlassConfigPanel, src: TitleSource, srcIdx: number) {
  const inputSelectEntities = self.hass
    ? Object.keys(self.hass.states).filter((id) => id.startsWith('input_select.')).sort()
    : [];

  return html`
    <div class="title-source-field">
      <span class="title-source-field-label">${t('config.title_mode_entity')}</span>
      <div class="dropdown ${self._titleEditingSourceIdx === srcIdx && self._titleAddEntityDropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => { if (!self._titleAddEntityDropdownOpen) self._titleAddEntitySearch = ''; self._titleAddEntityDropdownOpen = !self._titleAddEntityDropdownOpen; }}
          aria-expanded=${self._titleAddEntityDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${src.entity ? 'mdi:form-select' : 'mdi:help-circle-outline'}></ha-icon>
          <span>${src.entity || t('config.title_select_entity')}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <input
            class="dropdown-search"
            type="text"
            placeholder=${t('config.search_entity')}
            .value=${self._titleAddEntitySearch}
            @input=${(e: InputEvent) => { self._titleAddEntitySearch = (e.target as HTMLInputElement).value; self.requestUpdate(); }}
            @click=${(e: Event) => e.stopPropagation()}
          />
          <button
            class="dropdown-item ${!src.entity ? 'active' : ''}"
            role="option"
            aria-selected=${!src.entity ? 'true' : 'false'}
            @click=${() => self._setTitleSourceEntity(srcIdx, '')}
          >
            <ha-icon .icon=${'mdi:close'}></ha-icon>
            ${t('title_card.mode_none')}
          </button>
          ${inputSelectEntities
            .filter((id) => !self._titleAddEntitySearch || id.toLowerCase().includes(self._titleAddEntitySearch.toLowerCase()))
            .map((id) => html`
              <button
                class="dropdown-item ${id === src.entity ? 'active' : ''}"
                role="option"
                aria-selected=${id === src.entity ? 'true' : 'false'}
                @click=${() => self._setTitleSourceEntity(srcIdx, id)}
              >
                <ha-icon .icon=${'mdi:form-select'}></ha-icon>
                ${id}
              </button>
            `)}
        </div>
      </div>
    </div>
  `;
}

// — Scene/Boolean entity adder —

function renderEntityAdder(self: GlassConfigPanel, src: TitleSource, srcIdx: number) {
  const entityPrefix = src.source_type === 'scenes' ? 'scene.' : 'input_boolean.';
  const entityIcon = src.source_type === 'scenes' ? 'mdi:palette' : 'mdi:toggle-switch';
  const allEntities = self.hass
    ? Object.keys(self.hass.states).filter((id) => id.startsWith(entityPrefix)).sort()
    : [];
  const existingIds = new Set(src.modes.map((m) => m.id));
  const addable = allEntities.filter((id) => !existingIds.has(id));

  return html`
    <div class="title-source-field">
      <span class="title-source-field-label">${t('config.title_add_entity')}</span>
      <div class="dropdown ${self._titleEditingSourceIdx === srcIdx && self._titleAddEntityDropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => { if (!self._titleAddEntityDropdownOpen) self._titleAddEntitySearch = ''; self._titleAddEntityDropdownOpen = !self._titleAddEntityDropdownOpen; }}
          aria-expanded=${self._titleAddEntityDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${'mdi:plus'}></ha-icon>
          <span>${t('config.title_add_entity')}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <input
            class="dropdown-search"
            type="text"
            placeholder=${t('config.search_entity')}
            .value=${self._titleAddEntitySearch}
            @input=${(e: InputEvent) => { self._titleAddEntitySearch = (e.target as HTMLInputElement).value; self.requestUpdate(); }}
            @click=${(e: Event) => e.stopPropagation()}
          />
          ${addable
            .filter((id) => !self._titleAddEntitySearch || id.toLowerCase().includes(self._titleAddEntitySearch.toLowerCase()))
            .map((id) => html`
              <button
                class="dropdown-item"
                role="option"
                @click=${() => self._addTitleModeEntity(srcIdx, id)}
              >
                <ha-icon .icon=${entityIcon}></ha-icon>
                ${id}
              </button>
            `)}
        </div>
      </div>
    </div>
  `;
}

// — Mode row (per mode within a source) —

function renderModeRow(self: GlassConfigPanel, src: TitleSource, srcIdx: number, mode: { id: string; label: string; icon: string; color: string }, modeIdx: number) {
  // Compute flat index for icon/color picker (across all sources)
  let flatIdx = 0;
  for (let si = 0; si < srcIdx; si++) flatIdx += self._titleSources[si].modes.length;
  flatIdx += modeIdx;

  const isDragging = self._dragIdx === modeIdx && self._dragContext === 'title_modes' && self._dragModeSrcIdx === srcIdx;
  const isDropTarget = self._dropIdx === modeIdx && self._dragContext === 'title_modes' && self._dragModeSrcIdx === srcIdx;

  return html`
    <div
      class="title-mode-row ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}"
      draggable="true"
      @dragstart=${() => self._onDragStart(modeIdx, 'title_modes', srcIdx)}
      @dragover=${(e: DragEvent) => self._onDragOver(modeIdx, e, srcIdx)}
      @dragleave=${() => self._onDragLeave()}
      @drop=${(e: DragEvent) => self._onDropGeneric(modeIdx, e)}
      @dragend=${() => self._onDragEnd()}
    >
      <div class="title-mode-header">
        <span class="drag-handle">
          <ha-icon .icon=${'mdi:drag'}></ha-icon>
        </span>
        <span class="title-mode-id">${mode.id}</span>
        ${(src.source_type === 'scenes' || src.source_type === 'booleans') ? html`
          <button
            class="btn-icon xs"
            @click=${() => self._removeTitleModeEntity(srcIdx, mode.id)}
            aria-label=${t('config.title_remove_entity')}
          >
            <ha-icon .icon=${'mdi:close'}></ha-icon>
          </button>
        ` : nothing}
      </div>
      <div class="title-mode-fields-row">
        <input
          class="input"
          type="text"
          placeholder=${t('config.title_mode_label')}
          .value=${mode.label}
          @input=${(e: Event) => self._updateTitleMode(flatIdx, 'label', (e.target as HTMLInputElement).value)}
        />
        <button
          class="title-icon-btn ${mode.icon ? 'has-icon' : ''}"
          @click=${() => self._openIconPopup(flatIdx)}
          aria-label="${t('config.title_mode_icon')}"
        >
          <ha-icon .icon=${mode.icon || 'mdi:emoticon-outline'}></ha-icon>
        </button>
      </div>
      <div class="title-color-row">
        <span class="title-color-label">${t('config.title_mode_color')}</span>
        <div class="title-color-chips">
          ${COLORS.map((c) => html`
            <button
              class="title-color-chip ${c} ${mode.color === c ? 'active' : ''}"
              @click=${() => self._updateTitleMode(flatIdx, 'color', c)}
              aria-label="${t('config.title_mode_color')}: ${c}"
            ></button>
          `)}
          ${mode.color?.startsWith('#') ? html`
            <button
              class="title-color-chip custom active"
              style="background:${mode.color}"
              @click=${() => self._openColorPicker(flatIdx)}
              aria-label="${t('config.title_color_picker_aria')}"
            ></button>
          ` : nothing}
          <button
            class="title-color-picker-btn"
            @click=${() => self._openColorPicker(flatIdx)}
            aria-label="${t('config.title_color_picker_aria')}"
          ></button>
        </div>
      </div>
    </div>
  `;
}

// — Icon popup —

export function renderIconPopup(self: GlassConfigPanel) {
  if (self._iconPopupModeIdx === null) return nothing;
  const icons = self._getFilteredIcons();
  const currentIcon = self._titleModes[self._iconPopupModeIdx]?.icon ?? '';

  return html`
    <div class="icon-popup-overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) self._iconPopupModeIdx = null; }}>
      <div class="icon-popup">
        <div class="icon-popup-header">
          <span class="icon-popup-title">${t('config.title_mode_icon')}</span>
          <input
            class="icon-popup-search"
            type="text"
            placeholder=${'mdi:...'}
            .value=${self._iconSearch}
            @input=${(e: Event) => { self._iconSearch = (e.target as HTMLInputElement).value; }}
          />
        </div>
        <div class="icon-popup-grid-wrap">
          ${icons.length > 0 || !self._iconSearch ? html`
            <div class="icon-popup-grid">
              <button
                class="icon-pick ${currentIcon === '' ? 'selected' : ''}"
                @click=${() => {
                  if (self._iconPopupModeIdx != null) self._updateTitleMode(self._iconPopupModeIdx, 'icon', '');
                  self._iconPopupModeIdx = null;
                }}
                aria-label=${t('config.title_no_icon')}
              >
                <ha-icon .icon=${'mdi:cancel'} style="opacity:0.4;"></ha-icon>
              </button>
              ${icons.map((icon) => html`
                <button
                  class="icon-pick ${icon === currentIcon ? 'selected' : ''}"
                  @click=${() => {
                    if (self._iconPopupModeIdx != null) self._updateTitleMode(self._iconPopupModeIdx, 'icon', icon);
                    self._iconPopupModeIdx = null;
                  }}
                  aria-label=${icon}
                >
                  <ha-icon .icon=${icon}></ha-icon>
                </button>
              `)}
            </div>
          ` : html`<div class="icon-popup-empty">${t('config.title_no_icons_found')}</div>`}
        </div>
      </div>
    </div>
  `;
}

// — Color picker —

export function renderColorPicker(self: GlassConfigPanel) {
  if (self._colorPickerModeIdx === null) return nothing;
  const hex = self._colorPickerHex;
  return html`
    <div class="cp-overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) self._closeColorPicker(); }}>
      <div class="cp-dialog">
        <span class="cp-title">${t('config.title_color_picker_title')}</span>
        <div class="cp-wheel-wrap">
          <canvas
            @mousedown=${(e: MouseEvent) => {
              self._cancelColorDrag?.();
              self._onCpWheel(e);
              const onMove = (me: MouseEvent) => self._onCpWheel(me);
              const onUp = () => {
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', onUp);
                self._cancelColorDrag = undefined;
              };
              window.addEventListener('mousemove', onMove);
              window.addEventListener('mouseup', onUp);
              self._cancelColorDrag = onUp;
            }}
            @touchstart=${(e: TouchEvent) => {
              self._cancelColorDrag?.();
              e.preventDefault();
              self._onCpWheel(e);
              const onMove = (te: TouchEvent) => { te.preventDefault(); self._onCpWheel(te); };
              const onEnd = () => {
                window.removeEventListener('touchmove', onMove);
                window.removeEventListener('touchend', onEnd);
                self._cancelColorDrag = undefined;
              };
              window.addEventListener('touchmove', onMove, { passive: false });
              window.addEventListener('touchend', onEnd);
              self._cancelColorDrag = onEnd;
            }}
          ></canvas>
          <div class="cp-cursor" style="left:${self._colorPickerPos.x}%;top:${self._colorPickerPos.y}%;background:${hex}"></div>
        </div>
        <div class="cp-preview" style="background:${hex}"></div>
        <span class="cp-hex">${hex}</span>
        <button class="cp-confirm" @click=${() => self._applyColorPicker()}>
          ${t('common.select')}
        </button>
      </div>
    </div>
  `;
}

// — Delegation functions (called from GlassConfigPanel methods) —

export function addTitleSource(self: GlassConfigPanel, sourceType: SourceType) {
  self._titleAddSourceDropdownOpen = false;
  self._titleSources = [...self._titleSources, {
    source_type: sourceType,
    entity: '',
    label: '',
    modes: [],
  }];
  self._titleEditingSourceIdx = self._titleSources.length - 1;
}

export function removeTitleSource(self: GlassConfigPanel, idx: number) {
  const sources = [...self._titleSources];
  sources.splice(idx, 1);
  self._titleSources = sources;
  if (self._titleEditingSourceIdx === idx) {
    self._titleEditingSourceIdx = null;
  } else if (self._titleEditingSourceIdx !== null && self._titleEditingSourceIdx > idx) {
    self._titleEditingSourceIdx--;
  }
}

export function setTitleSourceEntity(self: GlassConfigPanel, srcIdx: number, entityId: string) {
  self._titleAddEntityDropdownOpen = false;
  const sources = [...self._titleSources];
  if (!sources[srcIdx]) return;
  sources[srcIdx] = { ...sources[srcIdx], entity: entityId };

  // Auto-populate modes from input_select options
  if (entityId.startsWith('input_select.') && self.hass) {
    const entity = self.hass.states[entityId];
    if (entity) {
      const options = (entity.attributes.options as string[] | undefined) ?? [];
      const existingMap = new Map(sources[srcIdx].modes.map((m) => [m.id, m]));
      sources[srcIdx] = {
        ...sources[srcIdx],
        modes: options.map((opt) => existingMap.get(opt) ?? { id: opt, label: opt, icon: '', color: 'neutral' }),
      };
    }
  } else if (!entityId) {
    sources[srcIdx] = { ...sources[srcIdx], modes: [] };
  }
  self._titleSources = sources;
}

export function setTitleSourceLabel(self: GlassConfigPanel, srcIdx: number, label: string) {
  const sources = [...self._titleSources];
  if (!sources[srcIdx]) return;
  sources[srcIdx] = { ...sources[srcIdx], label };
  self._titleSources = sources;
}

export function addTitleModeEntity(self: GlassConfigPanel, srcIdx: number, entityId: string) {
  self._titleAddEntityDropdownOpen = false;
  const sources = [...self._titleSources];
  if (!sources[srcIdx]) return;
  if (sources[srcIdx].modes.some((m) => m.id === entityId)) return;

  const entity = self.hass?.states[entityId];
  const name = (entity?.attributes.friendly_name as string | undefined) || entityId.split('.')[1] || entityId;
  const defaultIcon = entityId.startsWith('scene.') ? 'mdi:palette' : 'mdi:toggle-switch';
  const defaultColor = entityId.startsWith('scene.') ? 'accent' : 'success';
  sources[srcIdx] = {
    ...sources[srcIdx],
    modes: [...sources[srcIdx].modes, { id: entityId, label: name, icon: defaultIcon, color: defaultColor }],
  };
  self._titleSources = sources;
}

export function removeTitleModeEntity(self: GlassConfigPanel, srcIdx: number, entityId: string) {
  const sources = [...self._titleSources];
  if (!sources[srcIdx]) return;
  sources[srcIdx] = {
    ...sources[srcIdx],
    modes: sources[srcIdx].modes.filter((m) => m.id !== entityId),
  };
  self._titleSources = sources;
}

export function moveTitleMode(self: GlassConfigPanel, srcIdx: number, modeIdx: number, direction: -1 | 1) {
  const sources = [...self._titleSources];
  if (!sources[srcIdx]) return;
  const modes = [...sources[srcIdx].modes];
  const target = modeIdx + direction;
  if (target < 0 || target >= modes.length) return;
  [modes[modeIdx], modes[target]] = [modes[target], modes[modeIdx]];
  sources[srcIdx] = { ...sources[srcIdx], modes };
  self._titleSources = sources;
}

export function updateTitleMode(self: GlassConfigPanel, flatIdx: number, field: 'label' | 'icon' | 'color', value: string) {
  // flatIdx spans across all sources — find srcIdx + local modeIdx
  let remaining = flatIdx;
  const sources = [...self._titleSources];
  for (let si = 0; si < sources.length; si++) {
    if (remaining < sources[si].modes.length) {
      const modes = [...sources[si].modes];
      modes[remaining] = { ...modes[remaining], [field]: value };
      sources[si] = { ...sources[si], modes };
      self._titleSources = sources;
      return;
    }
    remaining -= sources[si].modes.length;
  }
}

export function getFilteredIcons(self: GlassConfigPanel): string[] {
  const query = self._iconSearch.toLowerCase().trim();
  const list = self._iconList;
  if (!query) return list.slice(0, 120);
  return list.filter((icon) => icon.toLowerCase().includes(query)).slice(0, 120);
}

export function openColorPicker(self: GlassConfigPanel, modeIdx: number) {
  if (modeIdx >= self._titleModes.length) return;
  const currentColor = self._titleModes[modeIdx].color;
  if (currentColor.startsWith('#') && currentColor.length === 7) {
    self._colorPickerHex = currentColor;
    self._colorPickerPos = hexToWheelPos(currentColor);
  } else {
    self._colorPickerHex = '#ffffff';
    self._colorPickerPos = { x: 50, y: 50 };
  }
  self._colorPickerModeIdx = modeIdx;
  self.updateComplete.then(() => {
    requestAnimationFrame(() => {
      const canvas = self.shadowRoot?.querySelector('.cp-wheel-wrap canvas') as HTMLCanvasElement | null;
      if (canvas) {
        self._cpCanvas = canvas;
        drawColorWheel(canvas);
      }
    });
  });
}

export function closeColorPicker(self: GlassConfigPanel) {
  self._cancelColorDrag?.();
  self._cancelColorDrag = undefined;
  self._colorPickerModeIdx = null;
  self._cpCanvas = null;
}

export function applyColorPicker(self: GlassConfigPanel) {
  if (self._colorPickerModeIdx !== null && self._colorPickerModeIdx < self._titleModes.length) {
    self._updateTitleMode(self._colorPickerModeIdx, 'color', self._colorPickerHex);
  }
  self._closeColorPicker();
}

export function onCpWheel(self: GlassConfigPanel, e: MouseEvent | TouchEvent) {
  // Re-acquire canvas if Lit re-rendered during drag (stale ref)
  let canvas = self._cpCanvas;
  const liveCanvas = self.shadowRoot?.querySelector('.cp-wheel-wrap canvas') as HTMLCanvasElement | null;
  if (liveCanvas && liveCanvas !== canvas) {
    self._cpCanvas = liveCanvas;
    drawColorWheel(liveCanvas);
    canvas = liveCanvas;
  }
  if (!canvas) return;
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  const result = colorFromWheelEvent(canvas, clientX, clientY);
  self._colorPickerHex = result.hex;
  self._colorPickerPos = result.pos;
}
