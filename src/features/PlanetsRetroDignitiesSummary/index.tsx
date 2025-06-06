import React from 'react'

import { detriment, domicile, exaltation, fall, retro } from './data/tooltip.data'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { InfoTooltip } from '@/shared/components/InfoTooltip'
import { SimpleMultiColumnTable } from '@/shared/components/SimpleMultiColumnTable'
import { ASTRO_ESSENTIAL_DIGNITY_NAME } from '@/shared/configs/astro-essential-dignity'
import { ASTRO_PLANET_NAME, ASTRO_PLANET_SYMBOL } from '@/shared/configs/astro-planets.config'
import { ASTRO_ZODIAC_INDEX } from '@/shared/configs/astro-zodiac.config'
import { getPlanetEssentialDignity } from '@/shared/helpers/astro/getPlanetEssentialDignity'
import { getSignIndexByLongitude } from '@/shared/helpers/astro.helper'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'
import { ASTRO_ZODIAC, ASTRO_ESSENTIAL_DIGNITY } from '@/shared/types/astro/astro-zodiac.types'

export interface IPlanetValues {
  name: ASTRO_PLANET
  longitude: number
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
    <SimpleMultiColumnTable>
      <SimpleMultiColumnTable.HeaderRow>
        <SimpleMultiColumnTable.Header>
          Ретро&nbsp;
          <InfoTooltip content={<div style={{ whiteSpace: 'pre-line' }}>{retro}</div>} />
        </SimpleMultiColumnTable.Header>
        <SimpleMultiColumnTable.Header>
          {ASTRO_ESSENTIAL_DIGNITY_NAME[ASTRO_ESSENTIAL_DIGNITY.DOMICILE]}&nbsp;
          <InfoTooltip content={<div style={{ whiteSpace: 'pre-line' }}>{domicile}</div>} />
        </SimpleMultiColumnTable.Header>
        <SimpleMultiColumnTable.Header>
          {ASTRO_ESSENTIAL_DIGNITY_NAME[ASTRO_ESSENTIAL_DIGNITY.EXALTATION]}&nbsp;
          <InfoTooltip content={<div style={{ whiteSpace: 'pre-line' }}>{exaltation}</div>} />
        </SimpleMultiColumnTable.Header>
        <SimpleMultiColumnTable.Header>
          {ASTRO_ESSENTIAL_DIGNITY_NAME[ASTRO_ESSENTIAL_DIGNITY.DETRIMENT]}&nbsp;
          <InfoTooltip content={<div style={{ whiteSpace: 'pre-line' }}>{detriment}</div>} />
        </SimpleMultiColumnTable.Header>
        <SimpleMultiColumnTable.Header>
          {ASTRO_ESSENTIAL_DIGNITY_NAME[ASTRO_ESSENTIAL_DIGNITY.FALL]}&nbsp;
          <InfoTooltip content={<div style={{ whiteSpace: 'pre-line' }}>{fall}</div>} />
        </SimpleMultiColumnTable.Header>
      </SimpleMultiColumnTable.HeaderRow>
      <tbody>
        <SimpleMultiColumnTable.BodyRow>
          <SimpleMultiColumnTable.Item>
            {retroPlanets.length > 0
              ? retroPlanets.map((p) => {
                  const label = ASTRO_PLANET_NAME[p.name]
                  const symbol = ASTRO_PLANET_SYMBOL[p.name]

                  return (
                    <div
                      key={`retro-${label}`}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <HamburgSymbol>{symbol}&emsp;</HamburgSymbol>
                      {label}
                    </div>
                  )
                })
              : '—'}
          </SimpleMultiColumnTable.Item>

          {(
            [
              ASTRO_ESSENTIAL_DIGNITY.DOMICILE,
              ASTRO_ESSENTIAL_DIGNITY.EXALTATION,
              ASTRO_ESSENTIAL_DIGNITY.DETRIMENT,
              ASTRO_ESSENTIAL_DIGNITY.FALL,
            ] as ASTRO_ESSENTIAL_DIGNITY[]
          ).map((d) => (
            <SimpleMultiColumnTable.Item key={d}>
              {dignityMap[d].length > 0
                ? dignityMap[d].map((p) => {
                    const label = ASTRO_PLANET_NAME[p.name]
                    const symbol = ASTRO_PLANET_SYMBOL[p.name]

                    return (
                      <div
                        key={`${d}-${label}`}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        <HamburgSymbol>{symbol}&emsp;</HamburgSymbol>
                        {label}
                      </div>
                    )
                  })
                : '—'}
            </SimpleMultiColumnTable.Item>
          ))}
        </SimpleMultiColumnTable.BodyRow>
      </tbody>
    </SimpleMultiColumnTable>
  )
}
