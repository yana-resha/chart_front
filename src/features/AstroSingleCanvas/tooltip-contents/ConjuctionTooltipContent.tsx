import { AspectData } from '../types'
import { Divider, mb1, Title } from './index.linaria'
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

export function ConjuctionTooltipContent({ aspects }: { aspects: Props[] }) {
  return (
    <div>
      {aspects.map((aspect, index) => {
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
          <div key={name + nameA + nameB}>
            {index > 0 && <Divider />}
            <Title>
              <HamburgSymbol style={{ color: color }}>{aspectSymbol}</HamburgSymbol> {name} {angle}°
            </Title>
            <div>
              {nameA} <HamburgSymbol>{symbolA}</HamburgSymbol> — {nameB}{' '}
              <HamburgSymbol>{symbolB}</HamburgSymbol>
            </div>
            <div className={mb1}>Орбис: {orb}°</div>
            <div>Сила аспекта: {strength}%</div>
            {isVeryExact && <div>{`Очень точный аспект (орб <= 0.5 || сила >= 95)`}</div>}
            {!isVeryExact && isExact && <div>{`Точный аспект (орб < 1)`}</div>}
          </div>
        )
      })}
    </div>
  )
}
