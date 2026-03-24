import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import type { HomeAssistant } from '@glass-cards/base-card';

export class WizardStepRooms extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;

  protected createRenderRoot() { return this; }

  private _getRooms() {
    if (!this.hass?.areas) return [];
    return Object.values(this.hass.areas).sort((a, b) => a.name.localeCompare(b.name));
  }

  protected render(): TemplateResult {
    const rooms = this._getRooms();

    return html`
      <div class="wizard-step-icon">
        <ha-icon .icon=${'mdi:home-group'}></ha-icon>
      </div>
      <div class="section-label">Vos pièces (${rooms.length})</div>
      <div class="wizard-room-list">
        ${rooms.map((room) => html`
          <div class="wizard-room-chip">
            <ha-icon .icon=${room.icon ?? 'mdi:home'}></ha-icon>
            <span>${room.name}</span>
          </div>
        `)}
        ${rooms.length === 0 ? html`<div class="section-desc">Aucune pièce détectée dans Home Assistant.</div>` : ''}
      </div>
      <div class="section-desc">
        Ces pièces ont été détectées depuis Home Assistant. Vous pourrez les personnaliser plus tard.
      </div>
    `;
  }
}

try { customElements.define('wizard-step-rooms', WizardStepRooms); } catch { /* already registered */ }
