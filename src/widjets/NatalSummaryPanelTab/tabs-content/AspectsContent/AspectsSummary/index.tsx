import { toRgbString } from '@/shared/assets/styles/helpers/toRgbString'
import {
  Wrapper,
  Container,
  Card,
  CardTitle,
  CardText,
  Summary,
  SummaryLine,
  Highlight,
} from './index.linaria'
import { Props } from './types'
import { AspectTooltipContent } from './ui/AspectTooltipContent'
import { InfoTooltip } from '@/shared/components/InfoTooltip'
import {
  ASPECT_CATEGORY_COLOR,
  ASPECT_CATEGORY_NAME,
  EVALUATION_ASPECTS_STRENGTH_NAME,
} from '@/shared/configs/astro-aspects.config'
import { ASPECT_CATEGORY } from '@/shared/types/astro/astro-aspects.types'

export const AspectsSummary = ({ chartAspectStatistics }: Props) => {
  const { totalAspects, maxPossibleAspects, normalizedScore, label, ...categoriesData } =
    chartAspectStatistics

  return (
    <Wrapper>
      <Summary>
        <SummaryLine>
          Всего аспектов: <Highlight>{totalAspects}</Highlight> из {maxPossibleAspects}
        </SummaryLine>
        <SummaryLine>
          Аспектов в карте относительно максимума: <Highlight>{normalizedScore}%</Highlight>
        </SummaryLine>
        <SummaryLine>
          Сила карты: <Highlight>{EVALUATION_ASPECTS_STRENGTH_NAME[label]}</Highlight>
        </SummaryLine>
      </Summary>

      <Container>
        {Object.values(ASPECT_CATEGORY).map((category) => {
          const stats = categoriesData[category]
          const color = ASPECT_CATEGORY_COLOR[category]
          const title = ASPECT_CATEGORY_NAME[category]

          return (
            <Card
              key={category}
              color={toRgbString(color)}
            >
              <CardTitle>
                {title}&nbsp;
                <InfoTooltip
                  color={color}
                  mobileTitle={`${ASPECT_CATEGORY_NAME[category]} аспекты`}
                  content={
                    <AspectTooltipContent
                      categoryKey={category}
                      stats={stats}
                    />
                  }
                />
              </CardTitle>
              <CardText>{stats.count} аспектов</CardText>
              <CardText>{stats.percent}% от всех аспектов</CardText>
            </Card>
          )
        })}
      </Container>
    </Wrapper>
  )
}
