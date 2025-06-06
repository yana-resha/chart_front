import { AspectsContent } from './tabs-content/AspectsContent'
import { ConfigurationsContent } from './tabs-content/ConfigurationsContent'
import { HousesContent } from './tabs-content/HousesContent'
import { PlanetsContent } from './tabs-content/PlanetsContent'
import { Tabs } from '@/shared/components/Tabs/Tabs'
import { useAppSelector } from '@/store'

interface Props {
  chartId: string
}

export const NatalSummaryPanelTab = ({ chartId }: Props) => {
  const data = useAppSelector((store) => store.natalDecoding.chartsById[chartId]?.calculation)

  if (!data) return null

  const { aspects, planets, chartAspectStatistics, houses, strongestPlanet } = data

  return (
    <Tabs
      items={[
        {
          key: '1',
          label: 'Планеты',
          children: (
            <PlanetsContent
              planets={planets}
              houses={data.houses.houses}
            />
          ),
        },

        {
          key: '2',
          label: 'Дома',
          children: (
            <HousesContent
              planets={planets}
              houses={houses.houses}
            />
          ),
        },

        {
          key: '3',
          label: 'Аспекты',
          children: (
            <AspectsContent
              planetsAspects={aspects}
              chartAspectStatistics={chartAspectStatistics}
              strongestPlanetByAspects={strongestPlanet}
            />
          ),
        },
        {
          key: '4',
          label: 'Конфигурации',
          children: <ConfigurationsContent />,
        },
      ]}
    />
  )
}
