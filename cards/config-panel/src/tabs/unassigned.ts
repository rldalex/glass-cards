import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import { resolveEntityAreaId } from '@glass-cards/base-card';
import type { GlassConfigPanel } from '../index';
import { CARD_ICONS, DOMAIN_I18N_KEYS } from '../types';

// — Types —

export interface EntityAreaEntry {
  entityId: string;
  name: string;
  domain: string;
  areaId: string | null;
  areaName: string | null;
}

/** Domains handled by Glass Cards controllable cards (in prod only). */
const CONTROLLABLE_DOMAINS = ['light', 'cover', 'fan', 'media_player', 'camera'];

// — Collect —

export function collectAllEntities(self: GlassConfigPanel): EntityAreaEntry[] {
  if (!self.hass) return [];
  const entities = self.hass.entities;
  const devices = self.hass.devices;
  const areas = self.hass.areas;
  const result: EntityAreaEntry[] = [];

  for (const entry of Object.values(entities)) {
    if (entry.disabled_by || entry.hidden_by) continue;
    const domain = entry.entity_id.split('.')[0];
    if (!CONTROLLABLE_DOMAINS.includes(domain)) continue;
    const areaId = resolveEntityAreaId(entry, devices);
    const state = self.hass.states[entry.entity_id];
    const name = (state?.attributes?.friendly_name as string) ?? entry.entity_id;
    const areaName = areaId ? (areas[areaId]?.name ?? null) : null;
    result.push({ entityId: entry.entity_id, name, domain, areaId, areaName });
  }

  // Unassigned first, then by domain order, then alphabetical
  result.sort((a, b) => {
    const aUnassigned = a.areaId ? 1 : 0;
    const bUnassigned = b.areaId ? 1 : 0;
    if (aUnassigned !== bUnassigned) return aUnassigned - bUnassigned;
    const di = CONTROLLABLE_DOMAINS.indexOf(a.domain) - CONTROLLABLE_DOMAINS.indexOf(b.domain);
    if (di !== 0) return di;
    return a.name.localeCompare(b.name);
  });

  return result;
}

// — Helpers —

function domainIcon(domain: string): string {
  return CARD_ICONS[domain] ?? 'mdi:help-circle';
}

function domainLabel(domain: string): string {
  const keys = DOMAIN_I18N_KEYS[domain as keyof typeof DOMAIN_I18N_KEYS];
  return keys ? t(keys.name) : domain;
}

// — Assign area —

export async function assignEntityArea(self: GlassConfigPanel, entityId: string, areaId: string) {
  if (!self.hass) return;
  try {
    await self.hass.connection.sendMessagePromise({
      type: 'config/entity_registry/update',
      entity_id: entityId,
      area_id: areaId,
    });
    self._unassignedEntities = self._unassignedEntities.map((e) =>
      e.entityId === entityId
        ? { ...e, areaId, areaName: self.hass?.areas[areaId]?.name ?? null }
        : e,
    );
    self._unassignedDropdownEntity = null;
    self._unassignedAreaSearch = '';
  } catch {
    self._showToast(true);
  }
}

// — Rename entity —

export async function renameEntity(self: GlassConfigPanel, entityId: string, newName: string) {
  if (!self.hass) return;
  const trimmed = newName.trim();
  if (!trimmed) return;
  // Find current name — skip if unchanged
  const current = self._unassignedEntities.find((e) => e.entityId === entityId);
  if (current && current.name === trimmed) {
    self._unassignedEditingEntity = null;
    return;
  }
  try {
    await self.hass.connection.sendMessagePromise({
      type: 'config/entity_registry/update',
      entity_id: entityId,
      name: trimmed,
    });
    self._unassignedEntities = self._unassignedEntities.map((e) =>
      e.entityId === entityId ? { ...e, name: trimmed } : e,
    );
  } catch {
    self._showToast(true);
  }
  self._unassignedEditingEntity = null;
}

// — Preview —

export function renderUnassignedPreview(_self: GlassConfigPanel) {
  return nothing;
}

// — Tab —

