import { useMemo } from 'react'

import { Aspects } from './tabs-content/Aspects'
import { Configurations } from './tabs-content/Configurations'
import { HouseInSign } from './tabs-content/HouseInSign'
import { PlanetInHouse } from './tabs-content/PlanetInHouse'
import { PlanetInSign } from './tabs-content/PlanetInSign'
import { IProps } from './types'
import { Tabs } from '@/shared/components/Tabs/Tabs'
import { getHouseIndexBySmth, getSignNameByLongitude } from '@/shared/helpers/astro.helper'
import { useAppSelector } from '@/store'

export const NatalDictionaryPanelTab = ({ chartId }: IProps) => {
  const {
    planets,
    houses: { houses },
    aspects,
  } = useAppSelector((store) => store.natalDecoding.chartsById[chartId]?.calculation)

  const planetsMapped = useMemo(
    () =>
      planets.map((planet) => ({
        planet: planet.name,
        planetLongitude: planet.longitude,
        sign: getSignNameByLongitude(planet.longitude),
        house: getHouseIndexBySmth(planet.longitude, houses) ?? -1,
      })),
    [houses, planets],
  )

  const housesMapped = useMemo(
    () =>
      houses.map((longitude, index) => ({
        house: index + 1,
        sign: getSignNameByLongitude(longitude),
        houseLongitude: longitude,
      })),
    [houses],
  )

  const aspectsMapped = useMemo(
    () =>
      aspects.map((aspect) => ({
        planetA: aspect.planetA,
        planetB: aspect.planetB,
        aspect: aspect.aspectType,
        angle: aspect.angle,
        orb: aspect.orb,
      })),
    [aspects],
  )

  return (
    <Tabs
      items={[
        {
          key: '1',
          label: 'Планеты в знаках',
          children: (
            <PlanetInSign
              chartId={chartId}
              items={planetsMapped}
            />
          ),
        },
        {
          key: '2',
          label: 'Планеты в домах',
          children: (
            <PlanetInHouse
              chartId={chartId}
              items={planetsMapped}
            />
          ),
        },
        {
          key: '3',
          label: 'Дома в знаках',
          children: (
            <HouseInSign
              chartId={chartId}
              items={housesMapped}
            />
          ),
        },
        {
          key: '4',
          label: 'Аспекты',
          children: (
            <Aspects
              chartId={chartId}
              items={aspectsMapped}
            />
          ),
        },
        {
          key: '5',
          label: 'Конфигурации',
          children: <Configurations />,
        },
      ]}
    />
  )
}
