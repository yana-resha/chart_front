import { AstroPlanetTableProps } from './types'
import { PlanetItem } from './ui/PlanetItem'

export const AstroPlanetTable = ({ planets }: AstroPlanetTableProps) => (
  <div>
    {planets.map((planet) => (
      <PlanetItem
        key={planet.name}
        {...planet}
      />
    ))}
  </div>
)
