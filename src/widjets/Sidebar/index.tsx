import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { NavLink, useLocation } from 'react-router-dom'

import { CollapsibleNavGroup } from './CollapsibleNavGroup'
import { NAVIGATION_DATA, NavItem } from './data'
import {
  Backdrop,
  Container,
  MobileTopBar,
  NavList,
  NavSheet,
  NavSheetScroll,
  PublicAccountBlock,
  TopBlock,
} from './index.layout.linaria'
import { NavRow } from './index.nav.linaria'
import { BurgerIcon } from '@/shared/components/Burger'
import { Button } from '@/shared/components/Button'
import { useScrollLock } from '@/shared/hooks/useScrollLock'

function renderItem(item: NavItem) {
  if (item.type === 'group')
    return (
      <CollapsibleNavGroup
        key={item.id}
        item={item}
      />
    )

  return (
    <NavRow
      key={item.path}
      as={NavLink}
      to={item.path}
    >
      {item.icon}
      {item.name}
    </NavRow>
  )
}

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // высота MobileTopBar, чтобы NavSheet начинался сразу под ним
  const topBarRef = useRef<HTMLDivElement | null>(null)
  const [topBarH, setTopBarH] = useState(64)

  // убрать скролл
  useScrollLock(open, 'fixed')

  // закрыть на переход
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // закрыть по Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // замер высоты топ-бара
  useLayoutEffect(() => {
    const measure = () => {
      if (!topBarRef.current) return
      const h = Math.ceil(topBarRef.current.getBoundingClientRect().height)
      if (h) setTopBarH(h)
    }
    measure()
    window.addEventListener('resize', measure)

    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <Container
      aria-label="Навигация по сайту"
      ref={topBarRef}
    >
      {/* Десктопный верхний блок */}
      <TopBlock>
        <PublicAccountBlock>AstroDос</PublicAccountBlock>
      </TopBlock>

      {/* Планшетный топ-бар (логотип + бургер) */}
      <MobileTopBar>
        <PublicAccountBlock />
        <Button
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-controls="sidebar-nav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          theme="secondary"
          kind="text"
        >
          <BurgerIcon open={open} />
        </Button>
      </MobileTopBar>

      {/* Десктопная навигация (в потоке) */}
      <NavList id="sidebar-nav">{NAVIGATION_DATA.map(renderItem)}</NavList>

      {/* Мобильный шит поверх верстки */}
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
      />

      <NavSheet
        open={open}
        top={topBarH}
        aria-hidden={!open}
      >
        <NavSheetScroll>{NAVIGATION_DATA.map(renderItem)}</NavSheetScroll>
      </NavSheet>
    </Container>
  )
}

export default Sidebar
