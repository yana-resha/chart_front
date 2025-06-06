import { Layout } from '../index.linaria'
import { PlanetsContentLayout, PlanetsSummaryTables } from './index.linaria'
import { IPlanet } from '@/entities/astro-charts/types/astro-items.types'
import { PlanetsElementsAndModalitiesSummary } from '@/features/PlanetsElementsAndModalitiesSummary'
import { PlanetsInDegreesTable } from '@/features/PlanetsInDegreesTable'
import { PlanetsRetroDignitiesList } from '@/features/PlanetsRetroDignitiesSummary'

interface Props {
  planets: IPlanet[]
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
