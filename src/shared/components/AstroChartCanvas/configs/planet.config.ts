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
import { ASTRO_PLANETS } from '@/shared/types/astro-planets'

export const PLANET_SIGNS: Record<string, string> = {
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
