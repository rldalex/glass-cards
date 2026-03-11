import { css, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { BaseCard, BackendService } from '@glass-cards/base-card';
import { glassTokens, bounceMixin, foldMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';

// — Backend config shape —

interface TitleModeEntry {
  id: string;
  label: string;
  icon: string;
  color: string;
}

interface TitleBackendConfig {
  title: string;
  mode_entity: string;
  mode_source: string; // '' | 'input_select' | 'scenes' | 'booleans'
  modes: TitleModeEntry[];
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

class GlassTitleCard extends BaseCard {
  @state() private _foldOpen = false;
  @state() private _dropdownOpen = false;

  private _titleConfig: TitleBackendConfig = { title: '', mode_entity: '', mode_source: '', modes: [] };
  private _backend: BackendService | undefined;
  private _configLoaded = false;
  private _configLoading = false;
  private _loadVersion = 0;
  private _boundClickOutside = this._onClickOutside.bind(this);

  static styles = [glassTokens, bounceMixin, foldMixin, css`
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

    /* ── Mode row (scenes & booleans header) ── */
    .mode-row {
      display: flex; align-items: center; gap: 5px;
      cursor: pointer; padding: 4px 12px; outline: none;
      border: none; background: none; font-family: inherit;
      -webkit-tap-highlight-color: transparent;
      border-radius: var(--radius-full);
      transition: all var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .mode-row:hover { background: var(--s1); }
    }
    .mode-row:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
    @media (pointer: coarse) {
      .mode-row:active { transform: scale(0.96); }
    }

    .mode-dot {
      width: 6px; height: 6px; border-radius: 50%;
      flex-shrink: 0;
      transition: all var(--t-med);
    }

    .mode-icon {
      display: flex; align-items: center; justify-content: center;
    }
    .mode-icon ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }

    .mode-label {
      font-size: 11px; font-weight: 500; color: var(--t4);
      letter-spacing: 0.3px;
    }

    .mode-value {
      font-size: 11px; font-weight: 600;
      transition: color var(--t-fast), opacity var(--t-fast);
    }

    .mode-chevron {
      display: flex; align-items: center;
      transition: transform 0.35s var(--ease-out);
    }
    .mode-chevron.rotated { transform: rotate(90deg); }
    .mode-chevron ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t4);
    }

    /* ── Dropdown (input_select) ── */
    .dropdown {
      position: relative; display: inline-block;
    }
    .dropdown-trigger {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 12px; border-radius: var(--radius-full);
      border: 1px solid var(--b2); background: var(--s1);
      color: var(--t2); font-family: inherit; font-size: 11px; font-weight: 500;
      cursor: pointer; transition: all var(--t-fast); outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .dropdown-trigger:hover { background: var(--s3); border-color: var(--b3); }
    }
    .dropdown-trigger:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
    .dropdown-trigger ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .dropdown-trigger .arrow {
      transition: transform var(--t-fast);
      color: var(--t4);
    }
    .dropdown.open .dropdown-trigger .arrow { transform: rotate(180deg); }
    .dropdown.open .dropdown-trigger { border-color: var(--b3); background: var(--s3); }
    @media (pointer: coarse) {
      .dropdown-trigger:active { transform: scale(0.96); }
    }

    .dropdown-menu {
      position: absolute; top: calc(100% + 6px); left: 50%; transform: translateX(-50%) translateY(-4px);
      min-width: 150px;
      border-radius: var(--radius-lg); padding: 4px;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
      backdrop-filter: blur(50px) saturate(1.5);
      -webkit-backdrop-filter: blur(50px) saturate(1.5);
      border: 1px solid var(--b2);
      box-shadow: 0 12px 40px rgba(0,0,0,0.4);
      z-index: 10;
      opacity: 0; pointer-events: none;
      transition: all var(--t-fast);
    }
    .dropdown.open .dropdown-menu {
      opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: all;
    }
    .dropdown-item {
      display: flex; align-items: center; gap: 6px;
      padding: 6px 10px; border-radius: var(--radius-sm);
      font-size: 11px; font-weight: 500; color: var(--t2);
      cursor: pointer; transition: all var(--t-fast);
      border: none; background: transparent; width: 100%;
      font-family: inherit; outline: none; text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .dropdown-item:hover { background: var(--s3); color: var(--t1); }
    }
    .dropdown-item:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    .dropdown-item ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }

    .item-dot {
      width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
      background: transparent; transition: all var(--t-fast);
    }
    .dropdown-item.active .item-dot { background: currentColor; box-shadow: 0 0 6px currentColor; }

    /* ── Chips (scenes & booleans) ── */
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
      color: var(--t3);
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

    .chips-row {
      display: flex; flex-wrap: wrap; justify-content: center;
      gap: 6px; padding: 8px 4px;
    }

    /* Fold separator */
    .fold-sep {
      height: 1px; width: 80%; margin: 4px auto;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
      opacity: 0; transition: opacity 0.25s var(--ease-std);
    }
    .fold-sep.visible { opacity: 1; }
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
    const src = this._getSource();
    if (src === 'input_select') {
      const eid = this._titleConfig.mode_entity;
      return eid ? [eid] : [];
    }
    if (src === 'booleans') {
      return this._titleConfig.modes.map((m) => m.id).filter((id) => id.includes('.'));
    }
    if (src === 'scenes') {
      return this._titleConfig.modes.map((m) => m.id).filter((id) => id.includes('.'));
    }
    return [];
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

  // — Source detection (explicit or inferred for backward compat) —

  private _getSource(): '' | 'input_select' | 'scenes' | 'booleans' {
    if (this._titleConfig.mode_source) {
      return this._titleConfig.mode_source as '' | 'input_select' | 'scenes' | 'booleans';
    }
    // Backward compat: infer from mode_entity
    const eid = this._titleConfig.mode_entity;
    if (eid?.startsWith('input_select.')) return 'input_select';
    if (eid?.startsWith('scene.')) return 'scenes';
    if (eid?.startsWith('input_boolean.')) return 'booleans';
    return '';
  }

  // — Mode helpers per source —

  private _getInputSelectActive(): { label: string; icon: string; color: string; id: string } | null {
    const eid = this._titleConfig.mode_entity;
    if (!eid || !this.hass) return null;
    const entity = this.hass.states[eid];
    if (!entity) return null;
    const currentOption = entity.state;
    const modeConfig = this._titleConfig.modes.find((m) => m.id === currentOption);
    return {
      id: currentOption,
      label: modeConfig?.label || currentOption,
      icon: modeConfig?.icon || '',
      color: modeConfig?.color || 'neutral',
    };
  }

  /**
   * Detect active scene by comparing last_changed timestamps.
   * The most recently activated scene (if its timestamp differs from others) is considered active.
   */
  private _getScenesActive(): { label: string; icon: string; color: string; id: string } | null {
    if (!this.hass) return null;
    const modes = this._titleConfig.modes;
    if (modes.length === 0) return null;

    let bestMode: TitleModeEntry | null = null;
    let bestTime = 0;
    let allSameTime = true;
    let firstTime = 0;

    for (const mode of modes) {
      const entity = this.hass.states[mode.id];
      if (!entity) continue;
      const ts = new Date(entity.last_changed).getTime();
      if (firstTime === 0) {
        firstTime = ts;
      } else if (ts !== firstTime) {
        allSameTime = false;
      }
      if (ts > bestTime) {
        bestTime = ts;
        bestMode = mode;
      }
    }

    // If all scenes have the same timestamp (boot), none is considered active
    if (allSameTime || !bestMode) return null;

    return {
      id: bestMode.id,
      label: bestMode.label || bestMode.id.split('.')[1] || bestMode.id,
      icon: bestMode.icon || '',
      color: bestMode.color || 'accent',
    };
  }

  private _getBooleansActive(): { label: string; icon: string; color: string; count: number } | null {
    if (!this.hass) return null;
    const active: TitleModeEntry[] = [];
    for (const mode of this._titleConfig.modes) {
      const entity = this.hass.states[mode.id];
      if (entity?.state === 'on') active.push(mode);
    }
    if (active.length === 0) return null;
    if (active.length === 1) {
      return {
        label: active[0].label || active[0].id.split('.')[1] || active[0].id,
        icon: active[0].icon || '',
        color: active[0].color || 'success',
        count: 1,
      };
    }
    return {
      label: t('title_card.active_count', { count: active.length }),
      icon: active[0].icon || '',
      color: active[0].color || 'success',
      count: active.length,
    };
  }

  // — Actions —

  private _selectOption(optionId: string) {
    const eid = this._titleConfig.mode_entity;
    if (!eid || !this.hass) return;
    this.hass.callService('input_select', 'select_option', { option: optionId }, { entity_id: eid });
    this._dropdownOpen = false;
  }

  private _activateScene(sceneEntityId: string) {
    if (!this.hass) return;
    this.hass.callService('scene', 'turn_on', {}, { entity_id: sceneEntityId });
    // Pulse animation on the chip
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

  private _toggleDropdown(e: Event) {
    e.stopPropagation();
    this._dropdownOpen = !this._dropdownOpen;
  }

  private _onClickOutside(e: Event) {
    const path = e.composedPath();
    const root = this.shadowRoot;
    if (!root) return;
    if (this._dropdownOpen) {
      const dd = root.querySelector('.dropdown');
      if (dd && !path.includes(dd)) this._dropdownOpen = false;
    }
    if (this._foldOpen) {
      const modeRow = root.querySelector('.mode-row');
      const fold = root.querySelector('.fold');
      if (modeRow && fold && !path.includes(modeRow) && !path.includes(fold)) {
        this._foldOpen = false;
      }
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

    const source = this._getSource();

    return html`
      <div class="title-card">
        <div class="title-text">${title}</div>
        ${source === 'input_select' ? this._renderDropdown() : nothing}
        ${source === 'scenes' ? this._renderScenes() : nothing}
        ${source === 'booleans' ? this._renderBooleans() : nothing}
      </div>
    `;
  }

  // — input_select → Dropdown —

  private _renderDropdown(): TemplateResult | typeof nothing {
    const active = this._getInputSelectActive();
    if (!active) return nothing;
    const colors = resolveColor(active.color);

    return html`
      <div class="dropdown ${this._dropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${(e: Event) => this._toggleDropdown(e)}
          aria-haspopup="listbox"
          aria-expanded=${this._dropdownOpen ? 'true' : 'false'}
          style="border-color:${active.color !== 'neutral' ? colors.dot : 'var(--b2)'};"
        >
          <div class="mode-dot" style="background:${colors.dot};box-shadow:0 0 6px ${colors.glow};"></div>
          ${active.icon ? html`<ha-icon .icon=${active.icon}></ha-icon>` : nothing}
          <span style="color:${colors.text};">${active.label}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${this._titleConfig.modes.map((mode) => {
            const isActive = mode.id === active.id;
            const mc = resolveColor(mode.color || 'neutral');
            return html`
              <button
                class="dropdown-item ${isActive ? 'active' : ''}"
                role="option"
                aria-selected=${isActive ? 'true' : 'false'}
                style="${isActive ? `color:${mc.text}` : ''}"
                @click=${(e: Event) => { e.stopPropagation(); this._selectOption(mode.id); }}
              >
                <span class="item-dot"></span>
                ${mode.icon ? html`<ha-icon .icon=${mode.icon}></ha-icon>` : nothing}
                <span>${mode.label || mode.id}</span>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  // — scenes → Mode row + fold + chips (active detection via last_changed) —

  private _renderScenes(): TemplateResult | typeof nothing {
    const modes = this._titleConfig.modes;
    if (modes.length === 0) return nothing;

    const activeScene = this._getScenesActive();
    const colorKey = activeScene?.color ?? 'neutral';
    const colors = resolveColor(colorKey);

    const label = modes.length <= 1 ? t('title_card.scene_label') : t('title_card.scenes_label');

    return html`
      <button
        class="mode-row"
        @click=${() => this._toggleFold()}
        aria-label=${t('title_card.toggle_scenes_aria')}
        aria-expanded=${this._foldOpen ? 'true' : 'false'}
      >
        <div class="mode-dot" style="background:${colors.dot};box-shadow:0 0 6px ${colors.glow};"></div>
        ${activeScene?.icon ? html`
          <span class="mode-icon"><ha-icon .icon=${activeScene.icon}></ha-icon></span>
        ` : nothing}
        <span class="mode-label">${label}</span>
        <span class="mode-value" style="color:${colors.text};">
          ${activeScene?.label ?? (modes.length === 1 ? (modes[0].label || modes[0].id.split('.')[1]) : t('title_card.scene_none'))}
        </span>
        <span class="mode-chevron ${this._foldOpen ? 'rotated' : ''}">
          <ha-icon .icon=${'mdi:chevron-down'}></ha-icon>
        </span>
      </button>
      <div class="fold-sep ${this._foldOpen ? 'visible' : ''}"></div>
      <div class="fold ${this._foldOpen ? 'open' : ''}">
        <div class="fold-inner">
          <div class="chips-row">
            ${modes.map((mode) => {
              const isActive = activeScene?.id === mode.id;
              const mc = resolveColor(mode.color || 'accent');
              return html`
                <button
                  class="chip"
                  data-id=${mode.id}
                  style="${isActive ? `color:${mc.text};background:${mc.dot}14;border-color:${mc.dot}33;` : ''}"
                  aria-label=${t('title_card.activate_scene_aria', { name: mode.label || mode.id })}
                  @click=${(e: Event) => { e.stopPropagation(); this._activateScene(mode.id); }}
                >
                  ${mode.icon ? html`<ha-icon .icon=${mode.icon}></ha-icon>` : nothing}
                  ${mode.label || mode.id.split('.')[1] || mode.id}
                </button>
              `;
            })}
          </div>
        </div>
      </div>
      <div class="fold-sep ${this._foldOpen ? 'visible' : ''}"></div>
    `;
  }

  // — booleans → Mode row + fold + toggle chips —

  private _renderBooleans(): TemplateResult | typeof nothing {
    const modes = this._titleConfig.modes;
    if (modes.length === 0) return nothing;

    const activeSummary = this._getBooleansActive();
    const colorKey = activeSummary?.color ?? 'neutral';
    const colors = resolveColor(colorKey);

    return html`
      <button
        class="mode-row"
        @click=${() => this._toggleFold()}
        aria-label=${t('title_card.toggle_modes_aria')}
        aria-expanded=${this._foldOpen ? 'true' : 'false'}
      >
        <div class="mode-dot" style="background:${colors.dot};box-shadow:0 0 6px ${colors.glow};"></div>
        ${activeSummary?.icon ? html`
          <span class="mode-icon"><ha-icon .icon=${activeSummary.icon}></ha-icon></span>
        ` : nothing}
        <span class="mode-label">${t('title_card.mode_label')}</span>
        <span class="mode-value" style="color:${colors.text};">
          ${activeSummary?.label ?? t('title_card.mode_none')}
        </span>
        <span class="mode-chevron ${this._foldOpen ? 'rotated' : ''}">
          <ha-icon .icon=${'mdi:chevron-down'}></ha-icon>
        </span>
      </button>
      <div class="fold-sep ${this._foldOpen ? 'visible' : ''}"></div>
      <div class="fold ${this._foldOpen ? 'open' : ''}">
        <div class="fold-inner">
          <div class="chips-row">
            ${modes.map((mode) => {
              const entity = this.hass?.states[mode.id];
              const isOn = entity?.state === 'on';
              const mc = resolveColor(mode.color || 'success');
              return html`
                <button
                  class="chip"
                  data-id=${mode.id}
                  style="${isOn ? `color:${mc.text};background:${mc.dot}14;border-color:${mc.dot}33;` : ''}"
                  aria-pressed=${isOn ? 'true' : 'false'}
                  aria-label=${t('title_card.toggle_bool_aria', { name: mode.label || mode.id })}
                  @click=${(e: Event) => { e.stopPropagation(); this._toggleBoolean(mode.id); }}
                >
                  ${mode.icon ? html`<ha-icon .icon=${mode.icon}></ha-icon>` : nothing}
                  ${mode.label || mode.id.split('.')[1] || mode.id}
                </button>
              `;
            })}
          </div>
        </div>
      </div>
      <div class="fold-sep ${this._foldOpen ? 'visible' : ''}"></div>
    `;
  }
}

try { customElements.define('glass-title-card', GlassTitleCard); } catch { /* already registered */ }
