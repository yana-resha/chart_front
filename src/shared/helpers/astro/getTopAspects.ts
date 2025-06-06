export const getTopExactAspects = <T extends { orb: number }>(aspects: T[], topN = 5): T[] =>
  aspects
    .slice()
    .sort((a, b) => a.orb - b.orb)
    .slice(0, topN)

export const getTopStrongAspects = <T extends { strength: number }>(aspects: T[], topN = 5): T[] =>
  aspects
    .slice()
    .sort((a, b) => b.strength - a.strength)
    .slice(0, topN)
