import { useMemo } from 'react'

import { Layout, ListHeader } from '../index.linaria'
import { element, modality, sign } from './data/balanceTooltips.data'
import { detriment, domicile, exaltation, fall, retro } from './data/essentialsTooltip.data'
import {
  BalanceGrid,
  Card,
  List,
  ModalitiesCard,
  PlanetInDegressGrid,
  PlanetsContentLayout,
  RetroGrid,
  SectionBlock,
  Title,
} from './index.linaria'
import { IPlanet } from '@/entities/astro-charts/types/astro-items.types'
import { PlanetsInDegreesTable } from '@/features/PlanetsInDegreesTable'
import { ExpandableWrapper } from '@/shared/components/ExpandableWrapper'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { InfoTooltip } from '@/shared/components/InfoTooltip'
import { ASTRO_ESSENTIAL_DIGNITY_NAME } from '@/shared/configs/astro-essential-dignity'
import { ASTRO_PLANET_SYMBOL, ASTRO_PLANET_NAME } from '@/shared/configs/astro-planets.config'
import {
  ASTRO_ZODIAC_ELEMENT_SYMBOL,
  ASTRO_ZODIAC_ELEMENT_NAME,
  ASTRO_ZODIAC_MODALITY_SYMBOL,
  ASTRO_ZODIAC_MODALITY_NAME,
  ASTRO_ZODIAC_COLOR,
  ASTRO_ZODIAC_SYMBOL,
  ASTRO_ZODIAC_NAME,
  ASTRO_ZODIAC_INDEX,
} from '@/shared/configs/astro-zodiac.config'
import { getPlanetEssentialDignity } from '@/shared/helpers/astro/getPlanetEssentialDignity'
import {
  getPlanetsElementStats,
  getSortedElementsByPercentage,
} from '@/shared/helpers/astro/getPlanetsElementStats'
import {
  getPlanetsModalityStats,
  getSortedModalitiesByPercentage,
} from '@/shared/helpers/astro/getPlanetsModalityStats'
import { getPlanetsSignStats, getSortedSignsByPercentage } from '@/shared/helpers/astro/getPlanetsSignStats'
import { getSignIndexByLongitude } from '@/shared/helpers/astro.helper'
import { ASTRO_ESSENTIAL_DIGNITY, ASTRO_ZODIAC } from '@/shared/types/astro/astro-zodiac.types'

