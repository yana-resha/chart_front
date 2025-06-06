import React from 'react'

import { Grid } from './index.linaria'
import { IPlanetValues } from './types/index.types'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { ASTRO_ZODIAC_INDEX, ASTRO_ZODIAC_SIGN_IN_ELEMENT } from '@/shared/configs/astro-zodiac.config'
import { getPlanetsElementStats } from '@/shared/helpers/astro/getPlanetsElementStats'
import { getSignIndexByLongitude } from '@/shared/helpers/astro.helper'
import { ASTRO_ZODIAC, ASTRO_ZODIAC_ELEMENT } from '@/shared/types/astro/astro-zodiac.types'
import { ASTRO_PLANET_NAME, ASTRO_PLANET_SYMBOL } from '@/shared/configs/astro-planets.config'

export const PlanetsElementBalanceTable: React.FC<{ planets: IPlanetValues[] }> = ({ planets }) => {
  const { counts, total, percentages, dominant } = getPlanetsElementStats(planets)

  // rows формируем только для отрисовки ✔ по знакам
  const rows = planets.map(({ longitude, name }) => {
    const signIndex = getSignIndexByLongitude(longitude)
    const sign = ASTRO_ZODIAC_INDEX[signIndex] as ASTRO_ZODIAC
    const element = ASTRO_ZODIAC_SIGN_IN_ELEMENT[sign]

    const symbol = ASTRO_PLANET_SYMBOL[name]
    const label = ASTRO_PLANET_NAME[name]

    return { label, element, symbol }
  })

  return (
    <Grid>
      <div className="header">Планета</div>
      <div className="header">Огонь</div>
      <div className="header">Земля</div>
      <div className="header">Воздух</div>
      <div className="header">Вода</div>

      {rows.flatMap(({ label, element, symbol }) => [
        <div
          key={`${label}-name`}
          className="planet"
        >
          <HamburgSymbol>{symbol}&emsp;</HamburgSymbol>
          {label}
        </div>,
        <div key={`${label}-fire`}>{element === ASTRO_ZODIAC_ELEMENT.FIRE ? '✔' : ''}</div>,
        <div key={`${label}-earth`}>{element === ASTRO_ZODIAC_ELEMENT.EARTH ? '✔' : ''}</div>,
        <div key={`${label}-air`}>{element === ASTRO_ZODIAC_ELEMENT.AIR ? '✔' : ''}</div>,
        <div key={`${label}-water`}>{element === ASTRO_ZODIAC_ELEMENT.WATER ? '✔' : ''}</div>,
      ])}

      <div className="footer">ИТОГО</div>
      {(Object.keys(counts) as ASTRO_ZODIAC_ELEMENT[]).map((el) => (
        <div
          key={el}
          className={dominant.includes(el) ? 'highlight footer' : 'footer'}
        >
          {total > 0 ? `${percentages[el].toFixed(1)}%` : '0%'}
        </div>
      ))}
    </Grid>
  )
}
