import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '../media-points'
import ClosedSVG from '@/shared/assets/icons/cross.svg?react'

export const OverlayVeil = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  display: none;
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
    justify-content: flex-end; /* прижимаем вправо */
  }
`

export const OverlayClosedIcon = styled(ClosedSVG)`
  width: 12px;
  height: 12px;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    width: 12px;
    height: 12px;
  }
`
export const OverlayContentWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  width: 100%;
`
