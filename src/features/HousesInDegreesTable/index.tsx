import { Props } from './types'
import { Row } from './ui/Row'
import { SimpleDataTable } from '@/shared/components/SimpleDataTable'
import { getHouseRulerAndItsHouse } from '@/shared/helpers/astro/getHouseRulerAndItsHouse'

export const HousesInDegreesTable = ({ houses, planets }: Props) => (
  <SimpleDataTable>
    <SimpleDataTable.HeadRow>
      <SimpleDataTable.Header>Дом</SimpleDataTable.Header>
      <SimpleDataTable.Header>Долгота</SimpleDataTable.Header>
      <SimpleDataTable.Header>Управитель в доме</SimpleDataTable.Header>
    </SimpleDataTable.HeadRow>
    <SimpleDataTable.TBody>
      {houses.map((house: number, index: number) => {
        const { ruler, houseOfRuler } = getHouseRulerAndItsHouse(house, planets, houses)
        const houseIndex = index + 1

        return (
          <Row
            key={houseIndex}
            longitude={house}
            houseIndex={houseIndex}
            ruler={ruler}
            houseOfRuler={houseOfRuler}
          />
        )
      })}
    </SimpleDataTable.TBody>
  </SimpleDataTable>
)
