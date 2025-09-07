import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { OVERLAYS_BACKGROUND_COLORS, OVERLAYS_TEXT_COLORS } from '@/shared/assets/styles/overlays/colors'
import { SURFACE_TOKENS } from '@/shared/assets/styles/overlays/shared'

export const TooltipSurface = styled.div`
  /* === БАЗА: как TooltipContentWrapper (десктопный пузырь) === */
  display: grid;
  grid-template-columns: 1fr 12px;
  align-items: start;
  gap: 5px;
  width: max-content;
  max-width: ${SURFACE_TOKENS.TOOLTIP.DESKTOP.TOOLTIP_MAX_WIDTH}px;
  padding: 7px 12px;

  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(0, 0, 0, 1);
  /* background: ${OVERLAYS_BACKGROUND_COLORS.WINDOW_BACK}; */

  font-size: 0.8rem;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.15px;
  color: ${OVERLAYS_TEXT_COLORS.CONTENT_COLOR};
  z-index: 999;

  /* === МОБИЛКА: как TooltipSheet (нижний шит) === */
  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    position: relative; /* для абсолютной кнопки закрытия */
    display: flex;
    flex-direction: column;
    align-items: start;
    background: ${SURFACE_TOKENS.MOBILE_SHARED.BACKGROUND};

    gap: ${SURFACE_TOKENS.MOBILE_SHARED.GAP};
    width: 100%;
    max-width: 100%;
    max-height: ${SURFACE_TOKENS.MOBILE_SHARED.MAXH};
    min-height: ${SURFACE_TOKENS.MOBILE_SHARED.MINH};
    overflow-y: hidden;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;

    border: ${SURFACE_TOKENS.MOBILE_SHARED.BORDER};
    border-bottom: none;
    border-radius: ${SURFACE_TOKENS.MOBILE_SHARED.RADIUS};

    padding: ${SURFACE_TOKENS.MOBILE_SHARED.PADDING};
    box-shadow: ${SURFACE_TOKENS.MOBILE_SHARED.SHADOW};

    line-height: 1.5;
  }
`

export const TooltipTailContainer = styled.div`
  width: 16px;
  height: 8px;
  pointer-events: none;
`

export const tooltipTailIconCSS = css`
  width: 100%;
  height: 100%;
  display: block;
  transform-origin: center;
  color: rgba(0, 0, 0, 1);
`

export const ClosedIcon = styled(SURFACE_TOKENS.CLOSED_ICON_COMPONENT)`
  width: 12px;
  height: 12px;
  color: ${SURFACE_TOKENS.CLOSED_ICON_COLOR};

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    width: ${SURFACE_TOKENS.MOBILE_SHARED.CLOSED_ICON_WIDTH};
    height: ${SURFACE_TOKENS.MOBILE_SHARED.CLOSED_ICON_WIDTH};
  }
`
