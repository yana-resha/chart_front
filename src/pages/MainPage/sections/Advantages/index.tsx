import {
  Card,
  CardContent,
  AdvantageCardTitle,
  CardText,
  Grid,
  AdvantagesSection,
  AdvantagesCardOverlay,
  Icon,
} from './index.linaria'
import { AdvantagesListData } from '../../data/advantages.data'
import { Inner, SectionHeadWrapper, SectionSubtitle, H2 } from '../../index.linaria'

export const Advantages = () => (
  <AdvantagesSection>
    <Inner>
      <SectionHeadWrapper>
        <H2 variant="light">Почему именно ASTRODOC?</H2>
        <SectionSubtitle variant="light">
          Простой и честный сервис для тех, кто хочет быстро рассчитать натальную карту.
        </SectionSubtitle>
      </SectionHeadWrapper>

      <Grid>
        {AdvantagesListData.map((it) => (
          <Card
            key={it.variant}
            gradientFrom={it.gradientFrom}
            gradientTo={it.gradientTo}
            patternUrl={it.patternUrl}
            patternOpacity={it.patternOpacity}
            align="center"
          >
            <AdvantagesCardOverlay className="card-overlay" />
            <span
              className="ring"
              aria-hidden
            />
            <span
              className="glare"
              aria-hidden
            />
            <Icon>{it.icon}</Icon>
            <CardContent align="center">
              <AdvantageCardTitle>{it.title}</AdvantageCardTitle>
              <CardText>{it.text}</CardText>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Inner>
  </AdvantagesSection>
)
