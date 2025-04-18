import Home from '../assets/icons/home.svg?react'
import Plus from '../assets/icons/plus-circle.svg?react'
import Star from '../assets/icons/star.svg?react'
import { primaryIconCSS } from '@/shared/assets/styles/icons.linaria'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'

export const NAVIGATION_DATA = [
  {
    path: ROUTER_PATHES.DEFAULT_PATH,
    name: 'Главная',
    icon: <Home className={primaryIconCSS} />,
  },

  {
    path: '/test',
    name: 'Тест',
    icon: <Star className={primaryIconCSS} />,
  },

  {
    path: '/test2',
    name: 'Тест2',
    icon: <Plus className={primaryIconCSS} />,
  },
]
