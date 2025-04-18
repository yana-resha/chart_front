import { css } from '@linaria/core'

import { ICONS_STROKES } from './colors'

export const primaryIconCSS = css`
  cursor: pointer;
  width: 20px;
  height: 20px;
  stroke: ${ICONS_STROKES.PRIMARY_DEFAULT_COLOR};
  transition: stroke 0.2s;
  & path {
    stroke: ${ICONS_STROKES.PRIMARY_DEFAULT_COLOR};
    transition: stroke 0.2s;
  }
  &:hover,
  &:hover path {
    stroke: ${ICONS_STROKES.PRIMARY_HOVER_COLOR};
  }

  &:active,
  &:active path {
    stroke: ${ICONS_STROKES.PRIMARY_DEFAULT_COLOR};
  }
`

export const formIconCSS = css`
  width: 24px;
  height: 24px;
`
