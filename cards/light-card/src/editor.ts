import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { glassTokens } from '@glass-cards/ui-core';
import { t, setLanguage, getLanguage } from '@glass-cards/i18n';
import type { HomeAssistant, LovelaceCardConfig } from '@glass-cards/base-card';

export class GlassLightCardEditor extends LitElement {
  @property({ attribute: false })
  set hass(value: HomeAssistant | undefined) {
    this._hass = value;
    if (value?.language && setLanguage(value.language)) this._lang = getLanguage();
  }
  get hass() { return this._hass; }
  private _hass?: HomeAssistant;
  @state() private _lang = getLanguage();

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
      @media (hover: hover) and (pointer: fine) {
        .redirect a:hover {
          text-decoration: underline;
        }
      }
      ha-icon {
        --mdc-icon-size: 20px;
        vertical-align: middle;
        margin-right: 4px;
      }
    `,
  ];

  protected render() {
    void this._lang; // Trigger re-render on language change
    return html`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${t('editor.redirect_message')}
        </p>
        <p>
          <a href="/glass-cards">${t('editor.open_config')}</a>
        </p>
      </div>
    `;
  }
}

try { customElements.define('glass-light-card-editor', GlassLightCardEditor); } catch { /* scoped registry */ }
