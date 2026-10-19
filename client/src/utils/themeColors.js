/**
 * Curated Note Theme Colors
 * Supports dynamic adaptation between Light and Dark application themes
 */
export const NOTE_THEME_COLORS = [
  {
    id: 'default',
    name: 'Default',
    colorHex: '#ffffff',
    lightBg: '#ffffff',
    darkBg: 'rgba(30, 41, 59, 0.75)',
    border: '#e2e8f0',
    darkBorder: 'rgba(255, 255, 255, 0.1)',
    dot: '#94a3b8',
  },
  {
    id: 'lemon',
    name: 'Lemon Cream',
    colorHex: '#fef9c3',
    lightBg: '#fef9c3',
    darkBg: '#392209',
    border: '#fde047',
    darkBorder: '#78350f',
    dot: '#eab308',
  },
  {
    id: 'mint',
    name: 'Soft Mint',
    colorHex: '#dcfce7',
    lightBg: '#dcfce7',
    darkBg: '#0a321d',
    border: '#86efac',
    darkBorder: '#14532d',
    dot: '#22c55e',
  },
  {
    id: 'sky',
    name: 'Sky Blue',
    colorHex: '#e0f2fe',
    lightBg: '#e0f2fe',
    darkBg: '#082f49',
    border: '#7dd3fc',
    darkBorder: '#0369a1',
    dot: '#0ea5e9',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    colorHex: '#f3e8ff',
    lightBg: '#f3e8ff',
    darkBg: '#33134d',
    border: '#d8b4fe',
    darkBorder: '#6b21a8',
    dot: '#a855f7',
  },
  {
    id: 'peach',
    name: 'Peach Coral',
    colorHex: '#ffedd5',
    lightBg: '#ffedd5',
    darkBg: '#3d1c0e',
    border: '#fed7aa',
    darkBorder: '#7c2d12',
    dot: '#f97316',
  },
  {
    id: 'rose',
    name: 'Soft Rose',
    colorHex: '#ffe4e6',
    lightBg: '#ffe4e6',
    darkBg: '#441221',
    border: '#fecdd3',
    darkBorder: '#881337',
    dot: '#f43f5e',
  },
  {
    id: 'slate',
    name: 'Slate Grey',
    colorHex: '#f1f5f9',
    lightBg: '#f1f5f9',
    darkBg: '#1e293b',
    border: '#cbd5e1',
    darkBorder: '#475569',
    dot: '#64748b',
  },
];

export const getThemeColorConfig = (colorHex) => {
  if (!colorHex) return NOTE_THEME_COLORS[0];
  const found = NOTE_THEME_COLORS.find(
    (c) => c.colorHex.toLowerCase() === colorHex.toLowerCase() || c.id === colorHex
  );
  return found || NOTE_THEME_COLORS[0];
};
