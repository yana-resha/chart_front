import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const POINTS_1_GRID = [1165, 700]

export const HousesContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.875rem;

  @media (max-width: ${POINTS_1_GRID[0]}px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${POINTS_1_GRID[1]}px) {
    grid-template-columns: 1fr;
  }
`
export const SectionBlock = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`
