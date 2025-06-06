import { Layout } from '../index.linaria'
import { HousesContentLayout } from './index.linaria'
import { HousesInDegreesTable } from '@/features/HousesInDegreesTable'
import { HousesStatsTable } from '@/features/HousesStatsTable'
import { IPlanetValues } from '@/widjets/AstroCalculationPanel/types/index.types'

interface Props {
  planets: IPlanetValues[]
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
