import { useRef } from 'react'

import { Layout, ListHeader } from '../index.linaria'
import { HousesContentLayout, POINTS_1_GRID, SectionBlock } from './index.linaria'
import { IPlanet } from '@/entities/astro-charts/types/astro-items.types'
import { HousesInDegreesTable } from '@/features/HousesInDegreesTable'
import { HousesStatsTable } from '@/features/HousesStatsTable'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { ExpandableWrapper } from '@/shared/components/ExpandableWrapper'
import { useElementAndWindowRect } from '@/shared/hooks/useElementAndWindowRect'

interface Props {
  planets: IPlanet[]
  houses: number[]
}

export const HousesContent = ({ planets, houses }: Props) => {
  const ref = useRef(null)
  const { windowSize } = useElementAndWindowRect({ ref })
  const isOneColumn =
    (windowSize.innerWidth <= POINTS_1_GRID[0] && windowSize.innerWidth > MEDIA_POINTS.TABLET) ||
    windowSize.innerWidth <= POINTS_1_GRID[1]

  const maxHeight = isOneColumn ? 350 : 10000

  return (
    <Layout>
      <HousesContentLayout>
        <SectionBlock>
          <ListHeader>🏠 Куспиды домов</ListHeader>
          <ExpandableWrapper maxHeight={maxHeight}>
            <HousesInDegreesTable
              planets={planets}
              houses={houses}
            />
          </ExpandableWrapper>
        </SectionBlock>
        <SectionBlock>
          <ListHeader>🌌 Планеты в домах</ListHeader>
          <ExpandableWrapper maxHeight={maxHeight}>
            <HousesStatsTable
              houses={houses}
              planets={planets}
            />
          </ExpandableWrapper>
        </SectionBlock>
      </HousesContentLayout>
    </Layout>
  )
}
