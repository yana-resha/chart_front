import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { OverlayContentWrapper } from '@/shared/assets/styles/overlays/shared.linaria'

export const modal = css`
  width: 550px;
  position: relative;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    width: 500px;
  }
`

export const IconContainer = styled.div`
  cursor: default;
  display: flex;
`

export const ModalIcon = css`
  svg {
    width: 5rem;
    height: 5rem;

    @media (max-width: ${MEDIA_POINTS.TABLET}px) {
      width: 4rem;
      height: 4rem;
    }

    @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
      width: 5rem;
      height: 5rem;
    }
  }
`

export const ContentContainer = styled(OverlayContentWrapper)`
  display: flex;
  flex-direction: column;

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    margin-top: auto !important;
  }
`

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.875rem;
`

export const ModalTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 1rem;
  color: white;
  text-align: center;

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    font-size: 1.25rem;
    margin-top: 1rem;
  }
`

export const ModalSubtitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.15px;
  color: rgb(155, 156, 158);
  margin-top: 1rem;
  text-align: center;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-weight: 400;
    margin-top: 0.5rem;
  }

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    font-weight: 500;
    margin-top: 1rem;
  }
`

export const ButtonsContainer = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  justify-content: center;
  width: fit-content;
  align-self: center;

  /* Если только одна кнопка */
  &:has(> :only-child) {
    display: flex;
    justify-content: center;
  }

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
    width: 100%;
    gap: 0.7rem;
  }
`
