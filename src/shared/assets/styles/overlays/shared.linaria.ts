import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '../media-points'
import { OVERLAYS_BACKGROUND_COLORS } from './colors'

export const OverlayVeil = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`
export const OverlayHeader = styled.div`
  display: flex;
  justify-content: space-between; /* прижимаем вправо */
  align-items: flex-start;

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between; /* прижимаем вправо */
  }
`
export const OverlayContentWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  width: 100%;
`

export const MobileWindowSurface = css`
  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    position: relative;
    width: 100%;
    max-width: 100%;
    max-height: 85vh;
    min-height: 30vh;
    overflow-y: hidden;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;

    gap: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: none;
    border-radius: 16px 16px 0 0;
    background: ${OVERLAYS_BACKGROUND_COLORS.WINDOW_BACK};

    padding: 1rem 1rem 1rem;
    box-shadow:
      0 -6px 24px rgba(255, 255, 255, 0.15),
      0 -2px 8px rgba(255, 255, 255, 0.05);

    line-height: 1.5;
  }
`
