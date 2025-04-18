import Chiron from '@/shared/assets/icons/planet-icons/Chiron.svg'
import Fortuna from '@/shared/assets/icons/planet-icons/Fortuna.svg'
import Jupiter from '@/shared/assets/icons/planet-icons/Jupiter.svg'
import Ketu from '@/shared/assets/icons/planet-icons/Ketu.svg'
import Lilith from '@/shared/assets/icons/planet-icons/Lilith.svg'
import Mars from '@/shared/assets/icons/planet-icons/Mars.svg'
import Mercury from '@/shared/assets/icons/planet-icons/Mercury.svg'
import Moon from '@/shared/assets/icons/planet-icons/Moon.svg'
import Neptune from '@/shared/assets/icons/planet-icons/Neptune.svg'
import Pluto from '@/shared/assets/icons/planet-icons/Pluto.svg'
import Proserpina from '@/shared/assets/icons/planet-icons/Proserpina.svg'
import Rahu from '@/shared/assets/icons/planet-icons/Rahu.svg'
import Saturn from '@/shared/assets/icons/planet-icons/Saturn.svg'
import Selena from '@/shared/assets/icons/planet-icons/Selena.svg'
import Sun from '@/shared/assets/icons/planet-icons/Sun.svg'
import Uranus from '@/shared/assets/icons/planet-icons/Uranus.svg'
import Venus from '@/shared/assets/icons/planet-icons/Venus.svg'
import { ASTRO_PLANET } from '@/shared/types/astro-planets'

export const PLANET_SIGNS: Record<string, string> = {
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
