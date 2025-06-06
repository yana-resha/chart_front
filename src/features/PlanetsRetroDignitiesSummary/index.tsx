import React from 'react'

import { astroStyle } from './index.linaria'
import { SimpleMultiColumnList } from '@/shared/components/SimpleMultiColumnList'
import { ASTRO_ESSENTIAL_DIGNITY_NAME } from '@/shared/configs/astro-essential-dignity'
import { ASTRO_ZODIAC_INDEX } from '@/shared/configs/astro-zodiac.config'
import { getPlanetEssentialDignity } from '@/shared/helpers/astro/getPlanetEssentialDignity'
import { getSignIndexByLongitude } from '@/shared/helpers/astro.helper'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'
import { ASTRO_ZODIAC, ASTRO_ESSENTIAL_DIGNITY } from '@/shared/types/astro/astro-zodiac.types'

export interface IPlanetValues {
  name: ASTRO_PLANET
  label: string
  longitude: number
  symbol: string
  isRetrograde: boolean
}

export const PlanetsRetroDignitiesList: React.FC<{ planets: IPlanetValues[] }> = ({ planets }) => {
  const retroPlanets = planets.filter((p) => p.isRetrograde)

  const dignityMap: Record<ASTRO_ESSENTIAL_DIGNITY, IPlanetValues[]> = {
    [ASTRO_ESSENTIAL_DIGNITY.DOMICILE]: [],
    [ASTRO_ESSENTIAL_DIGNITY.EXALTATION]: [],
    [ASTRO_ESSENTIAL_DIGNITY.DETRIMENT]: [],
    [ASTRO_ESSENTIAL_DIGNITY.FALL]: [],
  }

  planets.forEach((p) => {
    const signIndex = getSignIndexByLongitude(p.longitude)
    const sign = ASTRO_ZODIAC_INDEX[signIndex] as ASTRO_ZODIAC
    const dignity = getPlanetEssentialDignity(p.name, sign)
    if (dignity) {
      dignityMap[dignity].push(p)
    }
  })

  return (
    <SimpleMultiColumnList columns={5}>
      <SimpleMultiColumnList.Column>
        <SimpleMultiColumnList.Header>Ретроградность</SimpleMultiColumnList.Header>
        {retroPlanets.length > 0 ? (
          retroPlanets.map((p) => (
            <SimpleMultiColumnList.Item key={`retro-${p.label}`}>
              <span style={{ whiteSpace: 'nowrap' }}>
                <span className={astroStyle}>{p.symbol}&emsp;</span>
                {p.label}
              </span>
            </SimpleMultiColumnList.Item>
          ))
        ) : (
          <SimpleMultiColumnList.Item>—</SimpleMultiColumnList.Item>
        )}
      </SimpleMultiColumnList.Column>

      {(
        [
          ASTRO_ESSENTIAL_DIGNITY.DOMICILE,
          ASTRO_ESSENTIAL_DIGNITY.EXALTATION,
          ASTRO_ESSENTIAL_DIGNITY.DETRIMENT,
          ASTRO_ESSENTIAL_DIGNITY.FALL,
        ] as ASTRO_ESSENTIAL_DIGNITY[]
      ).map((d) => (
        <SimpleMultiColumnList.Column key={d}>
          <SimpleMultiColumnList.Header>{ASTRO_ESSENTIAL_DIGNITY_NAME[d]}</SimpleMultiColumnList.Header>
          {dignityMap[d].length > 0 ? (
            dignityMap[d].map((p) => (
              <SimpleMultiColumnList.Item key={`${d}-${p.label}`}>
                <span style={{ whiteSpace: 'nowrap' }}>
                  <span className={astroStyle}>{p.symbol}&emsp;</span>
                  {p.label}
                </span>
              </SimpleMultiColumnList.Item>
            ))
          ) : (
            <SimpleMultiColumnList.Item>—</SimpleMultiColumnList.Item>
          )}
        </SimpleMultiColumnList.Column>
      ))}
    </SimpleMultiColumnList>
  )
}
