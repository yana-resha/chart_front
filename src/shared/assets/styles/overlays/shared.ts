import { OVERLAYS_BACKGROUND_COLORS } from './colors'
import ClosedSVG from '@/shared/assets/icons/cross.svg?react'

export const SURFACE_TOKENS = {
  CLOSED_ICON_COMPONENT: ClosedSVG,
  CLOSED_ICON_COLOR: `rgba(255, 255, 255, 1)`,
  TOOLTIP: {
    DESKTOP: {
      TOOLTIP_MAX_WIDTH: 404,
    },
  },
  MOBILE_SHARED: {
    PADDING: '1rem 1rem 1rem',
    RADIUS: '16px 16px 0 0',
    BORDER: '1px solid rgba(255, 255, 255, 0.08)',
    SHADOW: `${OVERLAYS_BACKGROUND_COLORS.WINDOW_MOBILE_SHADOW}`,
    BACKGROUND: `${OVERLAYS_BACKGROUND_COLORS.WINDOW_BACK}`,
    GAP: '1rem',
    MAXH: '90%',
    MINH: '45%',
    CLOSED_ICON_WIDTH: '1rem',
    CLOSED_ICON_HEIGHT: '1rem',
  },
}
