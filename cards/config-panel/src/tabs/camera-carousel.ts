import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';

// — Preview —

export function renderCameraCarouselPreview(_self: GlassConfigPanel) {
  const camColor = 'rgba(96,165,250,';

  // Mock cameras for preview
  const mockCams = [
    { name: 'Entrée', state: 'streaming', icon: 'mdi:cctv', ai: ['person'] },
    { name: 'Jardin', state: 'recording', icon: 'mdi:cctv', ai: ['vehicle'] },
    { name: 'Garage', state: 'idle', icon: 'mdi:webcam', ai: [] },
  ];

  const current = mockCams[0];
  const isLive = current.state !== 'idle';

  return html`
    <div style="padding:10px;">
      <!-- Viewport -->
      <div style="position:relative;width:100%;aspect-ratio:16/9;border-radius:10px;overflow:hidden;background:#0a0f18;border:1px solid var(--b1);margin-bottom:8px;">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 25% 35%,rgba(40,60,90,0.4) 0%,transparent 40%),radial-gradient(circle at 65% 55%,rgba(30,50,70,0.3) 0%,transparent 45%),linear-gradient(135deg,#141e2e 0%,#0d1520 40%,#111a28 100%);">
          <!-- Top overlay -->
          <div style="position:absolute;top:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:5px 7px;background:linear-gradient(180deg,rgba(0,0,0,0.5) 0%,transparent 100%);">
            <div style="font-size:7px;font-weight:600;color:rgba(255,255,255,0.7);display:flex;align-items:center;gap:3px;">
              <ha-icon .icon=${'mdi:cctv'} style="--mdc-icon-size:8px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${current.name}
              <span style="display:inline-flex;align-items:center;gap:2px;font-size:6px;font-weight:700;color:var(--c-alert);">
                <span style="width:4px;height:4px;border-radius:50%;background:var(--c-alert);"></span> REC
              </span>
            </div>
          </div>
          <!-- Bottom overlay -->
          ${current.ai.length > 0 ? html`
            <div style="position:absolute;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:flex-end;padding:5px 7px;background:linear-gradient(0deg,rgba(0,0,0,0.5) 0%,transparent 100%);">
              <div style="display:flex;gap:3px;">
                ${current.ai.map((ai) => html`
                  <div style="display:inline-flex;align-items:center;gap:2px;padding:1px 4px;border-radius:4px;font-size:6px;font-weight:600;background:${camColor}0.15);color:#60a5fa;border:1px solid ${camColor}0.2);">
                    <ha-icon .icon=${'mdi:human'} style="--mdc-icon-size:7px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                    ${ai}
                  </div>
                `)}
              </div>
            </div>
          ` : nothing}
          <!-- Nav arrows -->
          <div style="position:absolute;top:50%;left:4px;transform:translateY(-50%);width:18px;height:18px;border-radius:50%;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;">
            <ha-icon .icon=${'mdi:chevron-left'} style="--mdc-icon-size:12px;color:rgba(255,255,255,0.6);display:flex;align-items:center;justify-content:center;"></ha-icon>
          </div>
          <div style="position:absolute;top:50%;right:4px;transform:translateY(-50%);width:18px;height:18px;border-radius:50%;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;">
            <ha-icon .icon=${'mdi:chevron-right'} style="--mdc-icon-size:12px;color:rgba(255,255,255,0.6);display:flex;align-items:center;justify-content:center;"></ha-icon>
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div style="display:flex;align-items:center;justify-content:center;gap:4px;margin-bottom:6px;">
        <div style="width:14px;height:5px;border-radius:3px;background:#60a5fa;box-shadow:0 0 6px ${camColor}0.4);"></div>
        <div style="width:5px;height:5px;border-radius:50%;background:var(--c-alert);box-shadow:0 0 4px rgba(248,113,113,0.5);"></div>
        <div style="width:5px;height:5px;border-radius:50%;background:var(--t4);"></div>
      </div>

      <!-- Info bar -->
      <div style="display:flex;align-items:center;gap:7px;padding:0 2px;margin-bottom:6px;">
        <div style="width:22px;height:22px;border-radius:7px;background:${camColor}0.1);border:1px solid ${camColor}0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <ha-icon .icon=${'mdi:cctv'} style="--mdc-icon-size:12px;color:#60a5fa;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${current.name}</div>
          <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
            <span style="font-size:7px;font-weight:500;color:${isLive ? `${camColor}0.6)` : 'var(--t3)'};">${isLive ? 'En direct' : 'Veille'}</span>
            ${current.ai.length > 0 ? html`
              <div style="display:flex;gap:2px;align-items:center;">
                <div style="width:12px;height:12px;border-radius:4px;background:${camColor}0.12);display:flex;align-items:center;justify-content:center;">
                  <ha-icon .icon=${'mdi:human'} style="--mdc-icon-size:8px;color:#60a5fa;display:flex;align-items:center;justify-content:center;"></ha-icon>
                </div>
              </div>
            ` : nothing}
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div style="display:flex;gap:4px;flex-wrap:wrap;">
        ${['mdi:power', 'mdi:camera', 'mdi:record-circle', 'mdi:motion-sensor'].map((icon, i) => html`
          <div style="display:inline-flex;align-items:center;gap:3px;padding:3px 7px;border-radius:6px;border:1px solid ${i === 0 ? `${camColor}0.15)` : 'var(--b2)'};background:${i === 0 ? `${camColor}0.1)` : 'var(--s1)'};font-size:8px;font-weight:600;color:${i === 0 ? '#60a5fa' : 'var(--t3)'};">
            <ha-icon .icon=${icon} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          </div>
        `)}
      </div>
    </div>
  `;
}

