export enum ASTRO_ASPECT {
  CONJUCTION = 'Conjunction',
  OPPOSITION = 'Opposition',
  TRINE = 'Trine',
  SQUARE = 'Square',
  SEXTILE = 'Sextile',
  QUINCUNX = 'Quincunx',
}

export enum ASPECT_CATEGORY {
  HARMONIOUS = 'harmonious',
  TENSE = 'tense',
  NEUTRAL = 'neutral',
}

export interface IAspectCategoryStats {
  count: number
  percent: number
  items: ASTRO_ASPECT[] // какие аспекты туда входят, например ['Trine', 'Sextile']
}

export type IChartAspectStatisticsRecord = Record<ASPECT_CATEGORY, IAspectCategoryStats>

export enum EVALUATION_ASPECTS_STRENGTH {
  LOW = 'low',
  VERY_LOW = 'very low',
  MIDDLE = 'middle',
  STRONG = 'strong',
  VERY_STRONG = 'very strong',
}
