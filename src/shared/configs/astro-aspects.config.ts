import { ASTRO_ASPECT } from '../types/astro-aspects'

export const ASTRO_ASPECT_NAME: Record<ASTRO_ASPECT, string> = {
  [ASTRO_ASPECT.CONJUCTION]: 'Соединение',
  [ASTRO_ASPECT.OPPOSITION]: 'Оппозиция',
  [ASTRO_ASPECT.TRINE]: 'Тригон',
  [ASTRO_ASPECT.SQUARE]: 'Квадрат',
  [ASTRO_ASPECT.SEXTILE]: 'Cекстиль',
  [ASTRO_ASPECT.QUINCUNX]: 'Квинконс',
}

export const ASTRO_MAJOR_ASPECT: ASTRO_ASPECT[] = [
  ASTRO_ASPECT.CONJUCTION,
  ASTRO_ASPECT.OPPOSITION,
  ASTRO_ASPECT.TRINE,
  ASTRO_ASPECT.SQUARE,
  ASTRO_ASPECT.SEXTILE,
]

export const ASTRO_ASPECT_SYMBOL: Record<ASTRO_ASPECT, string> = {
  [ASTRO_ASPECT.CONJUCTION]: 'q',
  [ASTRO_ASPECT.OPPOSITION]: 'w',
  [ASTRO_ASPECT.TRINE]: 'e',
  [ASTRO_ASPECT.SQUARE]: 'r',
  [ASTRO_ASPECT.SEXTILE]: 't',
  [ASTRO_ASPECT.QUINCUNX]: 'o',
}

export const ASTRO_ASPECT_COLOR: Record<ASTRO_ASPECT, string> = {
  [ASTRO_ASPECT.CONJUCTION]: 'rgba(59, 130, 246, 1)', // Синий
  [ASTRO_ASPECT.OPPOSITION]: 'rgba(239, 68, 68, 1)', // Красный
  [ASTRO_ASPECT.TRINE]: 'rgba(16, 185, 129, 1)', // Зелёный
  [ASTRO_ASPECT.SQUARE]: 'rgba(219, 39, 119, 1)', // Розовый
  [ASTRO_ASPECT.SEXTILE]: 'rgba(251, 191, 36, 1)', // Жёлтый (оставлен по умолчанию)
  [ASTRO_ASPECT.QUINCUNX]: 'rgba(6, 182, 212, 1)', // Голубой
}
