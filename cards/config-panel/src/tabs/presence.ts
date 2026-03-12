import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';

export function renderPresencePreview(self: GlassConfigPanel) {
  const persons = self._getAvailablePersonEntities();
  const selected = self._presencePersonEntities.length > 0
    ? persons.filter((p) => self._presencePersonEntities.includes(p.entityId))
    : persons;

  if (selected.length === 0) {
    return html`<div class="preview-empty">${t('config.presence_no_persons')}</div>`;
  }

  const homeCount = selected.filter((p) => {
    const entity = self.hass?.states[p.entityId];
    return entity?.state === 'home';
  }).length;

  return html`
    <div class="preview-presence">
      ${self._presenceShowHeader ? html`
        <div class="preview-presence-header">
          <span class="preview-presence-title">${t('presence.title')}</span>
          <span class="preview-presence-pill ${homeCount === selected.length ? 'all-home' : homeCount === 0 ? 'all-away' : 'mixed'}">
            ${homeCount}/${selected.length}
          </span>
        </div>
      ` : nothing}
      <div class="preview-presence-persons">
        ${selected.slice(0, 4).map((p) => {
          const entity = self.hass?.states[p.entityId];
          const isHome = entity?.state === 'home';
          const picture = entity?.attributes?.entity_picture as string | undefined;
          return html`
            <div class="preview-presence-person ${isHome ? 'home' : 'away'}">
              ${picture
                ? html`<div class="preview-presence-avatar" style="background-image:url(${picture})"></div>`
                : html`<div class="preview-presence-avatar fallback"><ha-icon .icon=${'mdi:account'}></ha-icon></div>`}
              <span class="preview-presence-name">${p.name}</span>
            </div>
          `;
        })}
      </div>
    </div>
  `;
}

