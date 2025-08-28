import React from 'react'

import { TooltipWrapper, CategoryTitle, TooltipText, AspectList, AspectItem } from './index.linaria'
import {
  ASPECT_CATEGORY_COLOR,
  ASPECT_CATEGORY_NAME,
  ASTRO_ASPECT_COLOR,
  ASTRO_ASPECT_NAME,
  ASTRO_ASPECT_SYMBOL,
} from '@/shared/configs/astro-aspects.config'
import { ASPECT_CATEGORY, IAspectCategoryStats } from '@/shared/types/astro/astro-aspects.types'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'

interface Props {
  categoryKey: ASPECT_CATEGORY
  stats: IAspectCategoryStats
}

export const AspectTooltipContent: React.FC<Props> = ({ categoryKey, stats }) => {
  const name = ASPECT_CATEGORY_NAME[categoryKey] || 'Аспекты этой категории'
  const color = ASPECT_CATEGORY_COLOR[categoryKey] || 'rgba(255,255,255,0.8)'

  const aspectsList = stats.items.length ? (
    <AspectList>
      {stats.items.map((aspect) => (
        <AspectItem key={aspect}>
          <HamburgSymbol style={{ color: ASTRO_ASPECT_COLOR[aspect] }}>
            {ASTRO_ASPECT_SYMBOL[aspect]}
          </HamburgSymbol>
          &nbsp;
          {ASTRO_ASPECT_NAME[aspect]}
        </AspectItem>
      ))}
    </AspectList>
  ) : (
    <TooltipText>нет аспектов</TooltipText>
  )

  return (
    <TooltipWrapper>
      <CategoryTitle>
        <span style={{ color }}>{name} аспекты</span> — что это?
      </CategoryTitle>
      {categoryKey === ASPECT_CATEGORY.HARMONIOUS && (
        <>
          <TooltipText>
            Это аспекты, которые формируют мягкие и благоприятные связи между планетами в натальной карте. Они
            помогают раскрывать таланты, находить лёгкие пути решения задач и создавать гармонию в жизни
            человека.
          </TooltipText>
          <TooltipText>Мы относим к этой категории следующие аспекты:</TooltipText>
          {aspectsList}
        </>
      )}
      {categoryKey === ASPECT_CATEGORY.TENSE && (
        <>
          <TooltipText>
            Это аспекты, которые создают противоречия и внутреннее напряжение между планетами. Они могут
            указывать на зоны конфликтов, испытания и задачи, которые важно прорабатывать для личностного
            роста.
          </TooltipText>
          <TooltipText>Мы относим к этой категории следующие аспекты:</TooltipText>
          {aspectsList}
        </>
      )}
      {categoryKey === ASPECT_CATEGORY.NEUTRAL && (
        <>
          <TooltipText>
            Это аспекты, которые обычно не несут ярко выраженного гармоничного или напряжённого влияния. Они
            создают фоновую взаимосвязь планет, которая может проявляться в определённых ситуациях.
          </TooltipText>
          <TooltipText>Мы относим к этой категории следующие аспекты:</TooltipText>
          {aspectsList}
        </>
      )}
      {![ASPECT_CATEGORY.HARMONIOUS, ASPECT_CATEGORY.TENSE, ASPECT_CATEGORY.NEUTRAL].includes(
        categoryKey,
      ) && (
        <>
          <TooltipText>
            Они показывают определённый тип взаимодействий между планетами в натальной карте.
          </TooltipText>
          <TooltipText>Мы относим к этой категории следующие аспекты:</TooltipText>
          {aspectsList}
        </>
      )}
    </TooltipWrapper>
  )
}
