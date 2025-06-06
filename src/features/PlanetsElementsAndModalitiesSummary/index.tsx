import React from 'react'

import { element, modality, sign } from './data/tooltip.data'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { InfoTooltip } from '@/shared/components/InfoTooltip'
import { SimpleMultiColumnTable } from '@/shared/components/SimpleMultiColumnTable'
import {
  ASTRO_ZODIAC_COLOR,
  ASTRO_ZODIAC_ELEMENT_NAME,
  ASTRO_ZODIAC_ELEMENT_SYMBOL,
  ASTRO_ZODIAC_MODALITY_NAME,
  ASTRO_ZODIAC_MODALITY_SYMBOL,
  ASTRO_ZODIAC_NAME,
  ASTRO_ZODIAC_SYMBOL,
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
  longitude: number
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
    <SimpleMultiColumnTable>
      <SimpleMultiColumnTable.HeaderRow>
        <SimpleMultiColumnTable.Header>
          Стихии&nbsp;
          <InfoTooltip content={<div style={{ whiteSpace: 'pre-line' }}>{element}</div>} />
        </SimpleMultiColumnTable.Header>
        <SimpleMultiColumnTable.Header>
          Качества&nbsp;
          <InfoTooltip content={<div style={{ whiteSpace: 'pre-line' }}>{modality}</div>} />
        </SimpleMultiColumnTable.Header>
        <SimpleMultiColumnTable.Header>
          Знаки&nbsp;
          <InfoTooltip content={<div style={{ whiteSpace: 'pre-line' }}>{sign}</div>} />
        </SimpleMultiColumnTable.Header>
      </SimpleMultiColumnTable.HeaderRow>
      <tbody>
        <SimpleMultiColumnTable.BodyRow>
          <SimpleMultiColumnTable.Item>
            {sortedElements.map((el) => (
              <div key={el}>
                <span
                  style={{
                    fontWeight: elementStats.dominant.includes(el) ? 600 : 400,
                    color: elementStats.dominant.includes(el)
                      ? 'rgb(22, 238, 246)'
                      : 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {ASTRO_ZODIAC_ELEMENT_SYMBOL[el]}&emsp;{ASTRO_ZODIAC_ELEMENT_NAME[el]}:{' '}
                  {elementStats.percentages[el].toFixed(1)}%
                </span>
              </div>
            ))}
          </SimpleMultiColumnTable.Item>

          <SimpleMultiColumnTable.Item>
            {sortedModalities.map((m) => (
              <div key={m}>
                <span
                  style={{
                    fontWeight: modalityStats.dominant.includes(m) ? 600 : 400,
                    color: modalityStats.dominant.includes(m)
                      ? 'rgb(22, 238, 246)'
                      : 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {ASTRO_ZODIAC_MODALITY_SYMBOL[m]}&emsp;{ASTRO_ZODIAC_MODALITY_NAME[m]}:{' '}
                  {modalityStats.percentages[m].toFixed(1)}%
                </span>
              </div>
            ))}
          </SimpleMultiColumnTable.Item>

          <SimpleMultiColumnTable.Item>
            {sortedSigns.map((s) => (
              <div key={s}>
                <HamburgSymbol
                  style={{
                    color: ASTRO_ZODIAC_COLOR[s],
                    fontWeight: signStats.dominant.includes(s) ? 600 : 400,
                  }}
                >
                  {ASTRO_ZODIAC_SYMBOL[s]}
                </HamburgSymbol>
                &emsp;
                <span
                  style={{
                    color: signStats.dominant.includes(s) ? 'rgb(22, 238, 246)' : 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {ASTRO_ZODIAC_NAME[s]}: {signStats.percentages[s].toFixed(1)}%
                </span>
              </div>
            ))}
          </SimpleMultiColumnTable.Item>
        </SimpleMultiColumnTable.BodyRow>
      </tbody>
    </SimpleMultiColumnTable>
  )
}
