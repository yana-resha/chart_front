import { PlanetData } from '../../types'
import { getVisualAngleFromAsc } from '../../utils/astro-helpers'

const MIN_ANGLE_DIFF = 6

export function groupClosePlanets(planets: PlanetData[], ascendant: number) {
  const sorted = [...planets].sort(
    (a, b) => getVisualAngleFromAsc(a.longitude, ascendant) - getVisualAngleFromAsc(b.longitude, ascendant)
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

  // склеиваем первую и последнюю, если близко через 360°
  if (groups.length > 1) {
    const first = groups[0]
    const last = groups[groups.length - 1]
    const firstAngle = getVisualAngleFromAsc(first[0].longitude, ascendant)
    const lastAngle = getVisualAngleFromAsc(last[last.length - 1].longitude, ascendant)
    const circularDiff = 360 - lastAngle + firstAngle
    if (circularDiff <= MIN_ANGLE_DIFF) {
      groups[groups.length - 1] = [...last, ...first]
      groups.shift()
    }
  }

  return groups
}
