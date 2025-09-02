import { styled } from '@linaria/react'

import ExitCross from '@/shared/assets/icons/cross.svg?react'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const ModalVeil = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
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
  background:
    radial-gradient(120% 80% at 50% -10%, rgba(255, 255, 255, 0.06) 0%, transparent 60%),
    rgba(18, 20, 26, 0.92);
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
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 0 12px rgba(255, 255, 255, 0.06),
    0 0 24px rgba(255, 255, 255, 0.05),
    0 0 48px rgba(255, 255, 255, 0.04);

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    padding: 1.5rem;
  }
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding: 1.3rem;
  }
  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    width: 100%;
    max-width: 100%;
    border-radius: 16px 16px 0 0;
    border-bottom: none;
    box-shadow:
      0 -6px 24px rgba(255, 255, 255, 0.15),
      0 -2px 8px rgba(255, 255, 255, 0.05);
    padding: 1rem 1rem 1rem;
    max-height: 85vh;
  }
`

export const CrossIcon = styled(ExitCross)`
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 1);

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    width: 18px;
    height: 18px;
  }
`
