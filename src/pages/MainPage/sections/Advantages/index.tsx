import { AdvantageCardTitle, AdvantagesSection, Card, CardText, Grid, Icon } from './index.linaria'
import { AdvantagesListData } from '../../data/advantages.data'
import { Inner, SectionHeadWrapper, SectionSubtitle, SectionTitle } from '../../index.linaria'

export const Advantages = () => (
  <AdvantagesSection>
    <Inner>
      <SectionHeadWrapper>
        <SectionTitle variant="light">Почему именно ASTRODOC?</SectionTitle>
        <SectionSubtitle variant="light">
          Простой и честный сервис для тех, кто хочет быстро рассчитать натальную карту.
        </SectionSubtitle>
      </SectionHeadWrapper>

      <Grid role="list">
        {AdvantagesListData.map((it) => (
          <Card
            key={it.title}
            role="listitem"
            tabIndex={0}
          >
            <Icon>{it.icon}</Icon>
            <AdvantageCardTitle>{it.title}</AdvantageCardTitle>
            <CardText>{it.text}</CardText>
          </Card>
        ))}
      </Grid>
    </Inner>
  </AdvantagesSection>
)
