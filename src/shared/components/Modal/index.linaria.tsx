import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { OVERLAYS_BACKGROUND_COLORS } from '@/shared/assets/styles/overlays/colors'
import { SURFACE_TOKENS } from '@/shared/assets/styles/overlays/shared'

export const ModalVeil = styled.div`
  position: fixed;
  inset: 0;
  background: ${OVERLAYS_BACKGROUND_COLORS.VEIL_BACK};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  /* <= TABLET_SMALL — контейнер для bottom-sheet */
  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    justify-content: flex-end;
    align-items: flex-end;
  }
`

export const ModalWindow = styled.div`
  background: ${OVERLAYS_BACKGROUND_COLORS.WINDOW_BACK};
  border-radius: 15px;
  position: relative;
  z-index: 1001;
  min-width: 0;
  min-height: 0;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  padding: 1.875rem;
  padding-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: ${OVERLAYS_BACKGROUND_COLORS.WINDOW_MOBILE_SHADOW};

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    padding: 1.5rem;
    padding-top: 0.8rem;
  }
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding: 1.3rem;
    padding-top: 0.7rem;
  }
  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    width: 100%;
    max-width: 100%;
    border-radius: ${SURFACE_TOKENS.MOBILE_SHARED.RADIUS};
    border-bottom: none;
    box-shadow: ${SURFACE_TOKENS.MOBILE_SHARED.SHADOW};
    padding: ${SURFACE_TOKENS.MOBILE_SHARED.PADDING};
    max-height: ${SURFACE_TOKENS.MOBILE_SHARED.MAXH};
    min-height: ${SURFACE_TOKENS.MOBILE_SHARED.MINH};
  }
`

export const CrossIcon = styled(SURFACE_TOKENS.CLOSED_ICON_COMPONENT)`
  width: 20px;
  height: 20px;
  color: ${SURFACE_TOKENS.CLOSED_ICON_COLOR};

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    width: 18px;
    height: 18px;
  }

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    width: ${SURFACE_TOKENS.MOBILE_SHARED.CLOSED_ICON_WIDTH};
    height: ${SURFACE_TOKENS.MOBILE_SHARED.CLOSED_ICON_WIDTH};
  }
`
