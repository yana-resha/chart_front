import { AstroPlanetListProps } from './types'
import { PlanetItem } from './ui/PlanetItem'
import { SimpleDataTable } from '@/shared/components/SimpleDataTable'
import { getHouseIndexBySmth } from '@/shared/helpers/astro.helper'

export const PlanetsInDegreesTable = ({ planets, houses }: AstroPlanetListProps) => {
  const isHouses = houses && houses.length > 0

  return (
    <SimpleDataTable>
      <SimpleDataTable.HeadRow>
        <SimpleDataTable.Header>Планета</SimpleDataTable.Header>
        <SimpleDataTable.Header>Долгота</SimpleDataTable.Header>
        {isHouses && (
          <SimpleDataTable.Header style={{ textAlign: 'end' }}>Позиция дома</SimpleDataTable.Header>
        )}
      </SimpleDataTable.HeadRow>
      <SimpleDataTable.TBody>
        {planets.map((planet) => {
          const houseIndex = houses ? getHouseIndexBySmth(planet.longitude, houses) : undefined

          return (
            <PlanetItem
              key={planet.name}
              planet={planet}
              houseIndex={houseIndex}
            />
          )
        })}
      </SimpleDataTable.TBody>
    </SimpleDataTable>
  )
}