// — Tab —

export function renderCameraCarouselTab(self: GlassConfigPanel) {
  return html`
    <div class="tab-content">
      <!-- Show header toggle -->
      <button class="feature-row" role="switch" aria-checked="${self._cameraShowHeader ? 'true' : 'false'}"
        @click=${() => { self._cameraShowHeader = !self._cameraShowHeader; }}>
        <ha-icon class="feature-icon" .icon=${'mdi:page-layout-header'}></ha-icon>
        <div class="feature-text">
          <div class="feature-label">${t('config.camera_show_header')}</div>
          <div class="feature-desc">${t('config.camera_show_header_desc')}</div>
        </div>
        <span class="toggle ${self._cameraShowHeader ? 'on' : ''}"><span class="toggle-thumb"></span></span>
      </button>

      <!-- Auto cycle toggle -->
      <button class="feature-row" role="switch" aria-checked="${self._cameraAutoCycle ? 'true' : 'false'}"
        @click=${() => { self._cameraAutoCycle = !self._cameraAutoCycle; }}>
        <ha-icon class="feature-icon" .icon=${'mdi:autorenew'}></ha-icon>
        <div class="feature-text">
          <div class="feature-label">${t('config.camera_auto_cycle')}</div>
          <div class="feature-desc">${t('config.camera_auto_cycle_desc')}</div>
        </div>
        <span class="toggle ${self._cameraAutoCycle ? 'on' : ''}"><span class="toggle-thumb"></span></span>
      </button>

      ${self._cameraAutoCycle ? html`
        <!-- Cycle interval -->
        <div class="feature-row" style="pointer-events:none;">
          <ha-icon class="feature-icon" .icon=${'mdi:timer-outline'}></ha-icon>
          <div class="feature-text">
            <div class="feature-label">${t('config.camera_cycle_interval')}</div>
            <div class="feature-desc">${t('config.camera_cycle_interval_desc')}</div>
          </div>
          <input class="input" type="number" min="3" max="60" style="width:60px;pointer-events:auto;text-align:center;"
            .value=${String(self._cameraCycleInterval)}
            @change=${(e: Event) => {
              const val = parseInt((e.target as HTMLInputElement).value, 10);
              if (!isNaN(val) && val >= 3 && val <= 60) {
                self._cameraCycleInterval = val;
              }
            }}
          />
        </div>
      ` : nothing}

      <!-- Save / Reset -->
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button class="btn btn-sm btn-accent" ?disabled=${self._saving}
          @click=${() => self._save()}>
          ${self._saving ? t('common.saving') : t('common.save')}
        </button>
        <button class="btn btn-sm btn-ghost"
          @click=${() => self._loadCameraCarouselConfig()}>
          ${t('common.reset')}
        </button>
      </div>
    </div>
  `;
}
