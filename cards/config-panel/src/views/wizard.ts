import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '@glass-cards/base-card';
import './wizard-steps/welcome.js';
import './wizard-steps/rooms.js';
import './wizard-steps/orphans.js';
import './wizard-steps/appearance.js';
import './wizard-steps/done.js';

const STEPS = ['welcome', 'rooms', 'orphans', 'appearance', 'done'] as const;

export class ConfigWizard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) backend?: unknown;
  @state() private _step = 0;

  protected createRenderRoot() {
    return this;
  }

  private _next() {
    if (this._step < STEPS.length - 1) this._step++;
  }

  private _prev() {
    if (this._step > 0) this._step--;
  }

  private _skip() {
    this._next();
  }

  private _finish() {
    if (this.backend) {
      (this.backend as { send: (cmd: string, data: unknown) => void }).send(
        'set_wizard_completed',
        { completed: true },
      );
    }
    this.dispatchEvent(new CustomEvent('wizard-done', { bubbles: true, composed: true }));
  }

  protected render(): TemplateResult {
    const stepId = STEPS[this._step];
    const isLast = this._step === STEPS.length - 1;
    const isFirst = this._step === 0;

    return html`
      <div class="wizard">
        <div class="wizard-progress">
          ${STEPS.map(
            (_, i) => html`
              <div
                class="wizard-dot ${i === this._step ? 'active' : ''} ${i < this._step ? 'done' : ''}"
              ></div>
            `,
          )}
        </div>

        <div class="wizard-card">
        <div class="wizard-content">${this._renderStep(stepId)}</div>

        <div class="wizard-actions">
          ${!isFirst
            ? html`<glass-button
                variant="secondary"
                @click=${() => this._prev()}
                aria-label="Retour"
              >
                Retour
              </glass-button>`
            : html`<span></span>`}
          <div class="wizard-actions-right">
            ${!isLast
              ? html`<glass-button
                  variant="ghost"
                  @click=${() => this._skip()}
                  aria-label="Passer cette étape"
                >
                  Passer
                </glass-button>`
              : ''}
            ${isLast
              ? html`<glass-button
                  variant="primary"
                  @click=${() => this._finish()}
                  aria-label="Commencer"
                >
                  Commencer
                </glass-button>`
              : html`<glass-button
                  variant="primary"
                  @click=${() => this._next()}
                  aria-label="Étape suivante"
                >
                  Suivant
                </glass-button>`}
          </div>
        </div>
        </div>
      </div>
    `;
  }

  private _renderStep(stepId: string): TemplateResult {
    switch (stepId) {
      case 'welcome':
        return html`<wizard-step-welcome></wizard-step-welcome>`;
      case 'rooms':
        return html`<wizard-step-rooms .hass=${this.hass}></wizard-step-rooms>`;
      case 'orphans':
        return html`<wizard-step-orphans .hass=${this.hass}></wizard-step-orphans>`;
      case 'appearance':
        return html`<wizard-step-appearance></wizard-step-appearance>`;
      case 'done':
        return html`<wizard-step-done></wizard-step-done>`;
      default:
        return html``;
    }
  }
}

try {
  customElements.define('config-wizard', ConfigWizard);
} catch {
  /* already registered */
}
