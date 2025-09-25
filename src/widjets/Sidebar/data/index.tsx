import React from 'react'

import Collect from '../assets/icons/collect.svg?react'
import Home from '../assets/icons/home.svg?react'
import Calculator from '@/shared/assets/icons/calculator.svg?react'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'

export type NavLinkItem = {
  id: string
  type: 'link'
  path: string
  name: string
  icon?: React.ReactNode
}

export type NavGroupItem = {
  type: 'group'
  id: string
  name: string
  icon?: React.ReactNode
  children: Array<{
    path: string
    name: string
  }>
}

export type TNavItem = NavLinkItem | NavGroupItem

export const NAVIGATION_DATA: TNavItem[] = [
  { id: 'main', type: 'link', path: ROUTER_PATHES.DEFAULT_PATH, name: 'Главная', icon: <Home /> },

  {
    type: 'group',
    id: 'calculations',
    name: 'Онлайн расчёты',
    icon: <Calculator />,
    children: [{ path: ROUTER_PATHES.CALCULATOR_PATH, name: 'Натальная карта' }],
  },

  { id: 'blog', type: 'link', path: ROUTER_PATHES.POSTS_PATH, name: 'Каталог статей', icon: <Collect /> },
]
