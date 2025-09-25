import {
  ASPECT_CATEGORY,
  ASTRO_ASPECT,
  EVALUATION_ASPECTS_STRENGTH,
} from '../types/astro/astro-aspects.types'

export const ASTRO_ASPECT_NAME: Record<ASTRO_ASPECT, string> = {
  [ASTRO_ASPECT.CONJUCTION]: 'Соединение',
  [ASTRO_ASPECT.OPPOSITION]: 'Оппозиция',
  [ASTRO_ASPECT.TRINE]: 'Тригон',
  [ASTRO_ASPECT.SQUARE]: 'Квадрат',
  [ASTRO_ASPECT.SEXTILE]: 'Cекстиль',
  [ASTRO_ASPECT.QUINCUNX]: 'Квиконс',
}

export const ASTRO_MAJOR_ASPECT: ASTRO_ASPECT[] = [
  ASTRO_ASPECT.CONJUCTION,
  ASTRO_ASPECT.OPPOSITION,
  ASTRO_ASPECT.TRINE,
  ASTRO_ASPECT.SQUARE,
  ASTRO_ASPECT.SEXTILE,
]

export const ASPECT_PRIORITY: ASTRO_ASPECT[] = [
  ASTRO_ASPECT.CONJUCTION, // соединение
  ASTRO_ASPECT.OPPOSITION, // оппозиция
  ASTRO_ASPECT.SQUARE, // квадрат
  ASTRO_ASPECT.TRINE, // тригон
  ASTRO_ASPECT.SEXTILE, // секстиль
  ASTRO_ASPECT.QUINCUNX, // квиконс
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

export const ASPECT_CATEGORY_NAME: Record<ASPECT_CATEGORY, string> = {
  [ASPECT_CATEGORY.HARMONIOUS]: 'Гармоничные',
  [ASPECT_CATEGORY.TENSE]: 'Напряжённые',
  [ASPECT_CATEGORY.NEUTRAL]: 'Адаптационные',
}

export const ASPECT_CATEGORY_SYMBOL: Record<ASPECT_CATEGORY, string> = {
  [ASPECT_CATEGORY.HARMONIOUS]: '🟢',
  [ASPECT_CATEGORY.NEUTRAL]: '🟡',
  [ASPECT_CATEGORY.TENSE]: '🔴',
}

export const ASPECT_CATEGORY_COLOR: Record<ASPECT_CATEGORY, string> = {
  [ASPECT_CATEGORY.HARMONIOUS]: 'rgb(22, 238, 246)',
  [ASPECT_CATEGORY.TENSE]: 'rgb(255, 99, 132)',
  [ASPECT_CATEGORY.NEUTRAL]: 'rgb(255, 206, 86)',
}

export const EVALUATION_ASPECTS_STRENGTH_NAME: Record<EVALUATION_ASPECTS_STRENGTH, string> = {
  [EVALUATION_ASPECTS_STRENGTH.LOW]: 'Низкая',
  [EVALUATION_ASPECTS_STRENGTH.VERY_LOW]: 'Очень низкая',
  [EVALUATION_ASPECTS_STRENGTH.MIDDLE]: 'Средняя',
  [EVALUATION_ASPECTS_STRENGTH.STRONG]: 'Высокая',
  [EVALUATION_ASPECTS_STRENGTH.VERY_STRONG]: 'Очень высокая',
}

export const EVALUATION_ASPECTS_STRENGTH_SYMBOL: Record<EVALUATION_ASPECTS_STRENGTH, string> = {
  [EVALUATION_ASPECTS_STRENGTH.LOW]: '😐',
  [EVALUATION_ASPECTS_STRENGTH.VERY_LOW]: '😴',
  [EVALUATION_ASPECTS_STRENGTH.MIDDLE]: '🙂',
  [EVALUATION_ASPECTS_STRENGTH.STRONG]: '💪',
  [EVALUATION_ASPECTS_STRENGTH.VERY_STRONG]: '🚀',
}
