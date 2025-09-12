import { ReactNode } from 'react'

import InfinityBack from '../assets/advantages/infinity.png'
import MapBack from '../assets/advantages/map.png'
import SettingsBack from '../assets/advantages/settings.png'
import UIBack from '../assets/advantages/ui.png'
import SettingIcon from '@/shared/assets/icons/cog.svg?react'
import Calculator from '@/shared/assets/icons/infinity.svg?react'
import Ui from '@/shared/assets/icons/interface.svg?react'

export type CardVariant = 'map' | 'settings' | 'infinity' | 'ui'

export type AdvantageItem = {
  title: string
  text: string
  variant: CardVariant
  gradientFrom: string
  gradientTo: string
  patternUrl: string
  patternOpacity?: number
  align?: 'left' | 'center'
  titleHighlight?: string
  icon: ReactNode
}

export const AdvantagesListData: AdvantageItem[] = [
  {
    title: 'Интерактивная карта',
    text: 'Наводите на планеты и дома, смотрите подсказки и связи.',
    variant: 'map',
    gradientFrom: '#3B82F6',
    gradientTo: '#9333EA',
    patternUrl: MapBack,
    patternOpacity: 0.18,
    align: 'left',
    titleHighlight: 'карта',
    icon: <SettingIcon />,
  },
  {
    title: 'Бесплатные настройки и интерпретации',
    text: 'Никаких скрытых ограничений — результат видно сразу.',
    variant: 'settings',
    gradientFrom: '#06B6D4',
    gradientTo: '#10B981',
    patternUrl: SettingsBack,
    patternOpacity: 0.18,
    align: 'center',
    titleHighlight: 'настройки',
    icon: <SettingIcon />,
  },
  {
    title: 'Неограниченные расчёты',
    text: 'Стройте сколько угодно карт — для себя, друзей или примеров.',
    variant: 'infinity',
    gradientFrom: '#F59E0B',
    gradientTo: '#EC4899',
    patternUrl: InfinityBack,
    patternOpacity: 0.18,
    align: 'left',
    titleHighlight: 'расчёты',
    icon: <Calculator />,
  },
  {
    title: 'Современный интерфейс',
    text: 'Минимализм, тёмная тема и плавные анимации.',
    variant: 'ui',
    gradientFrom: '#6366F1',
    gradientTo: '#3B82F6',
    patternUrl: UIBack,
    patternOpacity: 0.18,
    align: 'center',
    titleHighlight: 'интерфейс',
    icon: <Ui />,
  },
]