export function renderPresenceTab(self: GlassConfigPanel) {
  const persons = self._getAvailablePersonEntities();
  const selectedPersons = self._presencePersonEntities.length > 0
    ? self._presencePersonEntities
    : persons.map((p) => p.entityId);
  const smartphoneSensors = self._getAvailableSmartphoneSensors();
  const drivingSensors = self._getAvailableDrivingSensors();
  const notifyServices = self._getAvailableNotifyServices();

  return html`
    <div class="tab-panel" id="panel-presence">
      <!-- Behaviour -->
      <div class="section-label">${t('config.navbar_behavior')}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${() => { self._presenceShowHeader = !self._presenceShowHeader; }}
        >
          <div class="feature-icon">
            <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${t('config.presence_show_header')}</div>
            <div class="feature-desc">${t('config.presence_show_header_desc')}</div>
          </div>
          <span
            class="toggle ${self._presenceShowHeader ? 'on' : ''}"
            role="switch"
            aria-checked=${self._presenceShowHeader ? 'true' : 'false'}
          ></span>
        </button>
      </div>

      <!-- Person entities -->
      <div class="section-label">${t('config.presence_persons')}</div>
      <div class="section-desc">${t('config.presence_persons_desc')}</div>

      ${persons.length === 0 ? html`
        <div class="preview-empty">${t('config.presence_no_persons')}</div>
      ` : html`
        <div class="item-list">
          ${persons.map((p) => {
            const selected = self._presencePersonEntities.includes(p.entityId);
            const autoMode = self._presencePersonEntities.length === 0;
            return html`
              <div class="item-row ${!selected && !autoMode ? 'disabled' : ''}">
                <div class="feature-icon">
                  <ha-icon .icon=${'mdi:account'}></ha-icon>
                </div>
                <div class="item-info">
                  <span class="item-name">${p.name}</span>
                  <span class="item-meta">${p.entityId}</span>
                </div>
                <button
                  class="toggle ${selected || autoMode ? 'on' : ''}"
                  @click=${() => self._togglePresencePerson(p.entityId)}
                  role="switch"
                  aria-checked=${(selected || autoMode) ? 'true' : 'false'}
                  aria-label="${p.name}"
                ></button>
              </div>
            `;
          })}
        </div>
      `}

      <!-- Per-person sensor mapping -->
      <div class="section-label">${t('config.presence_smartphone')}</div>
      <div class="section-desc">${t('config.presence_smartphone_desc')}</div>

      ${selectedPersons.map((personId) => {
        const person = persons.find((p) => p.entityId === personId);
        if (!person) return nothing;
        const currentSensor = self._presenceSmartphoneSensors[personId] || '';
        const currentNotify = self._presenceNotifyServices[personId] || '';
        const currentDriving = self._presenceDrivingSensors[personId] || '';
        const sensorName = smartphoneSensors.find((s) => s.entityId === currentSensor)?.name;
        const drivingName = drivingSensors.find((s) => s.entityId === currentDriving)?.name;
        const smKey = `${personId}:smartphone`;
        const notKey = `${personId}:notify`;
        const drvKey = `${personId}:driving`;

        return html`
          <div class="presence-mapping-card">
            <div class="presence-mapping-header">
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:account'}></ha-icon>
              </div>
              <span class="item-name">${person.name}</span>
            </div>

            <div class="presence-mapping-field">
              <label class="presence-mapping-label">${t('config.presence_smartphone')}</label>
              <div class="dropdown ${self._presenceDropdownOpen === smKey ? 'open' : ''}">
                <button
                  class="dropdown-trigger"
                  @click=${() => { self._presenceDropdownSearch = ''; self._presenceDropdownOpen = self._presenceDropdownOpen === smKey ? null : smKey; }}
                  aria-expanded=${self._presenceDropdownOpen === smKey ? 'true' : 'false'}
                  aria-haspopup="listbox"
                >
                  <ha-icon .icon=${'mdi:cellphone'}></ha-icon>
                  <span>${sensorName || currentSensor || t('config.presence_auto_detect')}</span>
                  <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
                </button>
                <div class="dropdown-menu" role="listbox">
                  <input
                    class="dropdown-search"
                    type="text"
                    placeholder=${t('config.search_entity')}
                    .value=${self._presenceDropdownOpen === smKey ? self._presenceDropdownSearch : ''}
                    @input=${(e: InputEvent) => { self._presenceDropdownSearch = (e.target as HTMLInputElement).value; }}
                    @click=${(e: Event) => e.stopPropagation()}
                  />
                  <button
                    class="dropdown-item ${!currentSensor ? 'active' : ''}"
                    role="option"
                    aria-selected=${!currentSensor ? 'true' : 'false'}
                    @click=${() => {
                      const sensors = { ...self._presenceSmartphoneSensors };
                      delete sensors[personId];
                      self._presenceSmartphoneSensors = sensors;
                      self._presenceDropdownOpen = null;
                    }}
                  >
                    <ha-icon .icon=${'mdi:auto-fix'}></ha-icon>
                    ${t('config.presence_auto_detect')}
                  </button>
                  ${smartphoneSensors
                    .filter((s) => !self._presenceDropdownSearch || s.name.toLowerCase().includes(self._presenceDropdownSearch.toLowerCase()) || s.entityId.toLowerCase().includes(self._presenceDropdownSearch.toLowerCase()))
                    .map((s) => html`
                    <button
                      class="dropdown-item ${currentSensor === s.entityId ? 'active' : ''}"
                      role="option"
                      aria-selected=${currentSensor === s.entityId ? 'true' : 'false'}
                      @click=${() => {
                        self._presenceSmartphoneSensors = { ...self._presenceSmartphoneSensors, [personId]: s.entityId };
                        self._presenceDropdownOpen = null;
                      }}
                    >
                      <ha-icon .icon=${'mdi:cellphone'}></ha-icon>
                      ${s.name}
                    </button>
                  `)}
                </div>
              </div>
            </div>

            <div class="presence-mapping-field">
              <label class="presence-mapping-label">${t('config.presence_notify')}</label>
              <div class="dropdown ${self._presenceDropdownOpen === notKey ? 'open' : ''}">
                <button
                  class="dropdown-trigger"
                  @click=${() => { self._presenceDropdownSearch = ''; self._presenceDropdownOpen = self._presenceDropdownOpen === notKey ? null : notKey; }}
                  aria-expanded=${self._presenceDropdownOpen === notKey ? 'true' : 'false'}
                  aria-haspopup="listbox"
                >
                  <ha-icon .icon=${'mdi:bell'}></ha-icon>
                  <span>${currentNotify || t('config.presence_auto_detect')}</span>
                  <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
                </button>
                <div class="dropdown-menu" role="listbox">
                  <input
                    class="dropdown-search"
                    type="text"
                    placeholder=${t('config.search_entity')}
                    .value=${self._presenceDropdownOpen === notKey ? self._presenceDropdownSearch : ''}
                    @input=${(e: InputEvent) => { self._presenceDropdownSearch = (e.target as HTMLInputElement).value; }}
                    @click=${(e: Event) => e.stopPropagation()}
                  />
                  <button
                    class="dropdown-item ${!currentNotify ? 'active' : ''}"
                    role="option"
                    aria-selected=${!currentNotify ? 'true' : 'false'}
                    @click=${() => {
                      const services = { ...self._presenceNotifyServices };
                      delete services[personId];
                      self._presenceNotifyServices = services;
                      self._presenceDropdownOpen = null;
                    }}
                  >
                    <ha-icon .icon=${'mdi:auto-fix'}></ha-icon>
                    ${t('config.presence_auto_detect')}
                  </button>
                  ${notifyServices
                    .filter((s) => !self._presenceDropdownSearch || s.toLowerCase().includes(self._presenceDropdownSearch.toLowerCase()))
                    .map((s) => html`
                    <button
                      class="dropdown-item ${currentNotify === s ? 'active' : ''}"
                      role="option"
                      aria-selected=${currentNotify === s ? 'true' : 'false'}
                      @click=${() => {
                        self._presenceNotifyServices = { ...self._presenceNotifyServices, [personId]: s };
                        self._presenceDropdownOpen = null;
                      }}
                    >
                      <ha-icon .icon=${'mdi:bell'}></ha-icon>
                      ${s}
                    </button>
                  `)}
                </div>
              </div>
            </div>

            <div class="presence-mapping-field">
              <label class="presence-mapping-label">${t('config.presence_driving')}</label>
              <div class="dropdown ${self._presenceDropdownOpen === drvKey ? 'open' : ''}">
                <button
                  class="dropdown-trigger"
                  @click=${() => { self._presenceDropdownSearch = ''; self._presenceDropdownOpen = self._presenceDropdownOpen === drvKey ? null : drvKey; }}
                  aria-expanded=${self._presenceDropdownOpen === drvKey ? 'true' : 'false'}
                  aria-haspopup="listbox"
                >
                  <ha-icon .icon=${'mdi:car'}></ha-icon>
                  <span>${drivingName || currentDriving || t('config.presence_auto_detect')}</span>
                  <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
                </button>
                <div class="dropdown-menu" role="listbox">
                  <input
                    class="dropdown-search"
                    type="text"
                    placeholder=${t('config.search_entity')}
                    .value=${self._presenceDropdownOpen === drvKey ? self._presenceDropdownSearch : ''}
                    @input=${(e: InputEvent) => { self._presenceDropdownSearch = (e.target as HTMLInputElement).value; }}
                    @click=${(e: Event) => e.stopPropagation()}
                  />
                  <button
                    class="dropdown-item ${!currentDriving ? 'active' : ''}"
                    role="option"
                    aria-selected=${!currentDriving ? 'true' : 'false'}
                    @click=${() => {
                      const sensors = { ...self._presenceDrivingSensors };
                      delete sensors[personId];
                      self._presenceDrivingSensors = sensors;
                      self._presenceDropdownOpen = null;
                    }}
                  >
                    <ha-icon .icon=${'mdi:auto-fix'}></ha-icon>
                    ${t('config.presence_auto_detect')}
                  </button>
                  ${drivingSensors
                    .filter((s) => !self._presenceDropdownSearch || s.name.toLowerCase().includes(self._presenceDropdownSearch.toLowerCase()) || s.entityId.toLowerCase().includes(self._presenceDropdownSearch.toLowerCase()))
                    .map((s) => html`
                    <button
                      class="dropdown-item ${currentDriving === s.entityId ? 'active' : ''}"
                      role="option"
                      aria-selected=${currentDriving === s.entityId ? 'true' : 'false'}
                      @click=${() => {
                        self._presenceDrivingSensors = { ...self._presenceDrivingSensors, [personId]: s.entityId };
                        self._presenceDropdownOpen = null;
                      }}
                    >
                      <ha-icon .icon=${'mdi:car'}></ha-icon>
                      ${s.name}
                    </button>
                  `)}
                </div>
              </div>
            </div>
          </div>
        `;
      })}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._loadPresenceConfig()}>${t('common.reset')}</button>
      </div>
    </div>
  `;
}

