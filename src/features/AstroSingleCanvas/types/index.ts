import { ReactNode } from 'react'

import { ASTRO_ASPECT } from '@/shared/types/astro/astro-aspects.types'

export interface PlanetData {
  name: string
  longitude: number // в градусах 0–360
  label?: string // название для вывода
  symbol: string
  isRetrograde: boolean
}

export interface AspectData {
  planetA: string
  planetB: string
  aspectType: ASTRO_ASPECT // например, "Conjunction", "Trine"
  orb: number
  angle: number
  isExact: boolean
  isVeryExact: boolean
  strength: number // 0 до 1
}

export interface AstroSingleCanvasProps {
  houseCusps?: number[]
  planets: PlanetData[]
  aspects: AspectData[]
}

export type CoordsSpace = 'client' | 'local'

export interface TooltipMethods {
  showTooltip: (args: {
    text: ReactNode
    x: number
    y: number
    space?: CoordsSpace
    mobileTitle?: ReactNode | string
  }) => void
  changeTooltipPosition: (args: { x: number; y: number; space?: CoordsSpace }) => void
  hideTooltip: () => void
}
