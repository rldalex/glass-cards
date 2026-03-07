import { html, css, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  getAreaEntities,
  type HassEntity,
  type LovelaceCardConfig,
} from '@glass-cards/base-card';
import { glassTokens, glassMixin, foldMixin } from '@glass-cards/ui-core';

export class GlassLightCard extends BaseCard {
  @property({ attribute: false }) areaId?: string;
  @state() private _expandedEntity: string | null = null;

  static styles = [
    glassTokens,
    glassMixin,
    foldMixin,
    css`
      :host {
        display: block;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        padding: 0 4px;
      }
      .card-label {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .count-badge {
        background: var(--s3);
        border-radius: var(--radius-full);
        padding: 1px 7px;
        font-size: 10px;
        font-weight: 700;
        color: var(--t2);
      }
      .toggle-all-btn {
        background: transparent;
        border: none;
        padding: 0;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        width: 44px;
        height: 24px;
        border-radius: 12px;
        position: relative;
        transition: background var(--t-fast);
      }
      .toggle-all-btn.on {
        background: rgba(251, 191, 36, 0.3);
      }
      .toggle-all-btn.off {
        background: var(--s2);
      }
      .toggle-thumb {
        position: absolute;
        top: 4px;
        left: 4px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--t3);
        transition: transform var(--t-fast);
      }
      .toggle-all-btn.on .toggle-thumb {
        transform: translateX(20px);
        background: var(--c-warning);
      }

      .card {
        position: relative;
        padding: 12px;
      }

      .tint {
        background: radial-gradient(ellipse at 50% 50%, var(--c-warning), transparent 70%);
        opacity: 0;
        transition: opacity var(--t-slow);
      }
      :host([lights-on]) .tint {
        opacity: 0.12;
      }

      .light-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2px;
        position: relative;
        z-index: 1;
      }

      .light-row {
        grid-column: span 2;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        border-radius: var(--radius-md);
        transition: background var(--t-fast);
      }
      .light-row:hover {
        background: var(--s1);
      }

      .light-expand-btn {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 10px;
        background: transparent;
        border: none;
        padding: 0;
        font-family: inherit;
        outline: none;
        text-align: left;
        color: inherit;
        cursor: pointer;
      }

      .light-icon-btn {
        background: var(--s2);
        border: none;
        border-radius: var(--radius-md);
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--t3);
        padding: 0;
        font-family: inherit;
        outline: none;
        flex-shrink: 0;
        transition:
          color var(--t-fast),
          background var(--t-fast);
      }
      .light-icon-btn.on {
        color: var(--c-warning);
        filter: drop-shadow(0 0 6px var(--c-warning));
      }
      .light-icon-btn ha-icon {
        --mdc-icon-size: 20px;
      }

      .light-info {
        flex: 1;
        min-width: 0;
      }
      .light-name {
        font-size: 13px;
        font-weight: 600;
        color: var(--t2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .light-sub {
        font-size: 11px;
        color: var(--t3);
        font-weight: 400;
      }

      .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .status-dot.on {
        background: var(--c-warning);
        box-shadow: 0 0 6px var(--c-warning);
      }
      .status-dot.off {
        background: var(--s3);
      }

      .control-fold {
        padding: 0 8px;
      }

      .brightness-control {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
      }
      .brightness-control ha-icon {
        --mdc-icon-size: 16px;
        color: var(--t4);
        flex-shrink: 0;
      }
      .brightness-slider {
        flex: 1;
        height: 36px;
        appearance: none;
        -webkit-appearance: none;
        background: var(--s1);
        border-radius: var(--radius-lg);
        outline: none;
        border: 1px solid var(--b1);
      }
      .brightness-slider::-webkit-slider-thumb {
        appearance: none;
        -webkit-appearance: none;
        width: 8px;
        height: 20px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.7);
        cursor: pointer;
      }
      .brightness-slider::-moz-range-thumb {
        width: 8px;
        height: 20px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.7);
        border: none;
        cursor: pointer;
      }
      .brightness-value {
        font-size: 12px;
        font-weight: 600;
        color: var(--t2);
        min-width: 30px;
        text-align: right;
      }
    `,
  ];

  setConfig(config: LovelaceCardConfig) {
    super.setConfig(config);
  }

  getCardSize() {
    return 3;
  }

  protected getTrackedEntityIds(): string[] {
    return this._getLights().map((e) => e.entity_id);
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    const lights = this._getLights();
    const anyOn = lights.some((l) => l.state === 'on');
    if (anyOn) {
      this.setAttribute('lights-on', '');
    } else {
      this.removeAttribute('lights-on');
    }
  }

