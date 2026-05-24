import { css } from 'lit';

/**
 * Generic numbered-section layout for config-panel tabs.
 *
 * Visual language introduced with the Title/Dashboard redesign (v0.0.179) and
 * extracted here so every tab can adopt it without duplicating CSS.
 *
 * Markup contract:
 *
 *   <section class="cfg-section">
 *     <header class="cfg-section-head">
 *       <span class="cfg-section-num">1</span>
 *       <div class="cfg-section-text">
 *         <span class="section-label">…</span>
 *         <span class="section-desc">…</span>
 *       </div>
 *       <span class="cfg-section-count">3/7</span>  <!-- optional -->
 *     </header>
 *     …content…
 *   </section>
 *
 * A gradient hairline separator is drawn automatically above every section
 * except the first. The :first-of-type selector targets the first <section>,
 * so a preview card or any non-section element above is unaffected.
 */
export const sectionStyles = css`
  .cfg-section {
    position: relative;
    padding-top: 1.5rem;
    margin-top: 1rem;
  }
  .cfg-section:first-of-type {
    margin-top: 0.75rem;
    padding-top: 0;
  }
  .cfg-section:not(:first-of-type)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(var(--rgb-white), 0.06),
      transparent
    );
  }

  .cfg-section-head {
    display: grid;
    grid-template-columns: 1.5rem 1fr auto;
    align-items: center;
    gap: 0.625rem;
    margin-bottom: 0.625rem;
  }
  .cfg-section-num {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(var(--rgb-accent), 0.12);
    border: 1px solid rgba(var(--rgb-accent), 0.22);
    color: var(--c-accent);
    font-size: var(--fz-xs);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .cfg-section-text {
    display: flex;
    flex-direction: column;
    gap: 0.0625rem;
    min-width: 0;
  }
  /* Reset the standalone .section-label / .section-desc margins from base.ts
     when they sit inside a numbered section header — the grid layout owns
     the spacing here, the legacy block margins would push everything apart. */
  .cfg-section-text .section-label {
    margin: 0;
    padding: 0;
  }
  .cfg-section-text .section-desc {
    margin: 0;
    padding: 0;
  }
  .cfg-section-count {
    font-size: var(--fz-xxs);
    font-weight: 700;
    color: var(--t4);
    background: var(--s2);
    padding: 0.0625rem 0.375rem;
    border-radius: var(--radius-full);
    letter-spacing: 0.5px;
  }

  /* Danger variant — signals a destructive section. The badge and label
     switch to alert color, the separator line gets an alert tint. */
  .cfg-section.danger > .cfg-section-head .cfg-section-num {
    background: rgba(var(--rgb-alert), 0.12);
    border-color: rgba(var(--rgb-alert), 0.25);
    color: var(--c-alert);
  }
  .cfg-section.danger > .cfg-section-head .section-label {
    color: var(--c-alert);
  }

  /* .cfg-empty styles now provided by <glass-empty-state variant="inline">
     (ui-core). The .reconfig-loading helper class is preserved for local
     animation hooks (see views/advanced.ts). */

  /* ── Dashed "add" button (e.g. "+ Ajouter une source") ── */
  .cfg-add-wrap {
    margin-top: 0.5rem;
  }
  .cfg-add-btn {
    border-style: dashed !important;
  }

  /* ── Pedagogical info banner explaining a card's dashboard behaviour.
     Lives at the bottom of a config-panel tab, not inside a numbered section. */
  .cfg-info {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.625rem 0.75rem;
    background: var(--s1);
    border-radius: var(--radius-md);
    border: 1px solid var(--b1);
    font-size: var(--fz-sm);
    line-height: 1.4;
    color: var(--t3);
  }
  .cfg-info ha-icon {
    --mdc-icon-size: 1rem;
    --mdc-icon-color: var(--c-info);
    flex-shrink: 0;
    margin-top: 0.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* Warning variant — when the info banner is signalling an actionable issue */
  .cfg-info.warn {
    background: rgba(var(--rgb-warning), 0.06);
    border-color: rgba(var(--rgb-warning), 0.25);
    color: var(--t2);
  }
  .cfg-info.warn ha-icon { --mdc-icon-color: var(--c-warning); }

  /* ── Sub-group labels inside a numbered section
     Lighter than .section-label (no uppercase, smaller weight) so the
     hierarchy stays readable when several controls live under one section. */
  .cfg-sublabel {
    font-size: var(--fz-sm);
    font-weight: 600;
    color: var(--t3);
    margin: 0.875rem 0 0.25rem;
  }
  .cfg-subdesc {
    font-size: var(--fz-sm);
    color: var(--t4);
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
`;