interface Props {
  planets: IPlanet[]
  houses: number[]
}
export const PlanetsContent = ({ planets, houses }: Props) => {
  const signStats = getPlanetsSignStats(planets)
  const sortedSigns = useMemo(() => getSortedSignsByPercentage(signStats), [signStats])

  const elementStats = getPlanetsElementStats(planets)
  const sortedElements = useMemo(() => getSortedElementsByPercentage(elementStats), [elementStats])

  const modalityStats = getPlanetsModalityStats(planets)
  const sortedModalities = useMemo(() => getSortedModalitiesByPercentage(modalityStats), [modalityStats])

  const retroPlanets = planets.filter((p) => p.isRetrograde)

  const dignityMap: Record<ASTRO_ESSENTIAL_DIGNITY, IPlanet[]> = {
    [ASTRO_ESSENTIAL_DIGNITY.DOMICILE]: [],
    [ASTRO_ESSENTIAL_DIGNITY.EXALTATION]: [],
    [ASTRO_ESSENTIAL_DIGNITY.DETRIMENT]: [],
    [ASTRO_ESSENTIAL_DIGNITY.FALL]: [],
  }

  planets.forEach((p) => {
    const signIndex = getSignIndexByLongitude(p.longitude)
    const sign = ASTRO_ZODIAC_INDEX[signIndex] as ASTRO_ZODIAC
    const dignity = getPlanetEssentialDignity(p.name, sign)
    if (dignity) dignityMap[dignity].push(p)
  })

  const tooltipByDignity: Record<ASTRO_ESSENTIAL_DIGNITY, string> = {
    [ASTRO_ESSENTIAL_DIGNITY.DOMICILE]: domicile,
    [ASTRO_ESSENTIAL_DIGNITY.EXALTATION]: exaltation,
    [ASTRO_ESSENTIAL_DIGNITY.DETRIMENT]: detriment,
    [ASTRO_ESSENTIAL_DIGNITY.FALL]: fall,
  }

  const order: ASTRO_ESSENTIAL_DIGNITY[] = [
    ASTRO_ESSENTIAL_DIGNITY.DOMICILE,
    ASTRO_ESSENTIAL_DIGNITY.EXALTATION,
    ASTRO_ESSENTIAL_DIGNITY.DETRIMENT,
    ASTRO_ESSENTIAL_DIGNITY.FALL,
  ]

  const maxHeight = 350

  return (
    <Layout>
      <PlanetsContentLayout>
        <SectionBlock>
          <ListHeader>🪐 Положения планет</ListHeader>
          <ExpandableWrapper maxHeight={maxHeight}>
            <PlanetInDegressGrid>
              <PlanetsInDegreesTable
                planets={planets}
                houses={houses}
              />
            </PlanetInDegressGrid>
          </ExpandableWrapper>
        </SectionBlock>
        <SectionBlock>
          <ListHeader>⚖️ Баланс стихий, качеств и знаков</ListHeader>
          <BalanceGrid>
            {/* Стихии */}
            <Card>
              <Title>
                Стихии{' '}
                <InfoTooltip
                  content={
                    <div
                      style={{ whiteSpace: 'pre-line' }}
                      dangerouslySetInnerHTML={{ __html: element }}
                    />
                  }
                />
              </Title>
              <List>
                {sortedElements.map((el) => {
                  const active = elementStats.dominant.includes(el)
                  const style = {
                    fontWeight: active ? 600 : 400,
                    color: active ? 'rgb(22, 238, 246)' : 'rgba(255, 255, 255, 0.8)',
                  } as const

                  return (
                    <li key={el}>
                      <span style={{ marginRight: '6px' }}>{ASTRO_ZODIAC_ELEMENT_SYMBOL[el]}</span>
                      <span style={style}>
                        {ASTRO_ZODIAC_ELEMENT_NAME[el]}: {elementStats.percentages[el].toFixed(1)}%
                      </span>
                    </li>
                  )
                })}
              </List>
            </Card>

            {/* Знаки */}
            <Card>
              <Title>
                Знаки{' '}
                <InfoTooltip
                  content={
                    <div
                      style={{ whiteSpace: 'pre-line' }}
                      dangerouslySetInnerHTML={{ __html: sign }}
                    />
                  }
                />
              </Title>
              <List>
                {sortedSigns.map((s) => {
                  const active = signStats.dominant.includes(s)
                  const textStyle = {
                    fontWeight: active ? 600 : 400,
                    color: active ? 'rgb(22, 238, 246)' : 'rgba(255, 255, 255, 0.8)',
                  } as const

                  return (
                    <li key={s}>
                      <HamburgSymbol
                        style={{
                          color: ASTRO_ZODIAC_COLOR[s],
                          fontWeight: active ? 600 : 400,
                          marginRight: '6px',
                        }}
                      >
                        {ASTRO_ZODIAC_SYMBOL[s]}
                      </HamburgSymbol>
                      <span style={textStyle}>
                        {ASTRO_ZODIAC_NAME[s]}: {signStats.percentages[s].toFixed(1)}%
                      </span>
                    </li>
                  )
                })}
              </List>
            </Card>

            {/* Качества */}
            <ModalitiesCard>
              <Title>
                Качества{' '}
                <InfoTooltip
                  content={
                    <div
                      style={{ whiteSpace: 'pre-line' }}
                      dangerouslySetInnerHTML={{ __html: modality }}
                    />
                  }
                />
              </Title>
              <List>
                {sortedModalities.map((m) => {
                  const active = modalityStats.dominant.includes(m)
                  const style = {
                    marginRight: '6px',
                    fontWeight: active ? 600 : 400,
                    color: active ? 'rgb(22, 238, 246)' : 'rgba(255, 255, 255, 0.8)',
                  } as const

                  return (
                    <li key={m}>
                      <span style={style}>{ASTRO_ZODIAC_MODALITY_SYMBOL[m]}</span>
                      <span style={style}>
                        {ASTRO_ZODIAC_MODALITY_NAME[m]}: {modalityStats.percentages[m].toFixed(1)}%
                      </span>
                    </li>
                  )
                })}
              </List>
            </ModalitiesCard>
          </BalanceGrid>
        </SectionBlock>
        <SectionBlock>
          <ListHeader>⏪ Ретроградность и статусы планет</ListHeader>
          <RetroGrid>
            <Card>
              <Title>
                Ретро{' '}
                <InfoTooltip
                  content={
                    <div
                      style={{ whiteSpace: 'pre-line' }}
                      dangerouslySetInnerHTML={{ __html: retro }}
                    />
                  }
                />
              </Title>
              <List>
                {retroPlanets.length ? (
                  retroPlanets.map((p) => (
                    <li key={`retro-${p.name}`}>
                      <HamburgSymbol style={{ marginRight: '6px' }}>
                        {ASTRO_PLANET_SYMBOL[p.name]}
                      </HamburgSymbol>
                      <span>{ASTRO_PLANET_NAME[p.name]}</span>
                    </li>
                  ))
                ) : (
                  <li>—</li>
                )}
              </List>
            </Card>

            {order.map((d) => (
              <Card key={d}>
                <Title>
                  {ASTRO_ESSENTIAL_DIGNITY_NAME[d]}{' '}
                  <InfoTooltip
                    content={
                      <div
                        style={{ whiteSpace: 'pre-line' }}
                        dangerouslySetInnerHTML={{ __html: tooltipByDignity[d] }}
                      />
                    }
                  />
                </Title>
                <List>
                  {dignityMap[d].length ? (
                    dignityMap[d].map((p) => (
                      <li key={`${d}-${p.name}`}>
                        <HamburgSymbol style={{ marginRight: '6px' }}>
                          {ASTRO_PLANET_SYMBOL[p.name]}
                        </HamburgSymbol>
                        <span>{ASTRO_PLANET_NAME[p.name]}</span>
                      </li>
                    ))
                  ) : (
                    <li>—</li>
                  )}
                </List>
              </Card>
            ))}
          </RetroGrid>
        </SectionBlock>
      </PlanetsContentLayout>
    </Layout>
  )
}
