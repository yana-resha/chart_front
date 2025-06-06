import { PlanetData } from '../../types'
import { getVisualAngleFromAsc } from '../../utils/astro-helpers'

const MIN_ANGLE_DIFF = 6
export function groupClosePlanets(planets: PlanetData[], ascendant: number) {
  const sorted = [...planets].sort(
    (a, b) => getVisualAngleFromAsc(a.longitude, ascendant) - getVisualAngleFromAsc(b.longitude, ascendant),
  )

  const groups: PlanetData[][] = []

  for (const planet of sorted) {
    const angle = getVisualAngleFromAsc(planet.longitude, ascendant)
    const lastGroup = groups[groups.length - 1]

    if (
      !lastGroup ||
      getVisualAngleFromAsc(lastGroup[lastGroup.length - 1].longitude, ascendant) + MIN_ANGLE_DIFF < angle
    ) {
      groups.push([planet])
    } else {
      lastGroup.push(planet)
    }
  }

  return groups
}
