import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const POINTS_1_GRID = [1150, 730]

export const AspectsContentLayout = styled.div`
  display: grid;
  /* grid-template-columns: auto 1fr; */
  grid-template-columns: 60% 1fr;
  gap: 1.875rem;
  position: relative;

  @media (max-width: ${POINTS_1_GRID[0]}px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    grid-template-columns: 60% 1fr;
  }

  @media (max-width: ${POINTS_1_GRID[1]}px) {
    grid-template-columns: 1fr;
  }
`

export const SectionBlock = styled.div`
  width: 100%;
`

export const SummaryTablesBlock = styled(SectionBlock)`
  position: sticky;
  top: 0;
  overflow: hidden;
  height: fit-content;
`

export const AspectsSummaryTables = styled.div``
