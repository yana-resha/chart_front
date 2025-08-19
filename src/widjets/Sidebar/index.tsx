// Sidebar.tsx
import { useEffect, useRef, useState } from 'react'

import { NavLink, useLocation } from 'react-router-dom'

import { NAVIGATION_DATA } from './data'
import {
  Container,
  MobileTopBar,
  TopBlock,
  PublicAccountBlock,
  BurgerButton,
  NavList,
  navlinkCSS,
} from './index.linaria'
import { BurgerIcon } from '@/shared/components/Burger'

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const listRef = useRef<HTMLElement | null>(null)
  const { pathname } = useLocation()

  // Закрывать меню при переходе по ссылке
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Закрывать по Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Для плавности max-height можно измерять контент (не обязательно)
  useEffect(() => {
    if (!listRef.current) return
    if (open) {
      // раскрывая меню, выставим текущую естественную высоту, затем auto
      const el = listRef.current
      el.style.maxHeight = '0px'
      const h = el.scrollHeight
      // принудительный reflow
      void el.offsetHeight
      el.style.maxHeight = `${h}px`
      const done = () => {
        el.style.maxHeight = '70vh' // после анимации «с потолком»
        el.removeEventListener('transitionend', done)
      }
      el.addEventListener('transitionend', done)
    } else {
      if (listRef.current) {
        listRef.current.style.maxHeight = '0px'
      }
    }
  }, [open])

  return (
    <Container aria-label="Навигация по сайту">
      {/* Десктопный блок с логотипом */}
      <TopBlock>
        <PublicAccountBlock />
      </TopBlock>

      {/* Планшетный топ-бар: логотип слева + бургер справа */}
      <MobileTopBar>
        <PublicAccountBlock />
        <BurgerButton
          type="button"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-controls="sidebar-nav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <BurgerIcon open={open}/>
        </BurgerButton>
      </MobileTopBar>

      {/* Навигация: обычная колонка на десктопе; на планшете — выпадающее меню */}
      <NavList
        id="sidebar-nav"
        ref={listRef}
        data-open={open}
      >
        {NAVIGATION_DATA.map((data) => (
          <NavLink
            key={data.path}
            className={navlinkCSS}
            to={data.path}
          >
            {data.icon}
            {data.name}
          </NavLink>
        ))}
      </NavList>
    </Container>
  )
}

export default Sidebar
