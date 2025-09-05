export enum OVERLAYS_BACKGROUND_COLORS {
  WINDOW_BACK = `radial-gradient(120% 80% at 50% -10%, rgba(255, 255, 255, 0.06) 0%, transparent 60%),rgba(18, 20, 26, 0.92)`,
  VEIL_BACK = 'rgba(0, 0, 0, 0.5)',
  WINDOW_DESKTOP_SHADOW = `0 0 12px rgba(255, 255, 255, 0.06),
    0 0 24px rgba(255, 255, 255, 0.05),
    0 0 48px rgba(255, 255, 255, 0.04)`,
  WINDOW_MOBILE_SHADOW = `
  0 -6px 24px rgba(255, 255, 255, 0.15),
      0 -2px 8px rgba(255, 255, 255, 0.05);
  `,
}

export enum OVERLAYS_TEXT_COLORS {
  CONTENT_COLOR = 'rgba(255, 255, 255, 0.85)',
}
