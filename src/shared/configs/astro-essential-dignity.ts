import { ASTRO_PLANET } from '../types/astro/astro-planets.types'
import { ASTRO_ESSENTIAL_DIGNITY, ASTRO_ZODIAC } from '../types/astro/astro-zodiac.types'

export const ASTRO_ESSENTIAL_DIGNITY_NAME: Record<ASTRO_ESSENTIAL_DIGNITY, string> = {
  [ASTRO_ESSENTIAL_DIGNITY.DOMICILE]: 'Обитель',
  [ASTRO_ESSENTIAL_DIGNITY.DETRIMENT]: 'Изгнание',
  [ASTRO_ESSENTIAL_DIGNITY.EXALTATION]: 'Экзальтация',
  [ASTRO_ESSENTIAL_DIGNITY.FALL]: 'Падение',
}

export const PLANET_DOMICILE_SIGNS: Record<ASTRO_PLANET, ASTRO_ZODIAC[]> = {
  [ASTRO_PLANET.SUN]: [ASTRO_ZODIAC.LEO],
  [ASTRO_PLANET.MOON]: [ASTRO_ZODIAC.CANCER],
  [ASTRO_PLANET.MERCURY]: [ASTRO_ZODIAC.GEMINI, ASTRO_ZODIAC.VIRGO],
  [ASTRO_PLANET.VENUS]: [ASTRO_ZODIAC.TAURUS, ASTRO_ZODIAC.LIBRA],
  [ASTRO_PLANET.MARS]: [ASTRO_ZODIAC.ARIES, ASTRO_ZODIAC.SCORPIO],
  [ASTRO_PLANET.JUPITER]: [ASTRO_ZODIAC.SAGITTARIUS, ASTRO_ZODIAC.PISCES],
  [ASTRO_PLANET.SATURN]: [ASTRO_ZODIAC.CAPRICORN, ASTRO_ZODIAC.AQUARIUS],
  [ASTRO_PLANET.URANUS]: [],
  [ASTRO_PLANET.NEPTUNE]: [],
  [ASTRO_PLANET.PLUTO]: [],
  [ASTRO_PLANET.CHIRON]: [],
  [ASTRO_PLANET.PROSERPINA]: [],
  [ASTRO_PLANET.LILITH]: [],
  [ASTRO_PLANET.RAHU]: [],
  [ASTRO_PLANET.KETU]: [],
  [ASTRO_PLANET.FORTUNA]: [],
  [ASTRO_PLANET.SELENA]: [],
}

export const PLANET_DETRIMENT_SIGNS: Record<ASTRO_PLANET, ASTRO_ZODIAC[]> = {
  [ASTRO_PLANET.SUN]: [ASTRO_ZODIAC.AQUARIUS],
  [ASTRO_PLANET.MOON]: [ASTRO_ZODIAC.CAPRICORN],
  [ASTRO_PLANET.MERCURY]: [ASTRO_ZODIAC.SAGITTARIUS, ASTRO_ZODIAC.PISCES],
  [ASTRO_PLANET.VENUS]: [ASTRO_ZODIAC.ARIES, ASTRO_ZODIAC.SCORPIO],
  [ASTRO_PLANET.MARS]: [ASTRO_ZODIAC.LIBRA, ASTRO_ZODIAC.TAURUS],
  [ASTRO_PLANET.JUPITER]: [ASTRO_ZODIAC.GEMINI, ASTRO_ZODIAC.VIRGO],
  [ASTRO_PLANET.SATURN]: [ASTRO_ZODIAC.CANCER, ASTRO_ZODIAC.LEO],
  [ASTRO_PLANET.URANUS]: [],
  [ASTRO_PLANET.NEPTUNE]: [],
  [ASTRO_PLANET.PLUTO]: [],
  [ASTRO_PLANET.CHIRON]: [],
  [ASTRO_PLANET.PROSERPINA]: [],
  [ASTRO_PLANET.LILITH]: [],
  [ASTRO_PLANET.RAHU]: [],
  [ASTRO_PLANET.KETU]: [],
  [ASTRO_PLANET.FORTUNA]: [],
  [ASTRO_PLANET.SELENA]: [],
}

export const PLANET_EXALTATION_SIGNS: Record<ASTRO_PLANET, ASTRO_ZODIAC[]> = {
  [ASTRO_PLANET.SUN]: [ASTRO_ZODIAC.ARIES],
  [ASTRO_PLANET.MOON]: [ASTRO_ZODIAC.TAURUS],
  [ASTRO_PLANET.MERCURY]: [ASTRO_ZODIAC.VIRGO],
  [ASTRO_PLANET.VENUS]: [ASTRO_ZODIAC.PISCES],
  [ASTRO_PLANET.MARS]: [ASTRO_ZODIAC.CAPRICORN],
  [ASTRO_PLANET.JUPITER]: [ASTRO_ZODIAC.CANCER],
  [ASTRO_PLANET.SATURN]: [ASTRO_ZODIAC.LIBRA],
  [ASTRO_PLANET.URANUS]: [],
  [ASTRO_PLANET.NEPTUNE]: [],
  [ASTRO_PLANET.PLUTO]: [],
  [ASTRO_PLANET.CHIRON]: [],
  [ASTRO_PLANET.PROSERPINA]: [],
  [ASTRO_PLANET.LILITH]: [],
  [ASTRO_PLANET.RAHU]: [],
  [ASTRO_PLANET.KETU]: [],
  [ASTRO_PLANET.FORTUNA]: [],
  [ASTRO_PLANET.SELENA]: [],
}

export const PLANET_FALL_SIGNS: Record<ASTRO_PLANET, ASTRO_ZODIAC[]> = {
  [ASTRO_PLANET.SUN]: [ASTRO_ZODIAC.LIBRA],
  [ASTRO_PLANET.MOON]: [ASTRO_ZODIAC.SCORPIO],
  [ASTRO_PLANET.MERCURY]: [ASTRO_ZODIAC.PISCES],
  [ASTRO_PLANET.VENUS]: [ASTRO_ZODIAC.VIRGO],
  [ASTRO_PLANET.MARS]: [ASTRO_ZODIAC.CANCER],
  [ASTRO_PLANET.JUPITER]: [ASTRO_ZODIAC.CAPRICORN],
  [ASTRO_PLANET.SATURN]: [ASTRO_ZODIAC.ARIES],
  [ASTRO_PLANET.URANUS]: [],
  [ASTRO_PLANET.NEPTUNE]: [],
  [ASTRO_PLANET.PLUTO]: [],
  [ASTRO_PLANET.CHIRON]: [],
  [ASTRO_PLANET.PROSERPINA]: [],
  [ASTRO_PLANET.LILITH]: [],
  [ASTRO_PLANET.RAHU]: [],
  [ASTRO_PLANET.KETU]: [],
  [ASTRO_PLANET.FORTUNA]: [],
  [ASTRO_PLANET.SELENA]: [],
}
