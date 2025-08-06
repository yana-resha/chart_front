import classNames from 'classnames'

import Home from '../assets/icons/home.svg?react'
import Star from '../assets/icons/star.svg?react'
import { iconFs } from '../index.linaria'
import { primaryIconCSS } from '@/shared/assets/styles/icons.linaria'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'

export const NAVIGATION_DATA = [
  {
    path: ROUTER_PATHES.DEFAULT_PATH,
    name: 'Главная',
    icon: <Home className={classNames([primaryIconCSS, iconFs])} />,
  },

  {
    path: ROUTER_PATHES.CALCULATOR_PATH,
    name: 'Натальная карта',
    icon: <Star className={classNames([primaryIconCSS, iconFs])} />,
  },
]
