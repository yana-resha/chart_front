import { PlanetData } from '../types'

// Перевод астрологических координат в экранные с учётом отражения
export function polarToCartesian(angleDeg: number, radius: number, center: number) {
  const angleRad = (angleDeg - 90) * (Math.PI / 180)

  return {
    x: center + radius * Math.cos(angleRad),
    y: center + radius * Math.sin(angleRad),
  }
}

// Угол от ASC, отражённый по горизонтали (MC будет сверху, ASC слева)
export function getVisualAngleFromAsc(point: number, asc: number): number {
  const angleFromAsc = (point - asc + 360) % 360
  const visualAngle = (270 + angleFromAsc) % 360

  return (540 - visualAngle) % 360
}

// возращает массив массивов планет в домах
export const getPlanetsByHouse = (planets: PlanetData[] = [], houseCusps: number[] = []): PlanetData[][] => {
  if (houseCusps.length !== 12) {
    return Array.from({ length: 12 }, () => [])
  }

  const result: PlanetData[][] = Array.from({ length: 12 }, () => [])

  for (const planet of planets) {
    const { longitude } = planet

    for (let i = 0; i < 12; i++) {
      const start = houseCusps[i]
      const end = houseCusps[(i + 1) % 12]

      const inHouse =
        start < end ? longitude >= start && longitude < end : longitude >= start || longitude < end // дом через 0°

      if (inHouse) {
        result[i].push(planet)
        break
      }
    }
  }

  return result
}
