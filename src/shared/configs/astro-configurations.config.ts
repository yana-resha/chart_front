import { ASTRO_CONFIGURATION } from '../types/astro/astro-configurations.types'

export const ASTRO_CONFIGURATION_NAME: Record<ASTRO_CONFIGURATION, string> = {
  [ASTRO_CONFIGURATION.GRANDTRINE]: 'Большой тригон',
  [ASTRO_CONFIGURATION.GRANDCROSS]: 'Большой крест',
  [ASTRO_CONFIGURATION.TSQUARE]: 'Тау-квадрат',
}