export function renderUnassignedTab(self: GlassConfigPanel) {
  if (!self.hass) return nothing;

  const entities = self._unassignedEntities;
  const areas = Object.values(self.hass.areas).sort((a, b) => a.name.localeCompare(b.name));
  const entitySearch = self._unassignedEntitySearch.toLowerCase();
  const areaSearch = self._unassignedAreaSearch.toLowerCase();

  // Filter entities by search
  const filtered = entitySearch
    ? entities.filter((e) =>
        e.name.toLowerCase().includes(entitySearch) ||
        e.entityId.toLowerCase().includes(entitySearch),
      )
    : entities;

  // Group by domain
  const grouped = new Map<string, EntityAreaEntry[]>();
  for (const e of filtered) {
    const list = grouped.get(e.domain) ?? [];
    list.push(e);
    grouped.set(e.domain, list);
  }

  const unassignedCount = entities.filter((e) => !e.areaId).length;

  // Filter areas by search in dropdown
  const filteredAreas = areaSearch
    ? areas.filter((a) => a.name.toLowerCase().includes(areaSearch))
    : areas;

  return html`
    <div class="tab-panel" id="panel-unassigned">
      <div class="section-label">${t('config.tab_unassigned')}</div>
      <div class="section-desc">${t('config.unassigned_desc')}</div>

      ${unassignedCount > 0 ? html`
        <div class="banner" style="color:var(--c-warning);">
          <ha-icon .icon=${'mdi:alert-circle-outline'}></ha-icon>
          <span>${t('config.unassigned_count', { count: String(unassignedCount) })}</span>
        </div>
      ` : nothing}

      ${entities.length === 0 ? html`
        <div class="banner">
          <ha-icon .icon=${'mdi:help-circle-outline'}></ha-icon>
          <span>${t('config.unassigned_no_entities')}</span>
        </div>
      ` : html`
        <!-- Entity search -->
        <input
          type="text"
          class="dropdown-search"
          style="width:100%;margin:8px 0;"
          placeholder="${t('config.search_entity')}"
          aria-label="${t('config.search_entity')}"
          .value=${self._unassignedEntitySearch}
          @input=${(e: InputEvent) => { self._unassignedEntitySearch = (e.target as HTMLInputElement).value; }}
        />

        ${filtered.length === 0 ? html`
          <div class="banner">
            <ha-icon .icon=${'mdi:magnify'}></ha-icon>
            <span>${t('config.unassigned_no_results')}</span>
          </div>
        ` : nothing}

        ${[...grouped.entries()].map(([domain, items]) => html`
          <div class="section-label" style="margin-top:16px;display:flex;align-items:center;">
            <ha-icon .icon=${domainIcon(domain)} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;margin-right:6px;"></ha-icon>
            ${domainLabel(domain)}
            <span style="margin-left:6px;font-size:11px;font-weight:500;color:var(--t3);">(${items.length})</span>
          </div>
          <div class="item-list">
            ${items.map((e) => {
              const isOpen = self._unassignedDropdownEntity === e.entityId;
              const isEditing = self._unassignedEditingEntity === e.entityId;
              return html`
                <div class="item-row">
                  <div class="item-info" style="flex:1;min-width:0;">
                    ${isEditing ? html`
                      <input
                        type="text"
                        class="entity-rename-input"
                        .value=${e.name}
                        aria-label="${t('config.unassigned_rename')}"
                        @blur=${(ev: FocusEvent) => self._renameEntity(e.entityId, (ev.target as HTMLInputElement).value)}
                        @keydown=${(ev: KeyboardEvent) => {
                          if (ev.key === 'Enter') (ev.target as HTMLInputElement).blur();
                          if (ev.key === 'Escape') { self._unassignedEditingEntity = null; }
                        }}
                        @focus=${(ev: FocusEvent) => (ev.target as HTMLInputElement).select()}
                      />
                    ` : html`
                      <button
                        class="item-name entity-name-btn"
                        @click=${() => {
                          self._unassignedEditingEntity = e.entityId;
                          self.updateComplete.then(() => {
                            const input = self.shadowRoot?.querySelector('.entity-rename-input') as HTMLInputElement | null;
                            input?.focus();
                          });
                        }}
                        title="${t('config.unassigned_rename')}"
                      >
                        ${e.name}
                        <ha-icon .icon=${'mdi:pencil'} style="--mdc-icon-size:11px;color:var(--t4);margin-left:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"></ha-icon>
                      </button>
                    `}
                    <span class="item-meta">${e.entityId}</span>
                  </div>
                  <div class="dropdown ${isOpen ? 'open' : ''}" style="flex-shrink:0;max-width:160px;">
                    <button
                      class="dropdown-trigger"
                      style="padding:4px 8px;font-size:11px;min-width:0;${!e.areaId ? 'color:var(--c-warning);' : ''}"
                      @click=${(ev: Event) => {
                        ev.stopPropagation();
                        self._unassignedAreaSearch = '';
                        self._unassignedDropdownEntity = isOpen ? null : e.entityId;
                      }}
                      aria-expanded=${isOpen ? 'true' : 'false'}
                      aria-haspopup="listbox"
                    >
                      <span style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.areaName ?? t('config.unassigned_select_area')}</span>
                      <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
                    </button>
                    <div class="dropdown-menu" role="listbox">
                      <input
                        type="text"
                        class="dropdown-search"
                        placeholder="${t('config.search_entity')}"
                        aria-label="${t('config.search_entity')}"
                        .value=${self._unassignedAreaSearch}
                        @input=${(ev: InputEvent) => { self._unassignedAreaSearch = (ev.target as HTMLInputElement).value; }}
                        @click=${(ev: Event) => ev.stopPropagation()}
                      />
                      ${filteredAreas.map((a) => html`
                        <button
                          class="dropdown-item ${a.area_id === e.areaId ? 'active' : ''}"
                          role="option"
                          aria-selected=${a.area_id === e.areaId ? 'true' : 'false'}
                          @click=${() => self._assignEntityArea(e.entityId, a.area_id)}
                        >
                          <ha-icon .icon=${a.icon || 'mdi:home'}></ha-icon>
                          ${a.name}
                        </button>
                      `)}
                    </div>
                  </div>
                </div>
              `;
            })}
          </div>
        `)}
      `}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._loadUnassignedEntities()}>${t('common.reset')}</button>
      </div>
    </div>
  `;
}
