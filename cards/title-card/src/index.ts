import { css, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { BaseCard, BackendService, fireHaptic } from '@glass-cards/base-card';
import { glassTokens, hostMixin, bounceMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import './editor';

// — Backend config shapes (multi-source) —

interface TitleModeEntry {
  id: string;
  label: string;
  icon: string;
  color: string;
}

interface TitleSourceEntry {
  source_type: 'input_select' | 'scenes' | 'booleans';
  entity: string;
  label: string;
  modes: TitleModeEntry[];
}

interface TitlePeriodOption {
  id: string;
  label: string;
  icon: string;
  color: string;
}

interface TitleBackendConfig {
  title: string;
  sources: TitleSourceEntry[];
  period_entity: string;
  period_options: TitlePeriodOption[];
}

// Colors mapped to CSS custom properties
const COLOR_MAP: Record<string, { text: string; dot: string; glow: string }> = {
  success: { text: 'var(--c-success)', dot: 'var(--c-success)', glow: 'rgba(74,222,128,0.5)' },
  warning: { text: 'var(--c-warning)', dot: 'var(--c-warning)', glow: 'rgba(251,191,36,0.5)' },
  info:    { text: 'var(--c-info)',    dot: 'var(--c-info)',    glow: 'rgba(96,165,250,0.5)' },
  accent:  { text: 'var(--c-accent)',  dot: 'var(--c-accent)',  glow: 'rgba(129,140,248,0.5)' },
  alert:   { text: 'var(--c-alert)',   dot: 'var(--c-alert)',   glow: 'rgba(248,113,113,0.5)' },
  neutral: { text: 'var(--t3)',        dot: 'var(--t4)',        glow: 'none' },
};

const GROUP_LABEL_KEYS: Record<string, string> = {
  input_select: 'title_card.group_mode',
  scenes: 'title_card.group_scenes',
  booleans: 'title_card.group_toggles',
};

/** Resolve color key (predefined name or #rrggbb hex) to CSS values. */
function resolveColor(colorKey: string): { text: string; dot: string; glow: string } {
  if (COLOR_MAP[colorKey]) return COLOR_MAP[colorKey];
  if (colorKey.startsWith('#') && colorKey.length === 7) {
    const r = parseInt(colorKey.slice(1, 3), 16);
    const g = parseInt(colorKey.slice(3, 5), 16);
    const b = parseInt(colorKey.slice(5, 7), 16);
    return { text: colorKey, dot: colorKey, glow: `rgba(${r},${g},${b},0.5)` };
  }
  return COLOR_MAP.neutral;
}

/** Default period visuals used when no period_options are configured. */
const DEFAULT_PERIOD_VISUALS: Record<string, { icon: string; color: string }> = {
  'Matin':       { icon: 'mdi:weather-sunset-up',   color: '#f0a050' },
  'Après-midi':  { icon: 'mdi:white-balance-sunny',  color: '#7db8e0' },
  'Soir':        { icon: 'mdi:weather-sunset-down',  color: '#e08040' },
  'Nuit':        { icon: 'mdi:weather-night',        color: '#8b8ff0' },
};
const PERIOD_DEFAULT_VISUAL = { icon: 'mdi:clock-outline', color: 'var(--t3)' };

/** Default period entity used when "Auto" is selected in config panel. */
const DEFAULT_PERIOD_ENTITY_ID = 'input_select.periode_journee';

/** Scene activation timeout duration (ms). */
const SCENE_HIGHLIGHT_MS = 2000;

class GlassTitleCard extends BaseCard {
  static getConfigElement() {
    return document.createElement('glass-title-card-editor');
  }

  getCardSize() {
    return 2;
  }

  @state() private _foldOpen = false;
  @state() private _activatingSceneId: string | null = null;

  private _titleConfig: TitleBackendConfig = { title: '', sources: [], period_entity: '', period_options: [] };
  private _backend: BackendService | undefined;
  private _configLoaded = false;
  private _configLoading = false;
  private _loadVersion = 0;
  private _sceneTimeout = 0;
  private _boundClickOutside = this._onClickOutside.bind(this);

  private get _periodEntityId(): string {
    return this._titleConfig.period_entity || DEFAULT_PERIOD_ENTITY_ID;
  }

  private _getPeriodVisual(optionId: string): { icon: string; color: string } {
    const defaults = DEFAULT_PERIOD_VISUALS[optionId] || PERIOD_DEFAULT_VISUAL;
    const configured = this._titleConfig.period_options.find((o) => o.id === optionId);
    if (!configured) return defaults;
    // Only use configured color if it's a hex value (user customization);
    // semantic names (alert, warning, etc.) are config panel defaults — prefer proto hex colors
    const isCustomColor = configured.color?.startsWith('#');
    return {
      icon: configured.icon || defaults.icon,
      color: isCustomColor ? configured.color : defaults.color,
    };
  }

  static styles = [glassTokens, hostMixin, bounceMixin, css`
    :host {
      width: 100%;
      max-width: 31.25rem;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
    }

    .title-card {
      display: flex; flex-direction: column; align-items: center;
      gap: 0.25rem; padding: 0.25rem 1rem 0;
      text-align: center;
    }

    .title-text {
      font-size: var(--fz-xl); font-weight: 700; color: var(--t1);
      letter-spacing: -0.3px; line-height: 1.2;
      display: flex; align-items: center; gap: 0.875rem;
      width: 100%;
    }
    .title-text::before, .title-text::after {
      content: ''; flex: 1; height: 0.0625rem;
      background: linear-gradient(90deg, transparent, var(--b3));
    }
    .title-text::after {
      background: linear-gradient(90deg, var(--b3), transparent);
    }

    /* ── Dash trigger ── */
    .dash-trigger {
      display: flex; align-items: center; justify-content: center;
      min-height: 1.25rem;
      padding: 0.25rem 1rem;
      cursor: pointer; border: none; background: none; outline: none;
      -webkit-tap-highlight-color: transparent;
      border-radius: var(--radius-full);
      transition: background var(--t-fast);
      position: relative;
    }
    .dash-trigger::before { content: ''; position: absolute; inset: -10px -8px; }
    @media (hover: hover) and (pointer: fine) {
      .dash-trigger:hover { background: var(--s1); }
    }
    .dash-trigger:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
    @media (pointer: coarse) {
      .dash-trigger:active { transform: scale(0.96); }
    }

    .dash-line {
      width: 1.25rem; height: 0.1875rem; border-radius: 1.5px;
      background: var(--t4);
      transition: background var(--t-med), width var(--t-med), box-shadow var(--t-med);
    }

    /* ── Fold section ── */
    .fold-section {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
      overflow: hidden;
      width: 100%;
    }
    .fold-section.open { grid-template-rows: 1fr; }
    .fold-section-inner {
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.2s var(--ease-std) 0s;
    }
    .fold-section.open .fold-section-inner {
      opacity: 1;
      transition: opacity 0.2s var(--ease-std) 0.1s;
    }

    /* Fold separator */
    .fold-sep {
      height: 0.0625rem; width: 80%; margin: 0.25rem auto;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
    }

    /* ── Chips group ── */
    .chips-group-label {
      font-size: var(--fz-xs); font-weight: 600; text-transform: uppercase;
      letter-spacing: 1px; color: var(--t3);
      text-align: center; padding: 0.375rem 0 0.125rem;
    }
    .chips-group + .chips-group .chips-group-label {
      border-top: 1px solid var(--b1);
      margin: 0 20%; padding-top: 0.5rem;
    }

    .chips-row {
      display: flex; flex-wrap: wrap; justify-content: center;
      gap: 0.375rem; padding: 0.25rem 0.25rem 0.5rem;
    }

    /* ── Chip ── */
    .chip {
      display: inline-flex; align-items: center; gap: 0.3125rem;
      padding: 0.3125rem 0.75rem; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      color: var(--t3); cursor: pointer; transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .chip::before { content: ''; position: absolute; inset: -6px -4px; }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
    .chip ha-icon {
      --mdc-icon-size: var(--icon-sm);
      display: flex; align-items: center; justify-content: center;
    }
    @media (pointer: coarse) {
      .chip:active { transform: scale(0.98); }
    }

    @keyframes chip-pulse {
      0%   { box-shadow: inset 0 0 0 0 currentColor; }
      50%  { box-shadow: inset 0 0 8px 1px currentColor; }
      100% { box-shadow: inset 0 0 0 0 currentColor; }
    }
    .chip.pulsing { animation: chip-pulse 0.5s var(--ease-out); }

    /* ── Period indicator (crossfade) ── */
    .period-indicator {
      position: relative;
      height: 0.875rem;
      width: 100%;
    }
    .period-item {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--fz-xs);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--t3);
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s var(--ease-std);
    }
    .period-item.active {
      opacity: 1;
      pointer-events: auto;
    }
    .period-item ha-icon {
      margin-right: 0.25rem;
    }
    .period-item::after {
      content: '';
      display: inline-block;
      width: calc(9px + 0.25rem);
    }

    @media (prefers-reduced-motion: reduce) {
      .period-item, .chip, .dash-trigger, .fold-section, .fold-section-inner, .dash-line {
        transition-duration: 0.01ms !important;
      }
      .chip.pulsing { animation: none; }
    }
  `];

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('title-config-changed', () => this._loadConfig());
    document.addEventListener('click', this._boundClickOutside);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundClickOutside);
    this._backend = undefined;
    this._configLoaded = false;
    this._configLoading = false;
    this._loadVersion++;
    if (this._sceneTimeout) { clearTimeout(this._sceneTimeout); this._sceneTimeout = 0; }
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      if (this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._configLoaded = false;
        this._configLoading = false;
        this._loadVersion++;
      }
      if (!this._configLoaded && !this._configLoading) {
        this._configLoading = true;
        this._backend = new BackendService(this.hass);
        this._loadConfig();
      }
    }
  }

  protected getTrackedEntityIds(): string[] {
    const ids: string[] = [this._periodEntityId];
    for (const src of this._titleConfig.sources) {
      if (src.source_type === 'input_select' && src.entity) {
        ids.push(src.entity);
      } else {
        for (const m of src.modes) {
          if (m.id.includes('.')) ids.push(m.id);
        }
      }
    }
    return ids;
  }

  // — Backend config —

  private async _loadConfig(): Promise<void> {
    if (!this._backend) return;
    const version = this._loadVersion;
    try {
      const result = await this._backend.send<{
        title_card: TitleBackendConfig;
      }>('get_config');
      if (version !== this._loadVersion) return;
      if (result?.title_card) {
        this._titleConfig = result.title_card;
      }
      this._configLoaded = true;
      this._configLoading = false;
      this.requestUpdate();
    } catch {
      if (version === this._loadVersion) {
        this._configLoading = false;
      }
    }
  }

  // — Dash style (single color or multi-color gradient) —

  private _dashStyle(colors: string[]): string {
    if (colors.length === 0) return '';
    const resolved = colors.map((c) => resolveColor(c));
    const width = 'width:' + Math.min(20 + colors.length * 4, 36) + 'px';
    if (resolved.length === 1) {
      return `background:${resolved[0].dot};box-shadow:0 0 8px ${resolved[0].glow};${width}`;
    }
    const n = resolved.length;
    const stops = resolved.flatMap((r, i) => [`${r.dot} ${Math.round(i / n * 100)}%`, `${r.dot} ${Math.round((i + 1) / n * 100)}%`]).join(', ');
    const validGlows = resolved.filter((r) => r.glow !== 'none');
    const glows = validGlows.length > 0 ? validGlows.map((r) => `0 0 6px ${r.glow}`).join(', ') : 'none';
    return `background:linear-gradient(90deg, ${stops});box-shadow:${glows};${width}`;
  }

  // — Active mode detection per source —

  private _getActiveColors(src: TitleSourceEntry): string[] {
    if (src.source_type === 'input_select') {
      if (!src.entity || !this.hass) return [];
      const entity = this.hass.states[src.entity];
      if (!entity) return [];
      const mode = src.modes.find((m) => m.id === entity.state);
      const c = mode?.color || 'neutral';
      return c !== 'neutral' ? [c] : [];
    }
    if (src.source_type === 'booleans') {
      if (!this.hass) return [];
      const colors: string[] = [];
      for (const mode of src.modes) {
        if (this.hass.states[mode.id]?.state === 'on') {
          const c = mode.color || 'success';
          if (c !== 'neutral') colors.push(c);
        }
      }
      return colors;
    }
    // scenes: check temporary activation
    if (this._activatingSceneId) {
      const mode = src.modes.find((m) => m.id === this._activatingSceneId);
      if (mode) return [mode.color || 'accent'];
    }
    return [];
  }

  private _isChipActive(src: TitleSourceEntry, mode: TitleModeEntry, _idx: number): boolean {
    if (src.source_type === 'input_select') {
      if (!src.entity || !this.hass) return false;
      return this.hass.states[src.entity]?.state === mode.id;
    }
    if (src.source_type === 'booleans') {
      return this.hass?.states[mode.id]?.state === 'on';
    }
    if (src.source_type === 'scenes') {
      return this._activatingSceneId === mode.id;
    }
    return false;
  }

  // — Actions —

  private _pulseChip(dataId: string) {
    this.updateComplete.then(() => {
      const chip = this.shadowRoot?.querySelector(`.chip[data-id="${dataId}"]`) as HTMLElement | null;
      if (chip) {
        chip.classList.add('pulsing');
        setTimeout(() => chip.classList.remove('pulsing'), 600);
      }
    });
  }

  private _selectOption(src: TitleSourceEntry, optionId: string) {
    if (!src.entity || !this.hass) return;
    this._safeCallService('input_select', 'select_option', { option: optionId }, { entity_id: src.entity });
    this._pulseChip(optionId);
  }

  private _activateScene(sceneEntityId: string) {
    if (!this.hass) return;
    fireHaptic(this, 'light');
    this._safeCallService('scene', 'turn_on', {}, { entity_id: sceneEntityId });

    // Temporary highlight
    this._activatingSceneId = sceneEntityId;
    if (this._sceneTimeout) clearTimeout(this._sceneTimeout);
    this._sceneTimeout = window.setTimeout(() => {
      this._activatingSceneId = null;
      this._sceneTimeout = 0;
    }, SCENE_HIGHLIGHT_MS);

    // Pulse animation
    this._pulseChip(sceneEntityId);
  }

  private _toggleBoolean(boolEntityId: string) {
    if (!this.hass) return;
    this._safeCallService('input_boolean', 'toggle', {}, { entity_id: boolEntityId });
    this._pulseChip(boolEntityId);
  }

  private _toggleFold() {
    this._foldOpen = !this._foldOpen;
  }

  private _onClickOutside(e: Event) {
    if (!this._foldOpen) return;
    const path = e.composedPath();
    const root = this.shadowRoot;
    if (!root) return;
    const dashBtn = root.querySelector('.dash-trigger');
    const foldSection = root.querySelector('.fold-section');
    if (dashBtn && foldSection && !path.includes(dashBtn) && !path.includes(foldSection)) {
      this._foldOpen = false;
    }
  }

  // — Render —

  protected render() {
    void this._lang;
    const title = this._titleConfig.title || (this.configPreview ? t('config.title_title_placeholder') : '');
    if (!title) {
      this.style.display = 'none';
      return nothing;
    }
    this.style.display = '';

    const sources = this._titleConfig.sources;
    const hasSources = sources.length > 0 && sources.some((s) => s.modes.length > 0);

    // Collect all active colors across sources for the dash
    const activeColors: string[] = [];
    if (hasSources) {
      for (const src of sources) {
        activeColors.push(...this._getActiveColors(src));
      }
    }
    const dashHasActive = activeColors.length > 0;
    const dashStyle = dashHasActive ? this._dashStyle(activeColors) : '';

    return html`
      <div class="title-card">
        <div class="title-text">${title}</div>
        ${this._renderPeriodIndicator()}
        ${hasSources ? html`
          <button
            class="dash-trigger"
            @click=${() => this._toggleFold()}
            aria-label=${t('title_card.toggle_modes_aria')}
            aria-expanded=${this._foldOpen ? 'true' : 'false'}
          >
            <div
              class="dash-line"
              style="${dashStyle}"
            ></div>
          </button>
          <div class="fold-section ${this._foldOpen ? 'open' : ''}">
            <div class="fold-section-inner">
              <div class="fold-sep"></div>
              ${sources.map((src, si) => this._renderSourceGroup(src, si, sources.length > 1))}
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }

  // — Period indicator —

  private _renderPeriodIndicator(): TemplateResult | typeof nothing {
    if (!this.hass) return nothing;

    const entity = this.hass.states[this._periodEntityId];
    if (!entity) return nothing;

    // Read options directly from the HA entity
    const options = (entity.attributes?.options as string[] | undefined) ?? [];
    if (options.length === 0) return nothing;

    const currentValue = entity.state;
    const currentIdx = options.indexOf(currentValue);

    // Keep container stable even when state is unavailable/unknown
    if (currentIdx === -1) return html`<div class="period-indicator"></div>`;

    const activeVisual = this._getPeriodVisual(currentValue);
    const activeColor = resolveColor(activeVisual.color);

    return html`
      <div class="period-indicator" aria-live="polite" aria-label="${currentValue}">
        ${options.map((opt, i) => {
          const isActive = i === currentIdx;
          const visual = this._getPeriodVisual(opt);
          return html`
            <div class="period-item ${isActive ? 'active' : ''}"
              style="${isActive ? `color:${activeColor.text}` : ''}">
              <ha-icon .icon=${visual.icon} style="--mdc-icon-size:9px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${opt}
            </div>
          `;
        })}
      </div>
    `;
  }

  // — Render a single source group —

  private _renderSourceGroup(src: TitleSourceEntry, _groupIdx: number, showLabel: boolean): TemplateResult | typeof nothing {
    if (src.modes.length === 0) return nothing;
    const labelKey = GROUP_LABEL_KEYS[src.source_type];
    const groupLabel = src.label || (labelKey ? t(labelKey as never) : src.source_type);

    return html`
      <div class="chips-group">
        ${showLabel ? html`<div class="chips-group-label">${groupLabel}</div>` : nothing}
        <div class="chips-row">
          ${src.modes.map((mode, idx) => {
            const isActive = this._isChipActive(src, mode, idx);
            const mc = resolveColor(mode.color || 'neutral');
            return html`
              <button
                class="chip"
                data-id=${mode.id}
                style="${isActive ? `color:${mc.text};background:${mc.dot}14;border-color:${mc.dot}33;` : ''}"
                aria-label=${mode.label || mode.id}
                @click=${(e: Event) => { e.stopPropagation(); this._onChipClick(src, mode, idx); }}
              >
                ${mode.icon ? html`<ha-icon .icon=${mode.icon}></ha-icon>` : nothing}
                ${mode.label || mode.id.split('.')[1] || mode.id}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  private _onChipClick(src: TitleSourceEntry, mode: TitleModeEntry, _idx: number) {
    if (src.source_type === 'input_select') {
      this._selectOption(src, mode.id);
    } else if (src.source_type === 'scenes') {
      this._activateScene(mode.id);
    } else if (src.source_type === 'booleans') {
      this._toggleBoolean(mode.id);
    }
  }
}

try { customElements.define('glass-title-card', GlassTitleCard); } catch { /* already registered */ }
