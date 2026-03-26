/** Card-width breakpoints for ResizeObserver-driven responsive layout. */
export const BREAKPOINTS = {
  xs: 280,
  sm: 360,
  md: 480,
  lg: 600,
  xl: 800,
} as const;

export type CardSize = keyof typeof BREAKPOINTS;
