import { Layout } from '../index.linaria'
import { HousesContentLayout } from './index.linaria'
import { IPlanet } from '@/entities/astro-charts/types/astro-items.types'
import { HousesInDegreesTable } from '@/features/HousesInDegreesTable'
import { HousesStatsTable } from '@/features/HousesStatsTable'

interface Props {
  planets: IPlanet[]
  houses: number[]
}

export const HousesContent = ({ planets, houses }: Props) => (
  <Layout>
    <HousesContentLayout>
      <HousesInDegreesTable
        planets={planets}
        houses={houses}
      />
      <HousesStatsTable
        houses={houses}
        planets={planets}
      />
    </HousesContentLayout>
  </Layout>
)
