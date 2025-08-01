import { css } from '@linaria/core'

import { ICONS_STROKES } from './colors'
import { addAlpha } from '@/shared/helpers/addAlpha'

export const prepareIconColors = (color: string) => ({
  '--icon-color': addAlpha(color, 1),
  '--icon-hover-color': addAlpha(color, 0.7),
  '--icon-active-color': addAlpha(color, 0.9),
})

export const primaryIconCSS = css`
  ${prepareIconColors(ICONS_STROKES.PRIMARY_DEFAULT_COLOR)}
  cursor: pointer;
  width: 20px;
  height: 20px;
  stroke: var(--icon-color);
  transition: stroke 0.2s;

  & path {
    stroke: var(--icon-color);
    transition: stroke 0.2s;
  }

  &:hover,
  &:hover path {
    stroke: var(--icon-hover-color);
  }

  &:active,
  &:active path {
    stroke: var(--icon-active-color);
  }
`

export const formIconCSS = css`
  width: 24px;
  height: 24px;
`
