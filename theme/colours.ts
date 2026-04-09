const brand = {
  primary: '#3DBCC6',
  success: '#16A34A',
  danger: '#E11D48',
  warning: '#F59E0B',
} as const;

export const lightColors = {
  // Layout surfaces
  bg: '#F6F7FB',
  surface: '#F9FAFB',
  surface2: '#F0F3FA',

  // Typography
  text: '#0F172A',
  text2: '#334155',
  muted: '#64748B',

  // Borders and overlays
  border: 'rgba(15,23,42,0.10)',
  overlay: 'rgba(15,23,42,0.48)',

  // Semantic accents
  primary: brand.primary,
  primarySoft: 'rgba(61,188,198,0.14)',
  success: brand.success,
  successSoft: 'rgba(22,163,74,0.12)',
  danger: brand.danger,
  dangerSoft: 'rgba(225,29,72,0.12)',
  warning: brand.warning,
  warningSoft: 'rgba(245,158,11,0.12)',

  white: '#FFFFFF',
  black: '#020617',
};

export const darkColors = {
  // Layout surfaces
  bg: '#0B1020',
  surface: '#121A2F',
  surface2: '#172142',

  // Typography
  text: '#E9ECF5',
  text2: '#B8C0D9',
  muted: '#7E8AAF',

  // Borders and overlays
  border: 'rgba(233,236,245,0.10)',
  overlay: 'rgba(2,6,23,0.64)',

  // Semantic accents
  primary: brand.primary,
  primarySoft: 'rgba(61,188,198,0.20)',
  success: brand.success,
  successSoft: 'rgba(22,163,74,0.20)',
  danger: brand.danger,
  dangerSoft: 'rgba(225,29,72,0.22)',
  warning: brand.warning,
  warningSoft: 'rgba(245,158,11,0.20)',

  white: '#FFFFFF',
  black: '#020617',
};

export type ThemeColors = typeof lightColors;
