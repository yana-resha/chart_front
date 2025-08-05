import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { BACKGROUND_COLORS_VARIABLES, ICONS_STROKES } from '@/shared/assets/styles/colors'
import { addAlpha } from '@/shared/helpers/addAlpha'

export const Container = styled.aside`
  height: 100%;
  background-color: ${BACKGROUND_COLORS_VARIABLES.SIDEBAR_BACK};
  border-radius: 20px;
  padding: 1rem 0.5rem 1.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
`

export const TopBlock = styled.div`
  padding: 0.8rem;
`

export const PublicAccountBlock = styled.div`
  padding: 1rem;
  background: rgb(19, 22, 25);
  border-radius: 16px;
  height: 4.875rem;
`

export const NavList = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const navlinkCSS = css`
  padding: 0.85rem 1rem 0.85rem 1rem;
  background: transparent;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  width: 100%;

  color: rgb(232, 233, 233);
  font-size: clamp(12px, 0.85rem, 16px);
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.15px;
  transition: all 0.2s;

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
    border-radius: 8px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    background: linear-gradient(145.32deg, rgba(215, 237, 237, 0.16) -30.47%, rgba(204, 235, 235, 0) 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.2s;
  }

  &.active:after {
    opacity: 1;
  }
`
