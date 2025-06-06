import { IAspect } from '../types'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { SimpleDataTable } from '@/shared/components/SimpleDataTable'
import {
  ASTRO_ASPECT_COLOR,
  ASTRO_ASPECT_NAME,
  ASTRO_ASPECT_SYMBOL,
} from '@/shared/configs/astro-aspects.config'
import { ASTRO_PLANET_NAME, ASTRO_PLANET_SYMBOL } from '@/shared/configs/astro-planets.config'

export const Row = ({ planetA, planetB, orb, aspectType }: IAspect) => {
  const aspectName = ASTRO_ASPECT_NAME[aspectType]
  const aspectColor = ASTRO_ASPECT_COLOR[aspectType]
  const aspectSymbol = ASTRO_ASPECT_SYMBOL[aspectType]

  const planetASymbol = ASTRO_PLANET_SYMBOL[planetA]
  const planetBSymbol = ASTRO_PLANET_SYMBOL[planetB]

  const planetALabel = ASTRO_PLANET_NAME[planetA]
  const planetBLabel = ASTRO_PLANET_NAME[planetB]

  return (
    <SimpleDataTable.RowHovered>
      <SimpleDataTable.Cell>
        <HamburgSymbol>{planetASymbol} &emsp;</HamburgSymbol>
        {planetALabel ?? planetA}
      </SimpleDataTable.Cell>
      <SimpleDataTable.Cell>
        <HamburgSymbol style={{ color: aspectColor }}>{aspectSymbol}</HamburgSymbol>
        &ensp;
        {aspectName}
      </SimpleDataTable.Cell>
      <SimpleDataTable.Cell>
        <HamburgSymbol>{planetBSymbol} &emsp;</HamburgSymbol>
        {planetBLabel ?? planetB}
      </SimpleDataTable.Cell>
      <SimpleDataTable.Cell>{orb}°</SimpleDataTable.Cell>
    </SimpleDataTable.RowHovered>
  )
}
