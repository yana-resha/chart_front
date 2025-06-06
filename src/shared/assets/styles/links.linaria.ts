import { css } from '@linaria/core'

import { addAlpha } from '@/shared/helpers/addAlpha'

export enum LINK_COLORS {
  LINK_DEFAULT_COLOR = 'rgb(22,238,246)',
}

// Функция для установки кастомного цвета через переменные
export const prepareLinkTextColors = (color: string) => ({
  '--link-color': addAlpha(color, 1),
  '--link-hover-color': addAlpha(color, 0.75),
  '--link-active-color': addAlpha(color, 0.9),
})

export const linkTextCss = css`
  ${prepareLinkTextColors(LINK_COLORS.LINK_DEFAULT_COLOR)}

  color: var(--link-color);
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--link-hover-color);
  }

  &:active {
    color: var(--link-active-color);
  }
`
