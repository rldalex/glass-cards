import { describe, it, expect } from 'vitest';
import {
  GLASS_CARDS,
  DASHBOARD_CARD_ORDER,
  ROOM_CARD_ORDER,
  normalizeRoomCardId,
} from '@glass-cards/base-card/card-registry';
import { SECTION_TO_EVENT } from '@glass-cards/event-bus';
import { DOMAIN_COLORS } from '@glass-cards/ui-core';
import fr from '../../packages/i18n/locales/fr.json';
import en from '../../packages/i18n/locales/en.json';

/** The registry is the single source of truth for card identity — these
 *  tests catch the drift that used to live between hand-copied tables
 *  (the 'media' vs 'media_player' bug class). */
describe('card registry coherence', () => {
  it('has unique ids, tags, panel tags, subs and config keys', () => {
    for (const field of ['id', 'tag', 'panelTag', 'sub', 'configKey'] as const) {
      const values = GLASS_CARDS.map((c) => c[field]);
      expect(new Set(values).size, `duplicate ${field}`).toBe(values.length);
    }
  });

  it('has unique non-null domains', () => {
    const domains = GLASS_CARDS.map((c) => c.domain).filter((d): d is string => d !== null);
    expect(new Set(domains).size).toBe(domains.length);
  });

  it('room cards all carry a domain, and ROOM_CARD_ORDER contains domains only', () => {
    for (const c of GLASS_CARDS) {
      if (c.roomOrder !== null) expect(c.domain, `${c.id} has roomOrder but no domain`).not.toBeNull();
    }
    // card_order persists entity domains — a dashboard id leaking in here is
    // exactly the popup-hides-the-card bug.
    for (const d of ROOM_CARD_ORDER) {
      expect(GLASS_CARDS.some((c) => c.domain === d)).toBe(true);
    }
    expect(ROOM_CARD_ORDER).not.toContain('media');
  });

  it('every configKey has its bridge entry in event-bus SECTION_TO_EVENT', () => {
    for (const c of GLASS_CARDS) {
      expect(SECTION_TO_EVENT[c.configKey], `missing bridge for ${c.configKey}`).toBe(c.configEvent);
    }
  });

  it('every colorKey resolves in DOMAIN_COLORS', () => {
    for (const c of GLASS_CARDS) {
      expect(DOMAIN_COLORS[c.colorKey], `unknown colorKey ${c.colorKey}`).toBeDefined();
    }
  });

  it('every card has its i18n keys in both locales', () => {
    const locales = { fr, en } as const;
    for (const [lang, data] of Object.entries(locales)) {
      const config = data.config as Record<string, string>;
      for (const c of GLASS_CARDS) {
        expect(config[`dashboard_card_${c.id}`], `${lang}: config.dashboard_card_${c.id}`).toBeTruthy();
        if (c.domain && c.roomOrder !== null) {
          expect(config[`domain_${c.domain}`], `${lang}: config.domain_${c.domain}`).toBeTruthy();
          expect(config[`domain_${c.domain}_desc`], `${lang}: config.domain_${c.domain}_desc`).toBeTruthy();
        }
      }
    }
  });

  it('dashboard order covers every card exactly once', () => {
    expect([...DASHBOARD_CARD_ORDER].sort()).toEqual(GLASS_CARDS.map((c) => c.id).sort());
  });

  it('normalizes legacy room card ids', () => {
    expect(normalizeRoomCardId('media')).toBe('media_player');
    expect(normalizeRoomCardId('light')).toBe('light');
  });
});
