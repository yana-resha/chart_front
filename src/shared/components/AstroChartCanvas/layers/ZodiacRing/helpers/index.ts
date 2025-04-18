export function getZodiacIndexFromAngle(startAngle: number, ascendant: number): number {
  const arcLongitude = (ascendant - startAngle + 360) % 360
  const zodiacIndex = 13 - Math.floor(arcLongitude / 30)

  return zodiacIndex > 12 ? 1 : zodiacIndex
}
