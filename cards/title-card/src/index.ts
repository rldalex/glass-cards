import { css, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { BaseCard, BackendService } from '@glass-cards/base-card';
import { glassTokens, bounceMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';

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

interface TitleBackendConfig {
  title: string;
  sources: TitleSourceEntry[];
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

const GROUP_LABELS: Record<string, string> = {
  input_select: 'Mode',
  scenes: 'Scènes',
  booleans: 'Toggles',
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

/** Scene activation timeout duration (ms). */
const SCENE_HIGHLIGHT_MS = 2000;

class GlassTitleCard extends BaseCard {
  @state() private _foldOpen = false;
  @state() private _activatingSceneId: string | null = null;

  private _titleConfig: TitleBackendConfig = { title: '', sources: [] };
  private _backend: BackendService | undefined;
  private _configLoaded = false;
  private _configLoading = false;
  private _loadVersion = 0;
  private _sceneTimeout = 0;
  private _boundClickOutside = this._onClickOutside.bind(this);

  static styles = [glassTokens, bounceMixin, css`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }

    .title-card {
      display: flex; flex-direction: column; align-items: center;
      gap: 6px; padding: 8px 16px;
      text-align: center;
    }

    .title-text {
      font-size: 22px; font-weight: 700; color: var(--t1);
      letter-spacing: -0.3px; line-height: 1.2;
      display: flex; align-items: center; gap: 14px;
      width: 100%;
    }
    .title-text::before, .title-text::after {
      content: ''; flex: 1; height: 1px;
      background: linear-gradient(90deg, transparent, var(--b3));
    }
    .title-text::after {
      background: linear-gradient(90deg, var(--b3), transparent);
    }

    /* ── Dash trigger ── */
    .dash-trigger {
      display: flex; align-items: center; justify-content: center;
      padding: 4px 16px;
      cursor: pointer; border: none; background: none; outline: none;
      -webkit-tap-highlight-color: transparent;
      border-radius: var(--radius-full);
      transition: all var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .dash-trigger:hover { background: var(--s1); }
    }
    .dash-trigger:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
    @media (pointer: coarse) {
      .dash-trigger:active { transform: scale(0.96); }
    }

    .dash-line {
      width: 20px; height: 2px; border-radius: 1px;
      background: var(--t4);
      transition: all var(--t-med);
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
      height: 1px; width: 80%; margin: 4px auto;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
    }

    /* ── Chips group ── */
    .chips-group-label {
      font-size: 9px; font-weight: 600; text-transform: uppercase;
      letter-spacing: 1px; color: var(--t4);
      text-align: center; padding: 6px 0 2px;
    }
    .chips-group + .chips-group .chips-group-label {
      border-top: 1px solid var(--b1);
      margin: 0 20%; padding-top: 8px;
    }

    .chips-row {
      display: flex; flex-wrap: wrap; justify-content: center;
      gap: 6px; padding: 4px 4px 8px;
    }

    /* ── Chip ── */
    .chip {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 12px; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: 11px; font-weight: 600;
      color: var(--t3); cursor: pointer; transition: all var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
    .chip ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
    }
    @media (pointer: coarse) {
      .chip:active { transform: scale(0.94); }
    }

    @keyframes chip-pulse {
      0%   { box-shadow: inset 0 0 0 0 currentColor; }
      50%  { box-shadow: inset 0 0 8px 1px currentColor; }
      100% { box-shadow: inset 0 0 0 0 currentColor; }
    }
    .chip.pulsing { animation: chip-pulse 0.5s var(--ease-out); }
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
    const ids: string[] = [];
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
    const glows = resolved.map((r) => `0 0 6px ${r.glow}`).join(', ');
    return `background:linear-gradient(90deg, ${stops});box-shadow:${glows};${width}`;
  }

  // — Active mode detection per source —

  private _getActiveColor(src: TitleSourceEntry): string {
    if (src.source_type === 'input_select') {
      if (!src.entity || !this.hass) return 'neutral';
      const entity = this.hass.states[src.entity];
      if (!entity) return 'neutral';
      const mode = src.modes.find((m) => m.id === entity.state);
      return mode?.color || 'neutral';
    }
    if (src.source_type === 'booleans') {
      if (!this.hass) return 'neutral';
      for (const mode of src.modes) {
        if (this.hass.states[mode.id]?.state === 'on') return mode.color || 'success';
      }
      return 'neutral';
    }
    // scenes: check temporary activation
    if (this._activatingSceneId) {
      const mode = src.modes.find((m) => m.id === this._activatingSceneId);
      if (mode) return mode.color || 'accent';
    }
    return 'neutral';
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

  private _selectOption(src: TitleSourceEntry, optionId: string) {
    if (!src.entity || !this.hass) return;
    this.hass.callService('input_select', 'select_option', { option: optionId }, { entity_id: src.entity });
  }

  private _activateScene(sceneEntityId: string) {
    if (!this.hass) return;
    this.hass.callService('scene', 'turn_on', {}, { entity_id: sceneEntityId });

    // Temporary highlight
    this._activatingSceneId = sceneEntityId;
    if (this._sceneTimeout) clearTimeout(this._sceneTimeout);
    this._sceneTimeout = window.setTimeout(() => {
      this._activatingSceneId = null;
      this._sceneTimeout = 0;
    }, SCENE_HIGHLIGHT_MS);

    // Pulse animation
    this.updateComplete.then(() => {
      const chip = this.shadowRoot?.querySelector(`.chip[data-id="${sceneEntityId}"]`) as HTMLElement | null;
      if (chip) {
        chip.classList.add('pulsing');
        setTimeout(() => chip.classList.remove('pulsing'), 600);
      }
    });
  }

  private _toggleBoolean(boolEntityId: string) {
    if (!this.hass) return;
    this.hass.callService('input_boolean', 'toggle', {}, { entity_id: boolEntityId });
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
    const title = this._titleConfig.title;
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
        const c = this._getActiveColor(src);
        if (c !== 'neutral') activeColors.push(c);
      }
    }
    const dashHasActive = activeColors.length > 0;
    const dashStyle = dashHasActive ? this._dashStyle(activeColors) : '';

    return html`
      <div class="title-card">
        <div class="title-text">${title}</div>
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
              <div class="fold-sep"></div>
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }

  // — Render a single source group —

  private _renderSourceGroup(src: TitleSourceEntry, _groupIdx: number, showLabel: boolean): TemplateResult | typeof nothing {
    if (src.modes.length === 0) return nothing;
    const groupLabel = src.label || GROUP_LABELS[src.source_type] || src.source_type;

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
                ${src.source_type === 'booleans' ? html`` : nothing}
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
