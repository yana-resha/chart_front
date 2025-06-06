import classNames from 'classnames'
import { HTMLMotionProps, motion } from 'framer-motion'

import { Tooltip } from '../../../shared/components/Tooltip'
import {
  diagonalCellContentStyle,
  PlanetTooltipContent,
  TooltipTitle,
  TooltipItem,
  hamburgFamilyStyle,
  DiagonalCellContent,
} from '../index.linaria'
import { Planet } from '../types'
import {
  ASTRO_ZODIAC_INDEX,
  ASTRO_ZODIAC_COLOR,
  ASTRO_ZODIAC_SYMBOL,
} from '@/shared/configs/astro-zodiac.config'
import { getSignIndexByLongitude, getDegreeInSign, formattedDegree } from '@/shared/helpers/astro.helper'

interface Props extends HTMLMotionProps<'td'> {
  planet: Planet
}

export const PlanetDiagonalCell = ({ planet, className, ...props }: Props) => {
  const fullDegrees = planet.longitude
  const signIndex = getSignIndexByLongitude(fullDegrees)
  const { degree, minutes, seconds } = getDegreeInSign(fullDegrees)
  const zodiac = ASTRO_ZODIAC_INDEX[signIndex]
  const zodiacColor = ASTRO_ZODIAC_COLOR[zodiac]
  const signSymbol = ASTRO_ZODIAC_SYMBOL[zodiac]

  return (
    <motion.td
      className={classNames([diagonalCellContentStyle, className])}
      {...props}
    >
      <Tooltip
        tooltipContent={
          <PlanetTooltipContent>
            <TooltipTitle>{planet.label ?? planet.name}</TooltipTitle>
            <TooltipItem>
              {formattedDegree(degree)}
              <span
                className={hamburgFamilyStyle}
                style={{ color: zodiacColor }}
              >
                &ensp;{signSymbol}&ensp;
              </span>
              {formattedDegree(minutes)}&rsquo; {formattedDegree(seconds)}&apos;&apos;
            </TooltipItem>
          </PlanetTooltipContent>
        }
      >
        <DiagonalCellContent>{planet.symbol}</DiagonalCellContent>
      </Tooltip>
    </motion.td>
  )
}
