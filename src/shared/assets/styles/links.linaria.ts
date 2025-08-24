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

  /* ожидаются переменные:
     --link-hover-color, --link-active-color (полные цвета)
     --link-hover-rgb,   --link-active-rgb   (триплеты R,G,B) */
  display: inline-block; /* чтобы box-shadow был виден на inline-элементе */
  color: var(--link-color);
  text-decoration: underline;
  text-decoration-thickness: 0.06em;
  text-underline-offset: 0.18em;
  text-decoration-skip-ink: auto;
  cursor: pointer;
  outline: none;
  transition:
    color 0.2s,
    text-shadow 0.2s,
    box-shadow 0.2s,
    text-decoration-thickness 0.2s,
    text-underline-offset 0.2s;

  &:hover,
  &:focus-visible {
    color: var(--link-hover-color);

  &:active {
    color: var(--link-active-color);
  }
`
