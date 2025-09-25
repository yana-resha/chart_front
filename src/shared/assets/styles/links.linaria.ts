import { css } from '@linaria/core'

import { addAlpha } from '@/shared/assets/styles/helpers/addAlpha'

export enum LINK_COLORS {
  LINK_DEFAULT_COLOR = 'rgb(22,238,246)',
}

// Функция для установки кастомного цвета через переменные
export const prepareLinkTextColors = (color: string) => ({
  '--link-color': addAlpha(color, 1),
  '--link-hover-color': addAlpha(color, 0.75),
  '--link-active-color': addAlpha(color, 0.9),
  '--link-focus-visible-color': addAlpha(color, 0.1),
})

export const linkTextCss = css`
  ${prepareLinkTextColors(LINK_COLORS.LINK_DEFAULT_COLOR)}

  display: inline-block;
  position: relative;
  white-space: nowrap;
  color: var(--link-color);
  cursor: pointer;
  font-weight: inherit;
  outline: none;
  text-decoration: none; /* базово убрали подчёркивание */

  transition: color 0.2s;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0em;
    height: 1px;
    background: var(--link-hover-color);
    transform: scaleX(0);
    transform-origin: 0 50%;
    transition: transform 350ms ease;
    will-change: transform;
    pointer-events: none;
    border-radius: 2px;
  }

  &:hover,
  &:focus-visible {
    color: var(--link-hover-color);
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }

  &:active {
    color: var(--link-active-color);
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`
