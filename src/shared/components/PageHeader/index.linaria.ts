import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const PageHeaderWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding: 1.5rem 0.5rem;
  }
`
