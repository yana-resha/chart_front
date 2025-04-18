export const getPlanetData = (
  aspect: {
    planetA: string
    planetB: string
  },
  planets: { name: string; label?: string; symbol: string }[],
) => {
  const pa = planets.find((p) => p.name === aspect.planetA)
  const pb = planets.find((p) => p.name === aspect.planetB)

  return {
    namePlanetA: pa?.label || pa?.name || '',
    symbolPlanetA: pa?.symbol || '',
    namePlanetB: pb?.label || pb?.name || '',
    symbolPlanetB: pb?.symbol || '',
  }
}
