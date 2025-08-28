import { css } from '@linaria/core'

export const planetCellCss = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @container aspects (max-width: 413px) {
    max-width: 95px;
  }
`

export const aspectCellCss = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @container aspects (max-width: 413px) {
    max-width: 90px;
  }
`
