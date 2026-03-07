import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { glassTokens } from '@glass-cards/ui-core';
import type { HomeAssistant, LovelaceCardConfig } from '@glass-cards/base-card';

export class GlassRoomPopupEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  _config?: LovelaceCardConfig;

  setConfig(config: LovelaceCardConfig): void {
    this._config = config;
  }

  static styles = [
    glassTokens,
    css`
      .redirect {
        padding: 24px 16px;
        text-align: center;
        color: var(--primary-text-color, #fff);
      }
      .redirect p {
        margin: 8px 0;
        line-height: 1.5;
      }
      .redirect a {
        color: var(--primary-color, #03a9f4);
        text-decoration: none;
        font-weight: 600;
      }
      .redirect a:hover {
        text-decoration: underline;
      }
      ha-icon {
        --mdc-icon-size: 20px;
        vertical-align: middle;
        margin-right: 4px;
      }
    `,
  ];

  protected render() {
    return html`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          La configuration de Glass Cards se fait depuis le panneau dédié.
        </p>
        <p>
          <a href="/glass-cards">Ouvrir Glass Cards Config</a>
        </p>
      </div>
    `;
  }
}

customElements.define('glass-room-popup-editor', GlassRoomPopupEditor);
