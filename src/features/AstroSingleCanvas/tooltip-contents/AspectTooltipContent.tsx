import { AspectData } from '../types'
import { mb1, Title } from './index.linaria'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { ASTRO_ASPECT_NAME } from '@/shared/configs/astro-aspects.config'

interface Props extends AspectData {
  nameA: string
  nameB: string
  symbolA: string
  symbolB: string
  aspectSymbol: string
  color: string
}

export function AspectTooltipContent(aspect: Props) {
  const {
    aspectType,
    angle,
    orb,
    isExact,
    isVeryExact,
    nameA,
    nameB,
    symbolA,
    symbolB,
    strength,
    aspectSymbol,
    color,
  } = aspect
  const name = ASTRO_ASPECT_NAME[aspectType]

  return (
    <>
      <Title className={mb1}>
        <HamburgSymbol style={{ color: color, fontSize: 'inherit' }}>{aspectSymbol}</HamburgSymbol> {name}{' '}
        {angle}°
      </Title>
      <div>
        <div>
          <HamburgSymbol>{symbolA}</HamburgSymbol> {nameA} — <HamburgSymbol>{symbolB}</HamburgSymbol> {nameB}
        </div>
        <div className={mb1}>Орбис: {orb}°</div>
        <div>Сила аспекта: {strength}%</div>
        {isVeryExact && <div>{`Очень точный аспект (орб <= 0.5 || сила >= 95)`}</div>}
        {!isVeryExact && isExact && <div>{`Точный аспект (орб < 1)`}</div>}
      </div>
    </>
  )
}
