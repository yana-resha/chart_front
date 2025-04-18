import { ReactNode } from 'react'

export interface TooltipProps {
  children: ReactNode
  tooltipContent: string | ReactNode
  defaultYPosition?: TOOLTIP_Y_POSITION
  defaultXPosition?: TOOLTIP_X_POSITION
}

export enum TOOLTIP_Y_POSITION {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum TOOLTIP_X_POSITION {
  LEFT = 'left',
  RIGHT = 'right',
}
