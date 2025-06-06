import { CustomRowHovered, FictionCell, WeightCell } from './index.linaria'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { SimpleDataTable } from '@/shared/components/SimpleDataTable'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import { getHousesFullStats } from '@/shared/helpers/astro/getHousesFullStats'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

interface IPlanetValue {
  name: ASTRO_PLANET
  longitude: number
}

export const HousesStatsTable = ({ planets, houses }: { planets: IPlanetValue[]; houses: number[] }) => {
  const { countsReal, countsFiction, percentages, dominantHouses } = getHousesFullStats(planets, houses)

  const maxPercentage = Math.max(...Object.values(percentages))

  const houseStats = houses.map((_, index) => {
    const houseIndex = index + 1
    const realCount = countsReal[houseIndex] || 0
    const fictionCount = countsFiction[houseIndex] || 0
    const percentage = percentages[houseIndex] || 0

    return {
      houseIndex,
      realCount,
      fictionCount,
      percentage,
      isDominant: dominantHouses.includes(houseIndex),
      isEmpty: realCount === 0 && fictionCount === 0,
      isHot: percentage >= 0.8 * maxPercentage,
    }
  })

  houseStats.sort((a, b) => b.percentage - a.percentage)

  return (
    <SimpleDataTable>
      <SimpleDataTable.HeadRow>
        <SimpleDataTable.Header>Дом</SimpleDataTable.Header>
        <SimpleDataTable.Header>Планеты</SimpleDataTable.Header>
        <SimpleDataTable.Header>Вес в карте</SimpleDataTable.Header>
        <SimpleDataTable.Header>Фиктивные</SimpleDataTable.Header>
      </SimpleDataTable.HeadRow>
      <SimpleDataTable.TBody>
        {houseStats.map(({ houseIndex, realCount, fictionCount, percentage, isDominant, isEmpty, isHot }) => {
          const houseSymbol = ASTRO_HOUSE_SYMBOL[houseIndex]
          const rowClass = isEmpty ? 'empty' : isDominant ? 'highlight' : ''

          let indicator = ''
          if (isHot) indicator = ' 🔥'
          else if (isEmpty) indicator = ' 😴'

          return (
            <CustomRowHovered
              className={rowClass}
              key={houseIndex}
            >
              <SimpleDataTable.Cell>{houseSymbol} дом</SimpleDataTable.Cell>
              <SimpleDataTable.Cell>{realCount}</SimpleDataTable.Cell>
              <WeightCell>
                {percentage.toFixed(2)}%{indicator}
              </WeightCell>
              <FictionCell>
                {fictionCount}
                <HamburgSymbol>{''}</HamburgSymbol>
              </FictionCell>
            </CustomRowHovered>
          )
        })}
      </SimpleDataTable.TBody>
    </SimpleDataTable>
  )
}
