import React, { ReactNode } from 'react'

import InfoIcon from '@/shared/assets/icons/info-circle.svg?react'
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
    <InfoIcon
      className={primaryIconCSS}
      style={color ? (prepareIconColors(color) as React.CSSProperties) : {}}
    />
  </Tooltip>
)