export function getAvailablePersonEntities(self: GlassConfigPanel): { entityId: string; name: string }[] {
  if (!self.hass) return [];
  return Object.keys(self.hass.states)
    .filter((id) => id.startsWith('person.'))
    .map((id) => {
      const entity = self.hass!.states[id];
      const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1];
      return { entityId: id, name };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAvailableSmartphoneSensors(self: GlassConfigPanel): { entityId: string; name: string }[] {
  if (!self.hass) return [];
  return Object.keys(self.hass.states)
    .filter((id) => id.startsWith('sensor.') && (
      id.includes('phone') || id.includes('mobile') || id.includes('smartphone') ||
      id.includes('tablet') || id.includes('iphone') || id.includes('galaxy') ||
      id.includes('pixel') || id.includes('oneplus')
    ))
    .map((id) => {
      const entity = self.hass!.states[id];
      const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1];
      return { entityId: id, name };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAvailableDrivingSensors(self: GlassConfigPanel): { entityId: string; name: string }[] {
  if (!self.hass) return [];
  return Object.keys(self.hass.states)
    .filter((id) => id.startsWith('binary_sensor.'))
    .map((id) => {
      const entity = self.hass!.states[id];
      const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1];
      return { entityId: id, name };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAvailableNotifyServices(self: GlassConfigPanel): string[] {
  if (!self.hass) return [];
  const services = (self.hass as unknown as Record<string, unknown>).services as Record<string, Record<string, unknown>> | undefined;
  return Object.keys(services?.notify ?? {}).map((s) => `notify.${s}`).sort();
}

export function togglePresencePerson(self: GlassConfigPanel, entityId: string) {
  const persons = self._getAvailablePersonEntities();
  const autoMode = self._presencePersonEntities.length === 0;

  if (autoMode) {
    // Switching from auto to manual: select all except the toggled one
    self._presencePersonEntities = persons
      .map((p) => p.entityId)
      .filter((id) => id !== entityId);
  } else {
    const set = new Set(self._presencePersonEntities);
    if (set.has(entityId)) {
      // Don't allow deselecting the last person — return to auto mode instead
      if (set.size <= 1) {
        self._presencePersonEntities = [];
        return;
      }
      set.delete(entityId);
    } else {
      set.add(entityId);
    }
    self._presencePersonEntities = [...set];
  }
}
