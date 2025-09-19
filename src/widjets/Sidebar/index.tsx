import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { createPortal } from 'react-dom' // ⬅️ добавили
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
  if (item.type === 'group') {
    return (
      <CollapsibleNavGroup
        key={item.id}
        item={item}
      />
    )
  }

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

  const topBarRef = useRef<HTMLDivElement | null>(null)
  const [topBarH, setTopBarH] = useState(64)

  useScrollLock(open)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [])

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

  // ⬇️ Рендер слоя через портал (вне контейнера с backdrop-filter)
  const portalLayer =
    typeof document !== 'undefined'
      ? createPortal(
          <>
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
          </>,
          document.body,
        )
      : null

  return (
    <>
      <Container
        aria-label="Навигация по сайту"
        ref={topBarRef}
      >
        <TopBlock>
          <PublicAccountBlock>AstroDос</PublicAccountBlock>
        </TopBlock>

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

        <NavList id="sidebar-nav">{NAVIGATION_DATA.map(renderItem)}</NavList>
      </Container>

      {portalLayer}
    </>
  )
}

export default Sidebar
