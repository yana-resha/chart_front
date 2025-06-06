import {
  IFullChoroscopeСalculations,
  IFullNatalСalculations,
} from '@/entities/astro-charts/types/astro-charts.types'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

// 💡 Мапа соответствия типу карты → типу данных
export type ChartDataByCategory = {
  [ASTRO_CHART_VARIABLE.NATAL_CHART]: IFullNatalСalculations
  [ASTRO_CHART_VARIABLE.CHOROSCOPE]: IFullChoroscopeСalculations
  // Добавляй другие типы по мере необходимости
}

// 💡 Общий дискриминируемый тип
export type ICalculationDatas = {
  [K in keyof ChartDataByCategory]: {
    category: K
    data: ChartDataByCategory[K]
  }
}[keyof ChartDataByCategory]

// ✅ Интерфейс пропсов с добавлением других опций
export type IAstroCalculationPanelProps = ICalculationDatas & {}

export interface IPlanetValues {
  name: ASTRO_PLANET
  label: string
  longitude: number
  symbol: string
  isRetrograde: boolean
}
