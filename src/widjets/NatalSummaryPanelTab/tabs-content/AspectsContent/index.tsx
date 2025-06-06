import { useRef } from 'react'

import { Layout } from '../index.linaria'
import { AspectsContentLayout, AspectsSummaryTables } from './index.linaria'
import {
  IChartAspectStatistics,
  IPlanetsAspect,
  IStrongestPlanetByAspects,
} from '@/entities/astro-charts/types/astro-items.types'
import { AspectsSummary } from '@/features/AspectsSummary'
import { PlanetsAspectsInDegreesTable } from '@/features/PlanetsAspectsInDegreesTable'
import { ExpandableWrapper } from '@/shared/components/ExpandableWrapper'
import { useElementAndWindowRect } from '@/shared/hooks/useElementAndWindowRect'

interface Props {
  planetsAspects: IPlanetsAspect[]
  strongestPlanetByAspects: IStrongestPlanetByAspects
  chartAspectStatistics: IChartAspectStatistics
}

export const AspectsContent = ({ planetsAspects, chartAspectStatistics }: Props) => {
  const summaryRef = useRef<HTMLDivElement>(null)
  const { elementRect, windowSize } = useElementAndWindowRect({ ref: summaryRef })
  const maxHeight = windowSize.innerWidth < 768 ? 250 : (elementRect?.height ?? 250)

  return (
    <Layout>
      <AspectsContentLayout>
        <ExpandableWrapper maxHeight={maxHeight}>
          <PlanetsAspectsInDegreesTable planetsAspects={planetsAspects} />
        </ExpandableWrapper>
        <AspectsSummaryTables ref={summaryRef}>
          <AspectsSummary chartAspectStatistics={chartAspectStatistics} />
        </AspectsSummaryTables>
      </AspectsContentLayout>
    </Layout>
  )
}
