import classNames from 'classnames'
import { HTMLMotionProps, motion } from 'framer-motion'

import { Tooltip } from '../../Tooltip'
import { getPlanetData } from '../helpers/getPlanetData'
import {
  cellContentStyle,
  AspectTooltipContent,
  TooltipTitle,
  TooltipList,
  TooltipItem,
  hamburgFamilyStyle,
  CellContent,
  cellStyle,
} from '../index.linaria'
import { Aspect, Planet } from '../types'
import {
  ASTRO_ASPECT_COLOR,
  ASTRO_ASPECT_NAME,
  ASTRO_ASPECT_SYMBOL,
} from '@/shared/configs/astro-aspects.config'

interface Props extends HTMLMotionProps<'td'> {
  aspect: Aspect
  planets: Planet[]
}

export const AspectCell = ({ aspect, planets, className = '', ...props }: Props) => {
  const { aspectType, angle, orb, isExact, isVeryExact, strength } = aspect
  const color = ASTRO_ASPECT_COLOR[aspectType]
  const name = ASTRO_ASPECT_NAME[aspectType]
  const { namePlanetA, namePlanetB, symbolPlanetA, symbolPlanetB } = getPlanetData(aspect, planets)
  const aspectSymbol = ASTRO_ASPECT_SYMBOL[aspectType]

  return (
    <motion.td
      className={classNames([cellStyle, className])}
      {...props}
    >
      <Tooltip
        placement="bottom-start"
        className={cellContentStyle}
        tooltipContent={
          <AspectTooltipContent>
            <TooltipTitle>
              {name} {angle}°
            </TooltipTitle>
            <TooltipList>
              <TooltipItem>
                {namePlanetA} <span className={hamburgFamilyStyle}>{symbolPlanetA}</span> — {namePlanetB}{' '}
                <span className={hamburgFamilyStyle}>{symbolPlanetB}</span>
              </TooltipItem>
              <TooltipItem>Орбис: {orb}°</TooltipItem>
            </TooltipList>
            <TooltipItem>Сила аспекта: {strength}%</TooltipItem>
            {isVeryExact && <TooltipItem>{'Очень точный аспект (орб ≤ 0.5 || сила ≥ 95)'}</TooltipItem>}
            {!isVeryExact && isExact && <TooltipItem>{'Точный аспект (орб < 1)'}</TooltipItem>}
          </AspectTooltipContent>
        }
      >
        <CellContent $color={color}>{aspectSymbol}</CellContent>
      </Tooltip>
    </motion.td>
  )
}
