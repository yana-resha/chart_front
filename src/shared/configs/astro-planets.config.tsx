import React, { FunctionComponent } from 'react'

import { ASTRO_PLANET } from '../types/astro/astro-planets.types'
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
import chironPng from '@/shared/assets/images/planets/chiron.png'
import jupiterPng from '@/shared/assets/images/planets/jupiter.png'
import lilithPng from '@/shared/assets/images/planets/lilith.png'
import marsPng from '@/shared/assets/images/planets/mars.png'
import mercuryPng from '@/shared/assets/images/planets/mercury.png'
import moonPng from '@/shared/assets/images/planets/moon.png'
import neptunePng from '@/shared/assets/images/planets/neptune.png'
import plutoPng from '@/shared/assets/images/planets/pluto.png'
import saturnPng from '@/shared/assets/images/planets/saturn.png'
import selenaPng from '@/shared/assets/images/planets/selena.png'
import sunPng from '@/shared/assets/images/planets/sun.png'
import uranusPng from '@/shared/assets/images/planets/uranus.png'
import venusPng from '@/shared/assets/images/planets/venus.png'
import fortunaPng from '@/shared/assets/images/planets/fortuna.png'
import proserpinaPng from '@/shared/assets/images/planets/proserpina.png'

export const ASTRO_PLANET_NAME: Record<ASTRO_PLANET, string> = {
  [ASTRO_PLANET.SUN]: 'Солнце',
  [ASTRO_PLANET.MOON]: 'Луна',
  [ASTRO_PLANET.MERCURY]: 'Меркурий',
  [ASTRO_PLANET.VENUS]: 'Венера',
  [ASTRO_PLANET.MARS]: 'Марс',
  [ASTRO_PLANET.JUPITER]: 'Юпитер',
  [ASTRO_PLANET.SATURN]: 'Сатурн',
  [ASTRO_PLANET.URANUS]: 'Уран',
  [ASTRO_PLANET.NEPTUNE]: 'Нептун',
  [ASTRO_PLANET.PLUTO]: 'Плутон',

  [ASTRO_PLANET.PROSERPINA]: 'Прозерпина',
  [ASTRO_PLANET.CHIRON]: 'Хирон',
  [ASTRO_PLANET.LILITH]: 'Лилит',

  [ASTRO_PLANET.RAHU]: 'Раху',
  [ASTRO_PLANET.KETU]: 'Кету',
  [ASTRO_PLANET.FORTUNA]: 'Парс Фортуны',
  [ASTRO_PLANET.SELENA]: 'Селена',
}

export const PLANET_PRIORITY: ASTRO_PLANET[] = [
  ASTRO_PLANET.SUN,
  ASTRO_PLANET.MOON,
  ASTRO_PLANET.MERCURY,
  ASTRO_PLANET.VENUS,
  ASTRO_PLANET.MARS,
  ASTRO_PLANET.JUPITER,
  ASTRO_PLANET.SATURN,
  ASTRO_PLANET.URANUS,
  ASTRO_PLANET.NEPTUNE,
  ASTRO_PLANET.PLUTO,

  ASTRO_PLANET.KETU, // кету в прошлой жизни
  ASTRO_PLANET.RAHU, // в текущей жизни

  ASTRO_PLANET.CHIRON,
  ASTRO_PLANET.LILITH,
  ASTRO_PLANET.SELENA,
  ASTRO_PLANET.PROSERPINA,
  ASTRO_PLANET.FORTUNA,
]

export const ASTRO_PLANET_SYMBOL: Record<ASTRO_PLANET, string> = {
  [ASTRO_PLANET.SUN]: 'Q',
  [ASTRO_PLANET.MOON]: 'W',
  [ASTRO_PLANET.MERCURY]: 'E',
  [ASTRO_PLANET.VENUS]: 'R',
  [ASTRO_PLANET.MARS]: 'T',
  [ASTRO_PLANET.JUPITER]: 'Y',
  [ASTRO_PLANET.SATURN]: 'U',
  [ASTRO_PLANET.URANUS]: 'I',
  [ASTRO_PLANET.NEPTUNE]: 'O',
  [ASTRO_PLANET.PLUTO]: 'P',

  [ASTRO_PLANET.PROSERPINA]: ':',
  [ASTRO_PLANET.CHIRON]: 'M',
  [ASTRO_PLANET.LILITH]: '`',

  [ASTRO_PLANET.RAHU]: '{',
  [ASTRO_PLANET.KETU]: '}',
  [ASTRO_PLANET.FORTUNA]: '<',
  [ASTRO_PLANET.SELENA]: '~',
}

