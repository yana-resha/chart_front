export interface PlanetData {
  name: string
  label?: string // название для вывода
  symbol: string
  longitude: number // в градусах 0–360
  isRetrograde: boolean
}

export interface AstroPlanetTableProps {
  planets: PlanetData[]
}
