import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-status-dot>` — Small circular state indicator.
 *
 * Used in compact bars next to entity names to signal on/off, presence,
 * connection, etc. Non-interactive.
 *
 * `tone` picks the semantic color via --rgb-<tone>. Pass `glow` for an
 * outer box-shadow tint that matches the dot color.
 */
export class GlassStatusDot extends LitElement {
  @property({ type: String, reflect: true }) tone:
    | 'neutral' | 'accent' | 'success' | 'warning' | 'alert' | 'info'
    | 'purple' | 'light-glow' | 'spotify' | 'heat' | 'cool' = 'neutral';
  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' = 'sm';
  @property({ type: Boolean, reflect: true }) glow = false;

  static styles: CSSResult[] = [
    css`
      :host {
        display: inline-block;
        flex-shrink: 0;
      }
      .dot {
        display: block;
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        background: var(--t4);
        transition:
          background var(--t-med),
          box-shadow var(--t-med);
      }
      :host([size='xs']) .dot { width: 0.3125rem; height: 0.3125rem; }
      :host([size='md']) .dot { width: 0.5rem; height: 0.5rem; }

      :host([tone='accent']) .dot       { background: rgb(var(--rgb-accent)); }
      :host([tone='success']) .dot      { background: rgb(var(--rgb-success)); }
      :host([tone='warning']) .dot      { background: rgb(var(--rgb-warning)); }
      :host([tone='alert']) .dot        { background: rgb(var(--rgb-alert)); }
      :host([tone='info']) .dot         { background: rgb(var(--rgb-info)); }
      :host([tone='purple']) .dot       { background: rgb(var(--rgb-purple)); }
      :host([tone='light-glow']) .dot   { background: rgb(var(--rgb-light-glow)); }
      :host([tone='spotify']) .dot      { background: rgb(var(--rgb-spotify)); }
      :host([tone='heat']) .dot         { background: rgb(var(--rgb-heat)); }
      :host([tone='cool']) .dot         { background: rgb(var(--rgb-cool)); }

      :host([glow][tone='accent']) .dot     { box-shadow: 0 0 8px rgba(var(--rgb-accent), 0.5); }
      :host([glow][tone='success']) .dot    { box-shadow: 0 0 8px rgba(var(--rgb-success), 0.5); }
      :host([glow][tone='warning']) .dot    { box-shadow: 0 0 8px rgba(var(--rgb-warning), 0.5); }
      :host([glow][tone='alert']) .dot      { box-shadow: 0 0 8px rgba(var(--rgb-alert), 0.5); }
      :host([glow][tone='info']) .dot       { box-shadow: 0 0 8px rgba(var(--rgb-info), 0.5); }
      :host([glow][tone='purple']) .dot     { box-shadow: 0 0 8px rgba(var(--rgb-purple), 0.5); }
      :host([glow][tone='light-glow']) .dot { box-shadow: 0 0 8px rgba(var(--rgb-light-glow), 0.5); }
      :host([glow][tone='spotify']) .dot    { box-shadow: 0 0 8px rgba(var(--rgb-spotify), 0.5); }
      :host([glow][tone='heat']) .dot       { box-shadow: 0 0 8px rgba(var(--rgb-heat), 0.5); }
      :host([glow][tone='cool']) .dot       { box-shadow: 0 0 8px rgba(var(--rgb-cool), 0.5); }
    `,
  ];

  protected render() {
    return html`<span class="dot" role="presentation"></span>`;
  }
}

try { customElements.define('glass-status-dot', GlassStatusDot); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-status-dot': GlassStatusDot;
  }
}
