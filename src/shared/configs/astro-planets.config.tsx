import { ASTRO_PLANETS } from '../types/astro-planets'
import Chiron from '@/shared/assets/icons/planet-icons/Chiron.svg?react'
import Fortuna from '@/shared/assets/icons/planet-icons/Fortuna.svg?react'
import Jupiter from '@/shared/assets/icons/planet-icons/Jupiter.svg?react'
import Ketu from '@/shared/assets/icons/planet-icons/Ketu.svg?react'
import Lilith from '@/shared/assets/icons/planet-icons/Lilith.svg?react'
import Mars from '@/shared/assets/icons/planet-icons/Mars.svg?react'
import Mercury from '@/shared/assets/icons/planet-icons/Mercury.svg?react'
import Moon from '@/shared/assets/icons/planet-icons/Moon.svg?react'
import Neptune from '@/shared/assets/icons/planet-icons/Neptune.svg?react'
import Pluto from '@/shared/assets/icons/planet-icons/Pluto.svg?react'
import Proserpina from '@/shared/assets/icons/planet-icons/Proserpina.svg?react'
import Rahu from '@/shared/assets/icons/planet-icons/Rahu.svg?react'
import Saturn from '@/shared/assets/icons/planet-icons/Saturn.svg?react'
import Selena from '@/shared/assets/icons/planet-icons/Selena.svg?react'
import Sun from '@/shared/assets/icons/planet-icons/Sun.svg?react'
import Uranus from '@/shared/assets/icons/planet-icons/Uranus.svg?react'
import Venus from '@/shared/assets/icons/planet-icons/Venus.svg?react'
import React, { FunctionComponent } from 'react'

export const ASTRO_PLANET_NAME: Record<string, string> = {
  [ASTRO_PLANETS.SUN]: 'Солнце',
  [ASTRO_PLANETS.MOON]: 'Луна',
  [ASTRO_PLANETS.MERCURY]: 'Меркурий',
  [ASTRO_PLANETS.VENUS]: 'Венера',
  [ASTRO_PLANETS.MARS]: 'Марс',
  [ASTRO_PLANETS.JUPITER]: 'Юпитер',
  [ASTRO_PLANETS.SATURN]: 'Сатурн',
  [ASTRO_PLANETS.URANUS]: 'Уран',
  [ASTRO_PLANETS.NEPTUNE]: 'Нептун',
  [ASTRO_PLANETS.PLUTO]: 'Плутон',

  [ASTRO_PLANETS.PROSERPINA]: 'Прозерпина',
  [ASTRO_PLANETS.CHIRON]: 'Хирон',
  [ASTRO_PLANETS.LILITH]: 'Лилит',

  [ASTRO_PLANETS.RAHU]: 'Раху',
  [ASTRO_PLANETS.KETU]: 'Кету',
  [ASTRO_PLANETS.FORTUNA]: 'Парс Фортуны',
  [ASTRO_PLANETS.SELENA]: 'Селена',
}

export const ASTRO_PLANET_SYMBOL: Record<string, string> = {
  [ASTRO_PLANETS.SUN]: 'Q',
  [ASTRO_PLANETS.MOON]: 'W',
  [ASTRO_PLANETS.MERCURY]: 'E',
  [ASTRO_PLANETS.VENUS]: 'R',
  [ASTRO_PLANETS.MARS]: 'T',
  [ASTRO_PLANETS.JUPITER]: 'Y',
  [ASTRO_PLANETS.SATURN]: 'U',
  [ASTRO_PLANETS.URANUS]: 'I',
  [ASTRO_PLANETS.NEPTUNE]: 'O',
  [ASTRO_PLANETS.PLUTO]: 'P',

  [ASTRO_PLANETS.PROSERPINA]: ':',
  [ASTRO_PLANETS.CHIRON]: 'M',
  [ASTRO_PLANETS.LILITH]: '`',

  [ASTRO_PLANETS.RAHU]: '{',
  [ASTRO_PLANETS.KETU]: '}',
  [ASTRO_PLANETS.FORTUNA]: '<',
  [ASTRO_PLANETS.SELENA]: '~',
}

export const ASTRO_PLANET_SVG: Record<
  string,
  FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string
      titleId?: string
      desc?: string
      descId?: string
    }
  >
> = {
  [ASTRO_PLANETS.SUN]: Sun,
  [ASTRO_PLANETS.MOON]: Moon,
  [ASTRO_PLANETS.CHIRON]: Chiron,
  [ASTRO_PLANETS.FORTUNA]: Fortuna,
  [ASTRO_PLANETS.JUPITER]: Jupiter,
  [ASTRO_PLANETS.KETU]: Ketu,
  [ASTRO_PLANETS.RAHU]: Rahu,
  [ASTRO_PLANETS.PROSERPINA]: Proserpina,
  [ASTRO_PLANETS.LILITH]: Lilith,
  [ASTRO_PLANETS.MARS]: Mars,
  [ASTRO_PLANETS.MERCURY]: Mercury,
  [ASTRO_PLANETS.VENUS]: Venus,
  [ASTRO_PLANETS.NEPTUNE]: Neptune,
  [ASTRO_PLANETS.PLUTO]: Pluto,
  [ASTRO_PLANETS.SATURN]: Saturn,
  [ASTRO_PLANETS.URANUS]: Uranus,
  [ASTRO_PLANETS.SELENA]: Selena,
}
