import React, { ReactNode } from 'react'

import { Info } from './index.linaria'
import { prepareIconColors, primaryIconCSS } from '@/shared/assets/styles/icons.linaria'
import { Tooltip } from '@/shared/components/Tooltip'

interface InfoTooltipProps {
  mobileTitle: string | ReactNode
  content: ReactNode
  color?: string
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, color, mobileTitle }) => (
  <Tooltip
    trigger="click"
    mobileTitle={mobileTitle}
    tooltipContent={content}
    style={{ display: 'inline' }}
  >
    <Info
      tabIndex={0}
      role="button"
      className={primaryIconCSS}
      style={color ? (prepareIconColors(color) as React.CSSProperties) : {}}
    />
  </Tooltip>
)
