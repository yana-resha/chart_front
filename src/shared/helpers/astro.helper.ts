import { ASTRO_ZODIAC_INDEX } from '../configs/astro-zodiac.config'
import { ASTRO_ZODIAC } from '../types/astro/astro-zodiac.types'

// вернет номер индекса дома в котором находится координата (Например найти в каком доме находится планета)
export function getHouseIndexBySmth(long: number, houseCusps: number[]): number | undefined {
  // Найдём индекс дома (от 1 до 12)
  let houseIndex: number | undefined

  for (let i = 0; i < houseCusps.length; i++) {
    const cuspStart = houseCusps[i]
    const cuspEnd = houseCusps[(i + 1) % 12] // следующий дом, с учетом замыкания

    if (cuspStart < cuspEnd) {
      if (long >= cuspStart && long < cuspEnd) {
        houseIndex = i + 1
        break
      }
    } else {
      // сектор переходит через 360 → 0 (например, 11 дом: 330°–20°)
      if (long >= cuspStart || long < cuspEnd) {
        houseIndex = i + 1
        break
      }
    }
  }

  return houseIndex
}

// вернет индекс знака зодиака от 1 до 12
export function getSignIndexByLongitude(long: number): number {
  return Math.floor(long / 30) + 1
}

export function getSignNameByLongitude(long: number): ASTRO_ZODIAC {
  return ASTRO_ZODIAC_INDEX[Math.floor(long / 30) + 1]
}

export function getSignKeyByIndex(index: number): ASTRO_ZODIAC {
  return ASTRO_ZODIAC_INDEX[index]
}

// вернет расположение в знаке зодиака
export function getDegreeInSign(long: number): { degree: number; minutes: number; seconds: number } {
  const degreeInSign = Math.floor(long % 30)
  const totalMinutes = (long % 1) * 60
  const minutes = Math.floor(totalMinutes)
  const seconds = Math.floor((totalMinutes % 1) * 60)

  return {
    degree: degreeInSign,
    minutes,
    seconds,
  }
}

export const formattedDegree = (number: number) => ('0' + number).slice(-2)
