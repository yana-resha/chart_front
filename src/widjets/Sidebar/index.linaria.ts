import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { BACKGROUND_COLORS_VARIABLES, ICONS_STROKES } from '@/shared/assets/styles/colors'
import { addAlpha } from '@/shared/helpers/addAlpha'

export const Container = styled.div`
  height: 100%;
  background-color: ${BACKGROUND_COLORS_VARIABLES.SIDEBAR_BACK};
  border-radius: 20px;
  padding: 16px 8px 24px 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
`

export const TopBlock = styled.div`
  padding: 8px;
`

export const PublicAccountBlock = styled.div`
  padding: 16px;
  background: rgb(19, 22, 25);
  border-radius: 16px;
  height: 78px;
`

export const NavList = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const navlinkCSS = css`
  padding: 14px 16px 14px 16px;
  background: transparent;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  width: 100%;

  color: rgb(232, 233, 233);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
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
