import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'

import Logo from './assets/icons/logo.svg?react'
import { NAVIGATION_DATA } from './data'
import {
  Backdrop,
  Container,
  LogoLink,
  LogoRow,
  MobileSidebarHeader,
  MobileTopBar,
  NavList,
  NavSheet,
  NavSheetScroll,
  SidebarHeader,
  Tagline,
  WordLeft,
  WordRight,
} from './index.layout.linaria'
import { NavItem } from './ui/NavItem'
import { BurgerIcon } from '@/shared/components/Burger'
import { Button } from '@/shared/components/Button'
import { useScrollLock } from '@/shared/hooks/useScrollLock'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const topBarRef = useRef<HTMLDivElement | null>(null)
  const [topBarH, setTopBarH] = useState(64)
  const { pathname } = useLocation()

  useScrollLock(open)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
            >
              <MobileSidebarHeader>
                <LogoLink to="/">
                  <LogoRow>
                    ASTR
                    <Logo />
                    DOC
                  </LogoRow>
                  <Tagline>астрологический сервис</Tagline>
                </LogoLink>
              </MobileSidebarHeader>

              <NavSheetScroll>
                {NAVIGATION_DATA.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </NavSheetScroll>
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
        <SidebarHeader>
          <LogoLink to="/">
            <LogoRow>
              ASTR
              <Logo />
              DOC
            </LogoRow>
            <Tagline>астрологический сервис</Tagline>
          </LogoLink>
        </SidebarHeader>

        <MobileTopBar>
          <LogoLink to={''}>
            <LogoRow $collapsed={open}>
              <WordLeft
                $collapsed={open}
                aria-hidden={open}
              >
                ASTR
              </WordLeft>
              <Logo aria-label="ASTRODOC" />
              <WordRight
                $collapsed={open}
                aria-hidden={open}
              >
                DOC
              </WordRight>
            </LogoRow>
          </LogoLink>
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
        <NavList id="sidebar-nav">
          {NAVIGATION_DATA.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </NavList>
      </Container>

      {portalLayer}
    </>
  )
}

export default Sidebar
