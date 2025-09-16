import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import ChevronIcon from '@/shared/assets/icons/chevron-down.svg?react'
import { ICONS_STROKES } from '@/shared/assets/styles/colors'
import { addAlpha } from '@/shared/helpers/addAlpha'

/* ── NAV TOKENS: одна точка правды ───────────────────────────────────── */
export const NAV_TOKENS = {
  ROW_PADDING_Y: '0.85rem',
  ROW_PADDING_X: '1rem',
  FONT_SIZE: 'clamp(12px, 0.85rem, 16px)',
  LINE_HEIGHT: 1.3,
  FONT_WEIGHT: 400,
  LETTER_SPACING: '0.15px',
  TEXT: 'rgba(255,255,255,0.85)',
  TEXT_HOVER: 'rgba(255,255,255,0.7)',
  ICON: ICONS_STROKES.PRIMARY_DEFAULT_COLOR,
  ACTIVE_OVERLAY: 'linear-gradient(145.32deg, rgba(215,237,237,0.16) -30.47%, rgba(204,235,235,0) 100%)',
  ACTIVE_BORDER_TOP: '1px solid rgba(255,255,255,0.08)',
}

/* ── COLLAPSE GEOM ───────────────────────────────────────────────────── */
export const COLLAPSE_GEOM = {
  RAIL_LEFT: 16,
  RAIL_W: 1,
  RAIL_COLOR: '#2d2f39',
  ELBOW_W: 18,
  ELBOW_H: 18,
  ELBOW_RADIUS: 8,
  LI_GAP: 8,
  RAIL_TOP_PAD: 0,
  RAIL_TAIL_TRIM: -10,
  CHILD_FS: '0.85rem',
  CHILD_LH: 1.3,
  CHILD_PY: '0.6rem',
}
const ROW_H = `calc(${COLLAPSE_GEOM.CHILD_FS} * ${COLLAPSE_GEOM.CHILD_LH} + ${COLLAPSE_GEOM.CHILD_PY} * 2)`

/* ── БАЗА ДЛЯ РЯДОВ (NavLink/кнопка группы) ─────────────────────────── */
const ROW_TYPO = `
  color: ${NAV_TOKENS.TEXT};
  font-size: ${NAV_TOKENS.FONT_SIZE};
  font-weight: ${NAV_TOKENS.FONT_WEIGHT};
  line-height: ${NAV_TOKENS.LINE_HEIGHT};
  letter-spacing: ${NAV_TOKENS.LETTER_SPACING};
`

const ROW_BASE = `
  padding: ${NAV_TOKENS.ROW_PADDING_Y} ${NAV_TOKENS.ROW_PADDING_X};
  background: transparent; position: relative; outline: none; border: none;
  display: flex; align-items: center; gap: .8rem; width: 100%;
  cursor: pointer; text-decoration: none; transition: color .2s ease;
  ${ROW_TYPO}

  svg { font-size: 130%; color: ${NAV_TOKENS.ICON}; transition: color .3s ease-in-out; }
  &:hover { color: ${NAV_TOKENS.TEXT_HOVER}; svg { color: ${addAlpha(NAV_TOKENS.ICON, 0.7)}; } }

  &:after {
    content:''; position:absolute; inset:0; border-radius:8px; opacity:0;
    background: ${NAV_TOKENS.ACTIVE_OVERLAY};
    border-top: ${NAV_TOKENS.ACTIVE_BORDER_TOP};
    transition: opacity .5s ease;
  }
  &.active:after { opacity:1; }

  &:focus-visible { outline:2px solid ${addAlpha(NAV_TOKENS.ICON, 0.9)}; outline-offset:2px; }
`

/** Полиморфный ряд: as={NavLink} / as="button" */
export const NavRow = styled.a`
  ${ROW_BASE}
`

/** Шеврон */
export const GroupChevron = styled.span<{ open: boolean }>`
  margin-left: auto;
  display: inline-flex;
  transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
  transition: transform 0.3s ease-in-out;
  font-size: 110% !important;
`
export const ChevronDown = styled(ChevronIcon)`
  color: rgba(255, 255, 255, 0.85) !important;
`

/** Коллапс-область */
export const GroupPanel = styled.div<{ open: boolean }>`
  overflow: hidden;
  max-height: ${({ open }) => (open ? '1000px' : '0')};
  transition: max-height 0.5s ease-in-out;
`
export const GroupInner = styled.div`
  position: relative;
  margin: 0 6px;
  padding: 0 6px;
  &::before {
    content: '';
    position: absolute;
    left: ${COLLAPSE_GEOM.RAIL_LEFT}px;
    top: ${COLLAPSE_GEOM.RAIL_TOP_PAD}px;
    bottom: calc(${COLLAPSE_GEOM.RAIL_TOP_PAD}px + (${ROW_H} / 2) - ${COLLAPSE_GEOM.RAIL_TAIL_TRIM}px);
    width: ${COLLAPSE_GEOM.RAIL_W}px;
    border-radius: 2px;
    background: ${COLLAPSE_GEOM.RAIL_COLOR};
  }
`
export const GroupList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 2px 6px 0 calc(${COLLAPSE_GEOM.RAIL_LEFT}px + ${COLLAPSE_GEOM.ELBOW_W}px);
`

/** ВНИМАНИЕ: латинская C! (не перепутай с кириллической «С») */
export const ChildItem = styled.li`
  position: relative;
  margin: ${COLLAPSE_GEOM.LI_GAP / 2}px 0;
  &::before {
    content: '';
    position: absolute;
    left: -${COLLAPSE_GEOM.ELBOW_W + 6}px;
    top: calc(27% - ${COLLAPSE_GEOM.ELBOW_H / 2}px);
    width: ${COLLAPSE_GEOM.ELBOW_W}px;
    height: ${COLLAPSE_GEOM.ELBOW_H}px;
    border-bottom: ${COLLAPSE_GEOM.RAIL_W}px solid ${COLLAPSE_GEOM.RAIL_COLOR};
    border-left: ${COLLAPSE_GEOM.RAIL_W}px solid ${COLLAPSE_GEOM.RAIL_COLOR};
    border-radius: 0 0 0 ${COLLAPSE_GEOM.ELBOW_RADIUS}px;
  }
`

export const childLinkPillCSS = css`
  display: inline-flex;
  align-items: center;
  width: 100%;
  min-height: ${ROW_H};
  padding: ${COLLAPSE_GEOM.CHILD_PY} 0;
  border-radius: 14px;
  text-decoration: none;
  position: relative;
  ${ROW_TYPO}
  transition: color .5s ease;
  color: ${NAV_TOKENS.TEXT};
  &:hover {
    color: ${NAV_TOKENS.TEXT_HOVER};
  }
  &.active {
    color: ${NAV_TOKENS.ICON};
  }
`
