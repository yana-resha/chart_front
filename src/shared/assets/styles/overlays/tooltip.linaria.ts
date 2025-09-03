import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { OVERLAYS_BACKGROUND_COLORS, OVERLAYS_TEXT_COLORS } from './colors'
import { MEDIA_POINTS } from '../media-points'

export const tooltipMaxWidth = 404
export const tooltipTailHeight = 16

export const TooltipSurface = styled.div`
  /* === БАЗА: как TooltipContentWrapper (десктопный пузырь) === */
  display: flex;
  flex-direction: column;
  width: max-content;
  max-width: ${tooltipMaxWidth}px;
  padding: 7px 12px;

  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: ${OVERLAYS_BACKGROUND_COLORS.WINDOW_BACK};

  font-size: 0.8rem;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.15px;
  color: ${OVERLAYS_TEXT_COLORS.CONTENT_COLOR};
  z-index: 999;

  /* === МОБИЛКА: как TooltipSheet (нижний шит) === */
  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    position: relative; /* для абсолютной кнопки закрытия */

    gap: 0px;

    width: 100%;
    max-width: 100%;
    max-height: 85vh;
    min-height: 30vh;
    overflow-y: hidden;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;

    border: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: none;
    border-radius: 16px 16px 0 0;

    padding: 0.5rem 0.8rem 0.8rem;
    box-shadow:
      0 -6px 24px rgba(255, 255, 255, 0.15),
      0 -2px 8px rgba(255, 255, 255, 0.05);

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
`
