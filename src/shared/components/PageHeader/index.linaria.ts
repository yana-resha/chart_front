import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const PageHeaderWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  min-height: 68px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding: 0.5rem;
  }
`
