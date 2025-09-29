import { styled } from '@linaria/react'
import { Link } from 'react-router-dom'

import { glassBackground, glassBorder, glassShadow } from '@/shared/assets/styles/glass'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

/** Константы */
export const SIDEBAR_UI = {
  GUTTER_X: '0.5rem',
  GUTTER_Y: '1rem',
  RADIUS: '20px',
  GAP_DESKTOP: '1.5rem',
  GAP_TABLET: '0.75rem',
  TOPBAR: { PADDING: '0.6rem 0.75rem', RADIUS: '14px' },
  NAV: { TRANSFORM_Y_CLOSED: -8 },
  SHEET: { Z_MENU: 1000, Z_BACKDROP: 999, RADIUS: '16px', DURATION_IN_MS: 280, OPACITY_IN_MS: 200 },
} as const

export const Container = styled.aside`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  border-radius: ${SIDEBAR_UI.RADIUS};
  ${glassBackground()};
  /* ${glassBorder()}; */
  ${glassShadow()};

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    border-radius: 0;
    margin-bottom: 0;
    gap: ${SIDEBAR_UI.GAP_TABLET};
    padding: 0.5rem 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
    box-shadow: 0 6px 12px rgba(255, 255, 255, 0.045);
  }
`

export const MobileTopBar = styled.div`
  display: none;
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
`
export const SidebarHeader = styled.div<{ glow?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 76px;
  padding: 16px 18px 14px;
  background:
    radial-gradient(90% 65% at 50% 0%, rgba(56, 196, 255, 0.08), transparent 70%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    display: none;
  }
`

export const MobileSidebarHeader = styled(SidebarHeader)`
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    display: flex;
  }
`

export const LogoLink = styled(Link)`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  grid-row-gap: 2px;

  text-decoration: none;
  user-select: none;
`

export const LogoRow = styled.div`
  display: flex;
  align-items: center; /* ровняем по центру */
  justify-content: center;
  gap: 2px; /* расстояние между иконкой и текстом */

  font-weight: 700;
  font-size: 26px;
  letter-spacing: 0.3px;
  color: rgba(255, 255, 255, 0.92);

  svg {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: 20px;
    font-weight: 500;
  }
`

export const WordLeft = styled.span<{ $collapsed?: boolean; $max?: string }>`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  font-weight: inherit;

  /* 6ch — запас под “ASTR” в любом шрифте; можно подогнать */
  max-width: ${({ $collapsed, $max = '6ch' }) => ($collapsed ? '0ch' : $max)};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};

  @media (prefers-reduced-motion: no-preference) {
    transition:
      max-width 0.35s ease,
      opacity 0.25s ease;
  }
`

/** Обёртка для слова справа от иконки */
export const WordRight = styled.span<{ $collapsed?: boolean; $max?: string }>`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  font-weight: inherit;
  max-width: ${({ $collapsed, $max = '4ch' }) => ($collapsed ? '0ch' : $max)};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};

  @media (prefers-reduced-motion: no-preference) {
    transition:
      max-width 0.35s ease,
      opacity 0.25s ease;
  }
`
export const Tagline = styled.span`
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
  letter-spacing: 0.35px;
  text-transform: uppercase;
`
export const NavList = styled.nav`
  padding: ${SIDEBAR_UI.GUTTER_Y} ${SIDEBAR_UI.GUTTER_X} calc(${SIDEBAR_UI.GUTTER_Y} * 1.5)
    ${SIDEBAR_UI.GUTTER_X};
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    display: none;
  }
`
export const Backdrop = styled.button<{ open: boolean }>`
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    position: fixed;
    inset: 0;
    height: 100dvh;
    background: rgba(0, 0, 0, 0.55); /* было 1 */
    opacity: ${({ open }) => (open ? 1 : 0)};
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
    transition: opacity 0.2s ease;
    z-index: ${SIDEBAR_UI.SHEET.Z_BACKDROP};
    border: 0;
    padding: 0;
  }
  @media (min-width: ${MEDIA_POINTS.TABLET + 1}px) {
    display: none;
  }
`
export const NavSheet = styled.nav<{ open: boolean; top: number }>`
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    position: fixed;
    inset: ${({ top }) => `${top}px 0 0 auto`}; /* top right bottom left */
    width: 60%;
    max-width: 100%;
    height: calc(100dvh - ${({ top }) => `${top}px`}); /* не вылезаем за экран */

    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
    z-index: ${SIDEBAR_UI.SHEET.Z_MENU};

    transform: translate3d(${({ open }) => (open ? '0%' : '100%')}, 0, 0);
    opacity: ${({ open }) => (open ? 1 : 0)};
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};

    transition:
      transform ${SIDEBAR_UI.SHEET.DURATION_IN_MS}ms ease,
      opacity ${SIDEBAR_UI.SHEET.OPACITY_IN_MS}ms ease;
    will-change: transform, opacity;
    -webkit-overflow-scrolling: touch;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    width: 100%;
    max-width: 100%;
  }
  @media (min-width: ${MEDIA_POINTS.TABLET + 1}px) {
    display: none;
  }
`

export const NavSheetScroll = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0.5rem 0.5rem 1rem;
  overscroll-behavior: contain;
`
