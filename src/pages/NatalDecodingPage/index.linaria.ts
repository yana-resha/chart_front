import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const Layout = styled.section`
  height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
`

export const layoutLoading = css`
  max-height: calc(100dvh - 1.56rem);
  overflow: hidden;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    max-height: calc(100dvh - 1rem);
  }
`

export const WidjetsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.56rem;
  max-width: 100%;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    gap: 1rem;
  }
`
