import { html } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';

export function renderMediaPreview(_self: GlassConfigPanel) {
  return html`
    <div class="media-preview">
      <!-- Simulated full-bleed artwork background -->
      <div class="mp-art-bg"></div>
      <div class="mp-gradient"></div>
      <div class="mp-content">
        <!-- Top bar: glass pill badges -->
        <div class="mp-top">
          <div class="mp-pill">
            <ha-icon .icon=${'mdi:speaker'}></ha-icon>
            <span>Salon</span>
            <div class="mp-eq">
              <div class="mp-eq-bar"></div>
              <div class="mp-eq-bar"></div>
              <div class="mp-eq-bar"></div>
            </div>
          </div>
          <div class="mp-pill">
            <ha-icon .icon=${'mdi:speaker-multiple'}></ha-icon>
            <span>2</span>
          </div>
        </div>
        <!-- Spacer -->
        <div class="mp-spacer"></div>
        <!-- Bottom glass panel -->
        <div class="mp-glass-panel">
          <div class="mp-track">
            <div class="mp-track-title">Blinding Lights</div>
            <div class="mp-track-artist">The Weeknd</div>
            <div class="mp-track-meta">
              <span class="mp-track-time">2:14 / 3:20</span>
              <span class="mp-track-source">Spotify</span>
            </div>
          </div>
          <!-- Progress -->
          <div class="mp-progress">
            <div class="mp-progress-fill"></div>
          </div>
          <!-- Transport -->
          <div class="mp-transport">
            <div class="mp-btn"><ha-icon .icon=${'mdi:shuffle-variant'}></ha-icon></div>
            <div class="mp-btn skip"><ha-icon .icon=${'mdi:skip-previous'}></ha-icon></div>
            <div class="mp-btn main"><ha-icon .icon=${'mdi:pause'}></ha-icon></div>
            <div class="mp-btn skip"><ha-icon .icon=${'mdi:skip-next'}></ha-icon></div>
            <div class="mp-btn"><ha-icon .icon=${'mdi:repeat'}></ha-icon></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderMediaTab(self: GlassConfigPanel) {
  return html`
    <div class="tab-panel" id="panel-media">
      <!-- Show header toggle -->
      <button
        class="feature-row"
        @click=${() => { self._mediaShowHeader = !self._mediaShowHeader; }}
      >
        <div class="feature-icon">
          <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
        </div>
        <div class="feature-text">
          <div class="feature-name">${t('config.media_show_header')}</div>
          <div class="feature-desc">${t('config.media_show_header_desc')}</div>
        </div>
        <span
          class="toggle ${self._mediaShowHeader ? 'on' : ''}"
          role="switch"
          aria-checked=${self._mediaShowHeader ? 'true' : 'false'}
        ></span>
      </button>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._loadMediaConfig()}>${t('common.reset')}</button>
        <button
          class="btn btn-accent"
          @click=${() => self._save()}
          ?disabled=${self._saving}
        >
          ${self._saving ? t('common.saving') : t('common.save')}
        </button>
      </div>
    </div>
  `;
}
