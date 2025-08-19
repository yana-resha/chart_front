// index.linaria.ts
import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { BACKGROUND_COLORS_VARIABLES, ICONS_STROKES } from '@/shared/assets/styles/colors'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { addAlpha } from '@/shared/helpers/addAlpha'

/** Константы для читаемости и единства */
export const SIDEBAR_UI = {
  GUTTER_X: '0.5rem',
  GUTTER_Y: '1rem',
  RADIUS: '20px',
  GAP_DESKTOP: '1.5rem',
  GAP_TABLET: '0.75rem',

  TOPBAR: {
    PADDING: '0.6rem 0.75rem',
    RADIUS: '14px',
    BORDER: '1px solid rgba(255, 255, 255, 0.06)',
    BACKDROP_BG: 'rgba(19, 22, 25, 0.75)',
  },

  ACCOUNT: {
    PADDING: '1rem',
    BG: 'rgb(19, 22, 25)',
    RADIUS: '16px',
    HEIGHT: '4.875rem',
  },

  BURGER: {
    SIZE: 40,
    RADIUS: 10,
    LINE_W: 22,
    LINE_H: 2,
    LINE_OFFSET: 6,
  },

  NAV: {
    OPEN_MAX_VH: 70, // 70vh
    TRANSFORM_Y_CLOSED: -8, // px
    DURATION: {
      HEIGHT_MS: 280,
      OPACITY_MS: 200,
      TRANSFORM_MS: 280,
    },
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
    gap: ${SIDEBAR_UI.GAP_TABLET};
    padding: 0.5rem 0.5rem 0.75rem 0.5rem;
    border-radius: 0;
  }
`

/* Верхний блок с логотипом */
export const TopBlock = styled.div`
  padding: 0.8rem;
  display: block;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    display: none;
  }
`

/* Топ-бар для планшета и ниже (логотип слева, бургер справа) */
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
  // height: ${SIDEBAR_UI.ACCOUNT.HEIGHT};
`

/* Бургер-кнопка */
export const BurgerButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  width: ${SIDEBAR_UI.BURGER.SIZE}px;
  height: ${SIDEBAR_UI.BURGER.SIZE}px;
  border-radius: ${SIDEBAR_UI.BURGER.RADIUS}px;
  position: relative;
  cursor: pointer;

  display: grid;
  place-items: center;

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
  }

  /* иконка из трёх линий */
  &::before,
  &::after,
  span {
    content: '';
    display: block;
    width: ${SIDEBAR_UI.BURGER.LINE_W}px;
    height: ${SIDEBAR_UI.BURGER.LINE_H}px;
    background: #e8e9e9;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }
  span {
    /* средняя линия */
  }

  &::before {
    transform: translateY(-${SIDEBAR_UI.BURGER.LINE_OFFSET}px);
  }
  &::after {
    transform: translateY(${SIDEBAR_UI.BURGER.LINE_OFFSET}px);
  }

  &[aria-expanded='true'] {
    /* крестик */
    &::before {
      transform: translateY(0) rotate(45deg);
    }
    &::after {
      transform: translateY(0) rotate(-45deg);
    }
    span {
      opacity: 0;
      transform: scaleX(0);
    }
  }
`

/* Навигация */
export const NavList = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transform: translateY(${SIDEBAR_UI.NAV.TRANSFORM_Y_CLOSED}px);
    transition:
      max-height ${SIDEBAR_UI.NAV.DURATION.HEIGHT_MS}ms ease,
      opacity ${SIDEBAR_UI.NAV.DURATION.OPACITY_MS}ms ease,
      transform ${SIDEBAR_UI.NAV.DURATION.TRANSFORM_MS}ms ease;

    &[data-open='true'] {
      max-height: ${SIDEBAR_UI.NAV.OPEN_MAX_VH}vh;
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
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
