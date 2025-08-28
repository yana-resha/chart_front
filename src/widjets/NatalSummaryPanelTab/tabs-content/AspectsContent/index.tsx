import { useRef } from 'react'

import { Layout, ListHeader } from '../index.linaria'
import {
  AspectsContentLayout,
  AspectsSummaryTables,
  POINTS_1_GRID,
  SectionBlock,
  SummaryTablesBlock,
} from './index.linaria'
import {
  IChartAspectStatistics,
  IPlanetsAspect,
  IStrongestPlanetByAspects,
} from '@/entities/astro-charts/types/astro-items.types'
import { PlanetsAspectsInDegreesTable } from '@/features/PlanetsAspectsInDegreesTable'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { ExpandableWrapper } from '@/shared/components/ExpandableWrapper'
import { useElementAndWindowRect } from '@/shared/hooks/useElementAndWindowRect'
import { AspectsSummary } from '@/widjets/NatalSummaryPanelTab/tabs-content/AspectsContent/AspectsSummary'

interface Props {
  planetsAspects: IPlanetsAspect[]
  strongestPlanetByAspects: IStrongestPlanetByAspects
  chartAspectStatistics: IChartAspectStatistics
}

export const AspectsContent = ({ planetsAspects, chartAspectStatistics }: Props) => {
  const summaryRef = useRef<HTMLDivElement>(null)
  const { elementRect, windowSize } = useElementAndWindowRect({ ref: summaryRef })

  const isOneColumn =
    (windowSize.innerWidth <= POINTS_1_GRID[0] && windowSize.innerWidth > MEDIA_POINTS.TABLET) ||
    windowSize.innerWidth <= POINTS_1_GRID[1]

  const maxHeight = isOneColumn ? 350 : (elementRect?.height ?? 350)

  return (
    <Layout>
      <AspectsContentLayout>
        <SectionBlock>
          <ListHeader>🌠 Аспекты</ListHeader>
          <ExpandableWrapper maxHeight={maxHeight}>
            <PlanetsAspectsInDegreesTable planetsAspects={planetsAspects} />
          </ExpandableWrapper>
        </SectionBlock>
        <SummaryTablesBlock>
          <ListHeader>📊 Сводка аспектов</ListHeader>
          <AspectsSummaryTables ref={summaryRef}>
            <AspectsSummary chartAspectStatistics={chartAspectStatistics} />
          </AspectsSummaryTables>
        </SummaryTablesBlock>
      </AspectsContentLayout>
    </Layout>
  )
}
