import { describe, it, expect } from 'vitest';
import {
  getImage, getArtistNames, typeIcon, formatTime, typeBadgeKey,
  type SpotifyItem,
} from '../../cards/spotify-card/src/spotify-utils';

describe('getImage', () => {
  const item = {
    id: 'x', name: 'X',
    images: [
      { url: 'big.jpg', width: 640, height: 640 },
      { url: 'mid.jpg', width: 300, height: 300 },
      { url: 'small.jpg', width: 64, height: 64 },
    ],
  } as unknown as SpotifyItem;

  it('picks the smallest image at least as large as requested', () => {
    expect(getImage(item, 64)).toBe('small.jpg');
    expect(getImage(item, 300)).toBe('mid.jpg');
    expect(getImage(item, 500)).toBe('big.jpg');
  });

  it('returns empty string when no images', () => {
    expect(getImage({ id: 'x', name: 'X' } as SpotifyItem)).toBe('');
    expect(getImage(null)).toBe('');
  });
});

describe('getArtistNames', () => {
  it('joins artist names', () => {
    const item = { id: 'x', name: 'X', artists: [{ name: 'A' }, { name: 'B' }] } as unknown as SpotifyItem;
    expect(getArtistNames(item)).toBe('A, B');
    expect(getArtistNames({ id: 'x', name: 'X' } as SpotifyItem)).toBe('');
  });
});

describe('typeIcon / typeBadgeKey', () => {
  it('maps known types and falls back', () => {
    expect(typeIcon('playlist')).toBe('mdi:playlist-music');
    expect(typeIcon('show')).toBe('mdi:podcast');
    expect(typeBadgeKey('track')).toContain('track');
  });
});

describe('formatTime', () => {
  it('formats milliseconds-agnostic seconds as m:ss', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(125)).toBe('2:05');
  });
});
