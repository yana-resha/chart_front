import { useMemo } from 'react'

import { useAstroCalculationPanel } from '../hooks/useAstroCalculationPanel'
import { HousesContent } from './tabs-content/HousesContent'
import { PlanetsContent } from './tabs-content/PlanetsContent'
import { Tabs } from '@/shared/components/Tabs/Tabs'
import { ASTRO_PLANET_NAME, ASTRO_PLANET_SYMBOL } from '@/shared/configs/astro-planets.config'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

export const PanelTab = () => {
  const { data, category } = useAstroCalculationPanel()

  const planets = useMemo(
    () =>
      data?.planets.map(({ name, longitude, isRetrograde }) => ({
        name,
        label: ASTRO_PLANET_NAME[name as ASTRO_PLANET],
        longitude,
        symbol: ASTRO_PLANET_SYMBOL[name as ASTRO_PLANET] ?? ASTRO_PLANET_SYMBOL.Sun,
        isRetrograde,
      })),
    [data],
  )

  const tabItems = useMemo(() => {
    if (category === ASTRO_CHART_VARIABLE.NATAL_CHART) {
      return [
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
              houses={data.houses.houses}
            />
          ),
        },

        {
          key: '3',
          label: 'Аспекты',
          children: <></>,
        },

        {
          key: '4',
          label: 'Конфигурации',
          children: (
            <PlanetsContent
              planets={planets}
              houses={data.houses.houses}
            />
          ),
        },
      ]
    }

    return []
  }, [category, data, planets])

  return <Tabs items={tabItems} />
}
