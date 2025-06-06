import { ASTRO_ASPECT } from '@/shared/types/astro/astro-aspects.types'

export interface Aspect {
  planetA: string
  planetB: string
  aspectType: ASTRO_ASPECT
  orb: number
  isExact: boolean
  ange: number
  isVeryExact: boolean
  strength: number
  angle: number
}

export interface Planet {
  name: string
  label?: string
  symbol: string
  longitude: number
}

export interface Props {
  planets: Planet[]
  aspects: Aspect[]
}
