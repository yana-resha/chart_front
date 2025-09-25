import { styled } from '@linaria/react'

import { BACKGROUND_COLORS_VARIABLES } from '@/shared/assets/styles/colors'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { SURFACE_TOKENS } from '@/shared/assets/styles/overlays/shared'
import { glassBackground, glassBorder, glassShadow } from '@/shared/assets/styles/glass'

/** Константы */
export const SIDEBAR_UI = {
  GUTTER_X: '0.5rem',
  GUTTER_Y: '1rem',
  RADIUS: '20px',
  GAP_DESKTOP: '1.5rem',
  GAP_TABLET: '0.75rem',
  TOPBAR: { PADDING: '0.6rem 0.75rem', RADIUS: '14px' },
  ACCOUNT: { PADDING: '1rem', BG: 'rgb(19, 22, 25)', RADIUS: '16px', HEIGHT: '4.875rem' },
  NAV: { TRANSFORM_Y_CLOSED: -8 },
  SHEET: { Z_MENU: 1000, Z_BACKDROP: 999, RADIUS: '16px', DURATION_IN_MS: 280, OPACITY_IN_MS: 200 },
} as const

export const Container = styled.aside`
  height: 100%;
  padding: ${SIDEBAR_UI.GUTTER_Y} ${SIDEBAR_UI.GUTTER_X} calc(${SIDEBAR_UI.GUTTER_Y} * 1.5)
    ${SIDEBAR_UI.GUTTER_X};
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

    background-color: ${SURFACE_TOKENS.MOBILE_SHARED.BACKGROUND};
    box-shadow: 0 6px 12px rgba(255, 255, 255, 0.045);
    backdrop-filter: none;
  }
`

export const TopBlock = styled.div`
  padding: 0.8rem;
  display: block;
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    display: none;
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

export const PublicAccountBlock = styled.div`
  border-radius: ${SIDEBAR_UI.ACCOUNT.RADIUS};
  color: rgba(255, 255, 255);
  font-weight: 800;
  font-size: 36px;
`

export const NavList = styled.nav`
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
    width: 60%; /* можно вернуть min-width:60%, если нужно */
    max-width: 100%;
    height: calc(100dvh - ${({ top }) => `${top}px`}); /* не вылезаем за экран */

    display: flex;
    flex-direction: column;
    background: ${BACKGROUND_COLORS_VARIABLES.SIDEBAR_BACK};
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
