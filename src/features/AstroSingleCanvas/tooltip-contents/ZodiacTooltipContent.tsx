import { Title } from './index.linaria'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import {
  ASTRO_ZODIAC_COLOR,
  ASTRO_ZODIAC_ELEMENT_NAME,
  ASTRO_ZODIAC_MODALITY_NAME,
  ASTRO_ZODIAC_NAME,
  ASTRO_ZODIAC_SIGN_IN_ELEMENT,
  ASTRO_ZODIAC_SIGN_IN_MODALITY,
  ASTRO_ZODIAC_SYMBOL,
} from '@/shared/configs/astro-zodiac.config'
import { getSignKeyByIndex } from '@/shared/helpers/astro.helper'

export function ZodiacTooltipContent({ zodiacIndex }: { zodiacIndex: number }) {
  const key = getSignKeyByIndex(zodiacIndex)
  const zodiacName = ASTRO_ZODIAC_NAME[key]
  const zodiacSymbol = ASTRO_ZODIAC_SYMBOL[key]
  const color = ASTRO_ZODIAC_COLOR[key]

  const zodiacElement = ASTRO_ZODIAC_ELEMENT_NAME[ASTRO_ZODIAC_SIGN_IN_ELEMENT[key]]
  const zodiacModality = ASTRO_ZODIAC_MODALITY_NAME[ASTRO_ZODIAC_SIGN_IN_MODALITY[key]]

  return (
    <>
      <Title>
        <HamburgSymbol style={{ color: color }}>{zodiacSymbol}</HamburgSymbol> {zodiacName}
      </Title>
      <div>
        <div>Стихия: {zodiacElement}</div>
        <div>Крест качеств: {zodiacModality}</div>
      </div>
    </>
  )
}
