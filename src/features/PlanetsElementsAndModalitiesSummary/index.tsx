import React from 'react'

import { SimpleMultiColumnList } from '@/shared/components/SimpleMultiColumnList'
import {
  ASTRO_ZODIAC_ELEMENT_NAME,
  ASTRO_ZODIAC_MODALITY_NAME,
  ASTRO_ZODIAC_NAME,
} from '@/shared/configs/astro-zodiac.config'
import { getPlanetsElementStats } from '@/shared/helpers/astro/getPlanetsElementStats'
import { getPlanetsModalityStats } from '@/shared/helpers/astro/getPlanetsModalityStats'
import { getPlanetsSignStats } from '@/shared/helpers/astro/getPlanetsSignStats'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'
import {
  ASTRO_ZODIAC_ELEMENT,
  ASTRO_ZODIAC_MODALITY,
  ASTRO_ZODIAC,
} from '@/shared/types/astro/astro-zodiac.types'

export interface IPlanetValues {
  name: ASTRO_PLANET
  label: string
  longitude: number
  symbol: string
}

export const PlanetsElementsAndModalitiesSummary: React.FC<{ planets: IPlanetValues[] }> = ({ planets }) => {
  const elementStats = getPlanetsElementStats(planets)
  const modalityStats = getPlanetsModalityStats(planets)
  const signStats = getPlanetsSignStats(planets)

  const sortedElements = (Object.keys(elementStats.percentages) as ASTRO_ZODIAC_ELEMENT[]).sort(
    (a, b) => elementStats.percentages[b] - elementStats.percentages[a],
  )

  const sortedModalities = (Object.keys(modalityStats.percentages) as ASTRO_ZODIAC_MODALITY[]).sort(
    (a, b) => modalityStats.percentages[b] - modalityStats.percentages[a],
  )

  const sortedSigns = (Object.keys(signStats.percentages) as ASTRO_ZODIAC[])
    .filter((sign) => signStats.percentages[sign] > 0)
    .sort((a, b) => signStats.percentages[b] - signStats.percentages[a])

  return (
    <SimpleMultiColumnList columns={3}>
      <SimpleMultiColumnList.Column>
        <SimpleMultiColumnList.Header>Стихии</SimpleMultiColumnList.Header>
        {sortedElements.map((el) => (
          <SimpleMultiColumnList.Item
            key={el}
            highlight={elementStats.dominant.includes(el)}
          >
            {ASTRO_ZODIAC_ELEMENT_NAME[el]}: {elementStats.percentages[el].toFixed(1)}%
          </SimpleMultiColumnList.Item>
        ))}
      </SimpleMultiColumnList.Column>

      <SimpleMultiColumnList.Column>
        <SimpleMultiColumnList.Header>Качества</SimpleMultiColumnList.Header>
        {sortedModalities.map((m) => (
          <SimpleMultiColumnList.Item
            key={m}
            highlight={modalityStats.dominant.includes(m)}
          >
            {ASTRO_ZODIAC_MODALITY_NAME[m]}: {modalityStats.percentages[m].toFixed(1)}%
          </SimpleMultiColumnList.Item>
        ))}
      </SimpleMultiColumnList.Column>

      <SimpleMultiColumnList.Column>
        <SimpleMultiColumnList.Header>Знаки</SimpleMultiColumnList.Header>
        {sortedSigns.map((sign) => (
          <SimpleMultiColumnList.Item
            key={sign}
            highlight={signStats.dominant.includes(sign)}
          >
            {ASTRO_ZODIAC_NAME[sign]}: {signStats.percentages[sign].toFixed(1)}%
          </SimpleMultiColumnList.Item>
        ))}
      </SimpleMultiColumnList.Column>
    </SimpleMultiColumnList>
  )
}