  private _getLights(): HassEntity[] {
    if (!this.hass) return [];

    if (this.areaId) {
      return getAreaEntities(this.areaId, this.hass.entities, this.hass.devices)
        .filter((e) => e.entity_id.startsWith('light.'))
        .map((e) => this.hass?.states[e.entity_id])
        .filter((s): s is HassEntity => s !== undefined);
    }

    if (this._config?.entity) {
      const entity = this.hass.states[this._config.entity];
      return entity ? [entity] : [];
    }

    return [];
  }

  private _toggleLight(entityId: string) {
    this.hass?.callService('light', 'toggle', {}, { entity_id: entityId });
  }

  private _toggleAll() {
    const lights = this._getLights();
    const anyOn = lights.some((l) => l.state === 'on');
    const service = anyOn ? 'turn_off' : 'turn_on';
    const ids = lights.map((l) => l.entity_id);
    this.hass?.callService('light', service, {}, { entity_id: ids });
  }

  private _setBrightness(entityId: string, value: number) {
    this.hass?.callService('light', 'turn_on', { brightness_pct: value }, { entity_id: entityId });
  }

  private _toggleExpand(entityId: string) {
    this._expandedEntity = this._expandedEntity === entityId ? null : entityId;
  }

  private _getBrightnessPct(entity: HassEntity): number {
    const brightness = entity.attributes.brightness as number | undefined;
    if (brightness === undefined) return 0;
    return Math.round((brightness / 255) * 100);
  }

  private _renderLightRow(entity: HassEntity) {
    const isOn = entity.state === 'on';
    const name = (entity.attributes.friendly_name as string) || entity.entity_id;
    const brightnessPct = isOn ? this._getBrightnessPct(entity) : 0;
    const isExpanded = this._expandedEntity === entity.entity_id;

    return html`
      <div class="light-row">
        <button
          class="light-icon-btn ${isOn ? 'on' : ''}"
          @click=${() => this._toggleLight(entity.entity_id)}
          aria-label="Toggle ${name}"
        >
          <ha-icon .icon=${'mdi:lightbulb'}></ha-icon>
        </button>
        <button
          class="light-expand-btn"
          @click=${() => this._toggleExpand(entity.entity_id)}
          aria-label="Expand ${name} controls"
          ${isOn ? html`aria-expanded=${isExpanded ? 'true' : 'false'}` : nothing}
        >
          <div class="light-info">
            <div class="light-name">${name}</div>
            ${isOn ? html`<div class="light-sub">${brightnessPct}%</div>` : nothing}
          </div>
          <span class="status-dot ${isOn ? 'on' : 'off'}"></span>
        </button>
      </div>

      <div class="fold ${isExpanded && isOn ? 'open' : ''}" style="grid-column: span 2">
        <div class="fold-inner">
          <div class="control-fold">
            <div class="brightness-control">
              <ha-icon .icon=${'mdi:brightness-6'}></ha-icon>
              <input
                type="range"
                class="brightness-slider"
                min="1"
                max="100"
                .value=${String(brightnessPct)}
                @input=${(e: Event) => {
                  const val = Number((e.target as HTMLInputElement).value);
                  this._setBrightness(entity.entity_id, val);
                }}
              />
              <span class="brightness-value">${brightnessPct}%</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const lights = this._getLights();
    if (lights.length === 0) return nothing;

    const onCount = lights.filter((l) => l.state === 'on').length;
    const anyOn = onCount > 0;

    return html`
      <div class="card-header">
        <span class="card-label">
          LIGHTS
          <span class="count-badge">${onCount}/${lights.length}</span>
        </span>
        <button
          class="toggle-all-btn ${anyOn ? 'on' : 'off'}"
          @click=${() => this._toggleAll()}
          aria-label="${anyOn ? 'Turn off all lights' : 'Turn on all lights'}"
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>

      <div class="card glass">
        <div class="tint"></div>
        <div class="light-grid">${lights.map((l) => this._renderLightRow(l))}</div>
      </div>
    `;
  }
}

customElements.define('glass-light-card', GlassLightCard);

const windowWithCards = window as unknown as {
  customCards?: { type: string; name: string; description: string }[];
};
windowWithCards.customCards = windowWithCards.customCards || [];
windowWithCards.customCards.push({
  type: 'glass-light-card',
  name: 'Glass Light Card',
  description: 'Neo-glassmorphism light control card',
});
