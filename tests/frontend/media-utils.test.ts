import { describe, it, expect } from 'vitest';
import {
  F_PAUSE, F_VOLUME_SET, getMediaInfo, isPlaying, isActive, formatTime, hasFeature,
} from '../../cards/media-card/src/media-utils';
import type { HassEntity } from '@glass-cards/base-card';

function entity(state: string, attributes: Record<string, unknown> = {}): HassEntity {
  return { entity_id: 'media_player.test', state, attributes, last_updated: '2026-06-10T12:00:00Z' } as HassEntity;
}

describe('state predicates', () => {
  it('isPlaying covers playing and buffering only', () => {
    expect(isPlaying('playing')).toBe(true);
    expect(isPlaying('buffering')).toBe(true);
    expect(isPlaying('paused')).toBe(false);
  });

  it('isActive adds paused', () => {
    expect(isActive('paused')).toBe(true);
    expect(isActive('idle')).toBe(false);
    expect(isActive('off')).toBe(false);
  });
});

describe('formatTime', () => {
  it('formats seconds as m:ss', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(65)).toBe('1:05');
    expect(formatTime(3599)).toBe('59:59');
  });
});

describe('getMediaInfo', () => {
  it('reads track, volume, features and group members', () => {
    const info = getMediaInfo(entity('playing', {
      friendly_name: 'Salon',
      media_title: 'Song',
      media_artist: 'Artist',
      volume_level: 0.45,
      supported_features: F_PAUSE | F_VOLUME_SET,
      group_members: ['media_player.test', 'media_player.cuisine'],
      media_duration: 200,
      media_position: 30,
    }));
    expect(info).toMatchObject({
      name: 'Salon', title: 'Song', artist: 'Artist', volume: 0.45,
      groupMembers: ['media_player.test', 'media_player.cuisine'],
      duration: 200, elapsed: 30,
    });
    expect(hasFeature(info, F_PAUSE)).toBe(true);
    expect(hasFeature(info, 2048)).toBe(false);
  });

  it('applies safe defaults on a bare entity', () => {
    const info = getMediaInfo(entity('idle'));
    expect(info).toMatchObject({
      title: '', volume: 0, isMuted: false, features: 0,
      groupMembers: [], sourceList: [], duration: 0, repeat: 'off',
      icon: 'mdi:speaker',
    });
  });

  it('parses media_position_updated_at into epoch seconds', () => {
    const info = getMediaInfo(entity('playing', { media_position_updated_at: '2026-06-10T12:00:00Z' }));
    expect(info.positionUpdatedAt).toBe(new Date('2026-06-10T12:00:00Z').getTime() / 1000);
  });
});
