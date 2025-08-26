import { styled } from '@linaria/react'

import { MEDIA_POINTS } from './media-points'

export const PageContentWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 10px;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    // padding-top: 0.2rem;
  }
`
