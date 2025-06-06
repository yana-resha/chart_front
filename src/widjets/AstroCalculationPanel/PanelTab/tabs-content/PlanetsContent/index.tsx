import { Layout } from '../index.linaria'
import { PlanetsContentLayout, PlanetsSummaryTables } from './index.linaria'
import { PlanetsElementsAndModalitiesSummary } from '@/features/PlanetsElementsAndModalitiesSummary'
import { PlanetsInDegreesTable } from '@/features/PlanetsInDegreesTable'
import { PlanetsRetroDignitiesList } from '@/features/PlanetsRetroDignitiesSummary'
import { IPlanetValues } from '@/widjets/AstroCalculationPanel/types/index.types'

interface Props {
  planets: IPlanetValues[]
  houses: number[]
}
export const PlanetsContent = ({ planets, houses }: Props) => (
  <Layout>
    <PlanetsContentLayout>
      <PlanetsInDegreesTable
        planets={planets}
        houses={houses}
      />
      <PlanetsSummaryTables>
        <PlanetsElementsAndModalitiesSummary planets={planets} />
        <PlanetsRetroDignitiesList planets={planets} />
      </PlanetsSummaryTables>
    </PlanetsContentLayout>
  </Layout>
)
