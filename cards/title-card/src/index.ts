import { css, html, nothing, type PropertyValues } from 'lit';
import { state } from 'lit/decorators.js';
import { BaseCard, BackendService } from '@glass-cards/base-card';
import { glassTokens } from '@glass-cards/ui-core';
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
    // Parse hex to rgba for glow
    const r = parseInt(colorKey.slice(1, 3), 16);
    const g = parseInt(colorKey.slice(3, 5), 16);
    const b = parseInt(colorKey.slice(5, 7), 16);
    return { text: colorKey, dot: colorKey, glow: `rgba(${r},${g},${b},0.5)` };
  }
  return COLOR_MAP.neutral;
}

class GlassTitleCard extends BaseCard {
  @state() private _cycling = false;

  private _titleConfig: TitleBackendConfig = { title: '', mode_entity: '', modes: [] };
  private _backend: BackendService | undefined;
  private _configLoaded = false;
  private _configLoading = false;
  private _loadVersion = 0;
  private _lastModeId: string | null = null;
  private _pendingCycle = false;
  private _cycleTimer = 0;
  private _pendingTimer = 0;

  static styles = [glassTokens, css`
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

    /* ── Mode row ── */
    .mode-row {
      display: flex; align-items: center; gap: 6px;
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
    .mode-row:active { transform: scale(0.96); }

    .mode-dot {
      width: 8px; height: 8px; border-radius: 50%;
      flex-shrink: 0;
      transition: all var(--t-med);
    }

    .mode-icon {
      display: flex; align-items: center; justify-content: center;
    }
    .mode-icon ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
      transition: color var(--t-fast);
    }

    .mode-label {
      font-size: 11px; font-weight: 500; color: var(--t4);
      letter-spacing: 0.3px;
    }

    .mode-value {
      font-size: 11px; font-weight: 600;
      transition: color var(--t-fast), opacity var(--t-fast);
    }

    .mode-chevron ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t4);
    }

    /* Cycle animation */
    @keyframes mode-swap {
      0%   { opacity: 1; transform: translateY(0); }
      40%  { opacity: 0; transform: translateY(-6px); }
      60%  { opacity: 0; transform: translateY(6px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .mode-value.cycling { animation: mode-swap 0.3s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)); }
  `];

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('title-config-changed', () => this._loadConfig());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._backend = undefined;
    this._configLoaded = false;
    this._configLoading = false;
    this._loadVersion++;
    clearTimeout(this._cycleTimer);
    clearTimeout(this._pendingTimer);
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
      // Detect mode state change → trigger cycling animation
      if (this._pendingCycle && this._titleConfig.mode_entity) {
        const currentMode = this._getActiveMode();
        const currentId = currentMode?.id ?? null;
        if (currentId !== this._lastModeId) {
          this._lastModeId = currentId;
          this._cycling = true;
          this._pendingCycle = false;
          this._cycleTimer = window.setTimeout(() => { this._cycling = false; }, 300);
        }
      }
    }
  }

  protected getTrackedEntityIds(): string[] {
    const eid = this._titleConfig.mode_entity;
    return eid ? [eid] : [];
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

  // — Mode helpers —

  private _getActiveMode(): { id: string; label: string; icon: string; color: string } | null {
    const eid = this._titleConfig.mode_entity;
    if (!eid || !this.hass) return null;

    if (eid.startsWith('input_select.')) {
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

    if (eid.startsWith('input_boolean.')) {
      const entity = this.hass.states[eid];
      if (!entity) return null;
      const isOn = entity.state === 'on';
      const suffix = eid.split('.')[1] ?? eid;
      const modeConfig = this._titleConfig.modes.find((m) => m.id === suffix);
      const baseName = modeConfig?.label || (entity.attributes.friendly_name as string | undefined) || suffix;
      return {
        id: suffix,
        label: baseName,
        icon: modeConfig?.icon || '',
        color: isOn ? (modeConfig?.color || 'success') : 'neutral',
      };
    }

    if (eid.startsWith('scene.')) {
      const entity = this.hass.states[eid];
      if (!entity) return null;
      const suffix = eid.split('.')[1] ?? eid;
      const modeConfig = this._titleConfig.modes.find((m) => m.id === suffix);
      return {
        id: suffix,
        label: modeConfig?.label || (entity.attributes.friendly_name as string | undefined) || suffix,
        icon: modeConfig?.icon || '',
        color: modeConfig?.color || 'accent',
      };
    }

    return null;
  }

  private _cycleMode() {
    const eid = this._titleConfig.mode_entity;
    if (!eid || !this.hass || this._pendingCycle) return;

    if (eid.startsWith('input_select.')) {
      this.hass.callService('input_select', 'select_next', { cycle: true }, { entity_id: eid });
    } else if (eid.startsWith('input_boolean.')) {
      this.hass.callService('input_boolean', 'toggle', {}, { entity_id: eid });
    } else if (eid.startsWith('scene.')) {
      this.hass.callService('scene', 'turn_on', {}, { entity_id: eid });
    } else {
      return;
    }

    this._lastModeId = this._getActiveMode()?.id ?? null;
    this._pendingCycle = true;
    // Safety: clear pendingCycle if state never changes (e.g. scene entities)
    this._pendingTimer = window.setTimeout(() => { this._pendingCycle = false; }, 2000);
  }

  // — Render —

  protected render() {
    void this._lang; // track i18n reactivity
    const title = this._titleConfig.title;
    if (!title) {
      this.style.display = 'none';
      return nothing;
    }
    this.style.display = '';

    const hasMode = !!this._titleConfig.mode_entity;
    const activeMode = hasMode ? this._getActiveMode() : null;
    const colorKey = activeMode?.color ?? 'neutral';
    const colors = resolveColor(colorKey);

    return html`
      <div class="title-card">
        <div class="title-text">${title}</div>
        ${hasMode ? html`
          <button
            class="mode-row"
            @click=${() => this._cycleMode()}
            aria-label=${t('title_card.cycle_aria')}
          >
            <div class="mode-dot" style="background:${colors.dot};box-shadow:0 0 6px ${colors.glow};"></div>
            ${activeMode?.icon ? html`
              <span class="mode-icon">
                <ha-icon .icon=${activeMode.icon}></ha-icon>
              </span>
            ` : nothing}
            <span class="mode-label">${this._titleConfig.mode_entity?.startsWith('scene.') ? t('title_card.scene_label') : t('title_card.mode_label')}</span>
            <span class="mode-value ${this._cycling ? 'cycling' : ''}" style="color:${colors.text};">
              ${activeMode?.label ?? t('title_card.mode_none')}
            </span>
            <span class="mode-chevron">
              <ha-icon .icon=${'mdi:chevron-right'}></ha-icon>
            </span>
          </button>
        ` : nothing}
      </div>
    `;
  }
}

try { customElements.define('glass-title-card', GlassTitleCard); } catch { /* already registered */ }
