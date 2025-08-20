import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { NavLink, useLocation } from 'react-router-dom'

import { NAVIGATION_DATA } from './data'
import {
  Container,
  MobileTopBar,
  TopBlock,
  PublicAccountBlock,
  NavList,
  NavSheet,
  NavSheetScroll,
  Backdrop,
  navlinkCSS,
} from './index.linaria'
import { BurgerIcon } from '@/shared/components/Burger'
import { Button } from '@/shared/components/Button'
import { useScrollLock } from '@/shared/hooks/useScrollLock'

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
    <Container aria-label="Навигация по сайту">
      {/* Десктопный верхний блок */}
      <TopBlock>
        <PublicAccountBlock />
      </TopBlock>

      {/* Планшетный топ-бар (логотип + бургер) */}
      <MobileTopBar ref={topBarRef}>
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
      <NavList id="sidebar-nav">
        {NAVIGATION_DATA.map((item) => (
          <NavLink
            key={item.path}
            className={navlinkCSS}
            to={item.path}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </NavList>

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
        <NavSheetScroll>
          {NAVIGATION_DATA.map((item) => (
            <NavLink
              key={item.path}
              className={navlinkCSS}
              to={item.path}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </NavSheetScroll>
      </NavSheet>
    </Container>
  )
}

export default Sidebar
