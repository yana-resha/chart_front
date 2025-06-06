import { Aspect } from '../types'

export const getAspectBetween = (a: string, b: string, aspects: Aspect[]) =>
  aspects.find((asp) => (asp.planetA === a && asp.planetB === b) || (asp.planetA === b && asp.planetB === a))
