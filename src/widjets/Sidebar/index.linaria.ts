import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { BACKGROUND_COLORS_VARIABLES, ICONS_STROKES } from '@/shared/assets/styles/colors'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { addAlpha } from '@/shared/helpers/addAlpha'

/** Константы */
export const SIDEBAR_UI = {
  GUTTER_X: '0.5rem',
  GUTTER_Y: '1rem',
  RADIUS: '20px',
  GAP_DESKTOP: '1.5rem',
  GAP_TABLET: '0.75rem',

  TOPBAR: {
    PADDING: '0.6rem 0.75rem',
    RADIUS: '14px',
  },

  ACCOUNT: {
    PADDING: '1rem',
    BG: 'rgb(19, 22, 25)',
    RADIUS: '16px',
    HEIGHT: '4.875rem',
  },

  NAV: {
    TRANSFORM_Y_CLOSED: -8, // px
  },

  SHEET: {
    Z_MENU: 1000,
    Z_BACKDROP: 999,
    RADIUS: '16px',
    DURATION_IN_MS: 280,
    OPACITY_IN_MS: 200,
  },
} as const

export const Container = styled.aside`
  height: 100%;
  background-color: ${BACKGROUND_COLORS_VARIABLES.SIDEBAR_BACK};
  border-radius: ${SIDEBAR_UI.RADIUS};
  padding: ${SIDEBAR_UI.GUTTER_Y} ${SIDEBAR_UI.GUTTER_X} calc(${SIDEBAR_UI.GUTTER_Y} * 1.5)
    ${SIDEBAR_UI.GUTTER_X};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${SIDEBAR_UI.GAP_DESKTOP};

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    border-radius: 0;
    margin-bottom: 0;
    gap: ${SIDEBAR_UI.GAP_TABLET};
    padding: 0.3rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 6px 12px rgba(255, 255, 255, 0.045);
  }
`

/* Десктопный блок с логотипом (на планшете скрыт) */
export const TopBlock = styled.div`
  padding: 0.8rem;
  display: block;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    display: none;
  }
`

/* Топ‑бар для планшета и ниже (логотип слева, бургер справа) */
export const MobileTopBar = styled.div`
  display: none;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: ${SIDEBAR_UI.TOPBAR.PADDING};
  }
`

export const PublicAccountBlock = styled.div`
  padding: ${SIDEBAR_UI.ACCOUNT.PADDING};
  background: ${SIDEBAR_UI.ACCOUNT.BG};
  border-radius: ${SIDEBAR_UI.ACCOUNT.RADIUS};
  /* height: ${SIDEBAR_UI.ACCOUNT.HEIGHT}; */
`

/* Десктопная навигация (в потоке) */
export const NavList = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    display: none; /* на планшете показываем отдельный NavSheet */
  }
`

/* Бэкдроп поверх контента */
export const Backdrop = styled.button<{ open: boolean }>`
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0);
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

/* Фиксированное мобильное меню (слайд‑овер) */
export const NavSheet = styled.nav<{ open: boolean; top: number }>`
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    position: fixed;
    left: 0;
    right: 0;
    top: ${({ top }) => `calc(${top}px)`};
    bottom: 0;
    display: flex;
    flex-direction: column;

    background: ${BACKGROUND_COLORS_VARIABLES.SIDEBAR_BACK};
    z-index: ${SIDEBAR_UI.SHEET.Z_MENU};

    transform: translateX(${({ open }) => (open ? 0 : `50%`)});
    opacity: ${({ open }) => (open ? 1 : 0)};
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
    transition:
      transform ${SIDEBAR_UI.SHEET.DURATION_IN_MS}ms ease,
      opacity ${SIDEBAR_UI.SHEET.OPACITY_IN_MS}ms ease;
  }

  @media (min-width: ${MEDIA_POINTS.TABLET + 1}px) {
    display: none;
  }
`

/* Прокручиваемая область внутри NavSheet */
export const NavSheetScroll = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0.5rem 0.5rem 1rem;
  overscroll-behavior: contain;
`

export const iconFs = css`
  font-size: 1.2rem;
`

export const navlinkCSS = css`
  padding: 0.85rem 1rem;
  background: transparent;
  position: relative;

  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  width: 100%;

  color: rgb(232, 233, 233);
  font-size: clamp(12px, 0.85rem, 16px);
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.15px;
  transition: color 0.2s ease;

  &:hover {
    color: rgb(155, 156, 158);

    & svg,
    & svg path {
      stroke: ${addAlpha(ICONS_STROKES.PRIMARY_DEFAULT_COLOR, 1)};
    }
  }

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    opacity: 0;
    background: linear-gradient(145.32deg, rgba(215, 237, 237, 0.16) -30.47%, rgba(204, 235, 235, 0) 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    transition: opacity 0.2s ease;
  }

  &.active:after {
    opacity: 1;
  }
`
