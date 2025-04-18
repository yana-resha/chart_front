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
  aspectType: string // например, "Conjunction", "Trine"
  orb: number
  isExact: boolean
  isVeryExact: boolean
}

export interface AstroChartCanvasProps {
  houseCusps?: number[]
  planets: PlanetData[]
  aspects: AspectData[]
}