export const ASTRO_PLANET_SVG: Record<
  ASTRO_PLANET,
  FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string
      titleId?: string
      desc?: string
      descId?: string
    }
  >
> = {
  [ASTRO_PLANET.SUN]: Sun,
  [ASTRO_PLANET.MOON]: Moon,
  [ASTRO_PLANET.CHIRON]: Chiron,
  [ASTRO_PLANET.FORTUNA]: Fortuna,
  [ASTRO_PLANET.JUPITER]: Jupiter,
  [ASTRO_PLANET.KETU]: Ketu,
  [ASTRO_PLANET.RAHU]: Rahu,
  [ASTRO_PLANET.PROSERPINA]: Proserpina,
  [ASTRO_PLANET.LILITH]: Lilith,
  [ASTRO_PLANET.MARS]: Mars,
  [ASTRO_PLANET.MERCURY]: Mercury,
  [ASTRO_PLANET.VENUS]: Venus,
  [ASTRO_PLANET.NEPTUNE]: Neptune,
  [ASTRO_PLANET.PLUTO]: Pluto,
  [ASTRO_PLANET.SATURN]: Saturn,
  [ASTRO_PLANET.URANUS]: Uranus,
  [ASTRO_PLANET.SELENA]: Selena,
}

export const ASTRO_PLANET_IMAGE: Record<ASTRO_PLANET, string> = {
  [ASTRO_PLANET.SUN]: sunPng,
  [ASTRO_PLANET.MOON]: moonPng,
  [ASTRO_PLANET.MERCURY]: mercuryPng,
  [ASTRO_PLANET.VENUS]: venusPng,
  [ASTRO_PLANET.MARS]: marsPng,
  [ASTRO_PLANET.JUPITER]: jupiterPng,
  [ASTRO_PLANET.SATURN]: saturnPng,
  [ASTRO_PLANET.URANUS]: uranusPng,
  [ASTRO_PLANET.NEPTUNE]: neptunePng,
  [ASTRO_PLANET.PLUTO]: plutoPng,

  [ASTRO_PLANET.CHIRON]: chironPng,
  [ASTRO_PLANET.FORTUNA]: fortunaPng,
  [ASTRO_PLANET.KETU]: moonPng,
  [ASTRO_PLANET.RAHU]: moonPng,
  [ASTRO_PLANET.PROSERPINA]: proserpinaPng,
  [ASTRO_PLANET.LILITH]: lilithPng,

  [ASTRO_PLANET.SELENA]: selenaPng,
}

export const PLANET_WEIGHTS: Record<ASTRO_PLANET, number> = {
  [ASTRO_PLANET.SUN]: 4,
  [ASTRO_PLANET.MOON]: 4,
  [ASTRO_PLANET.MERCURY]: 3,
  [ASTRO_PLANET.VENUS]: 3,
  [ASTRO_PLANET.MARS]: 3,
  [ASTRO_PLANET.JUPITER]: 2,
  [ASTRO_PLANET.SATURN]: 2,
  [ASTRO_PLANET.URANUS]: 1,
  [ASTRO_PLANET.NEPTUNE]: 1,
  [ASTRO_PLANET.PLUTO]: 1,
  [ASTRO_PLANET.CHIRON]: 0,
  [ASTRO_PLANET.PROSERPINA]: 0,
  [ASTRO_PLANET.LILITH]: 0,
  [ASTRO_PLANET.RAHU]: 0,
  [ASTRO_PLANET.KETU]: 0,
  [ASTRO_PLANET.FORTUNA]: 0,
  [ASTRO_PLANET.SELENA]: 0,
}
