import {
  PossibilitiesSection,
  PossibilitiesMosaic,
  PossibilityCard,
  PossibilityCardOverlay,
  PossibilityCardText,
  PossibilityCardTitle,
  PossibilityCardCaption,
} from './index.linaria'
import { PossibilitiesListData } from '../../data/possibilities.data'
import { SectionHeadWrapper, H2, SectionSubtitle } from '../../index.linaria'

export const Possibilities = () => (
  <PossibilitiesSection>
    <SectionHeadWrapper>
      <H2 variant="light">Возможности сервиса</H2>
      <SectionSubtitle variant="light">
        Технологичный астросервис с акцентом на скорость и наглядность
      </SectionSubtitle>
    </SectionHeadWrapper>
    <PossibilitiesMosaic>
      {PossibilitiesListData.map((adv) => (
        <PossibilityCard
          key={adv.id}
          $area={adv.area}
          $hue={adv.hue ?? 190}
        >
          <img
            src={adv.image}
            alt=""
            loading="lazy"
          />
          <PossibilityCardOverlay />
          <PossibilityCardText>
            <PossibilityCardTitle>{adv.title}</PossibilityCardTitle>
            {adv.caption && <PossibilityCardCaption>{adv.caption}</PossibilityCardCaption>}
          </PossibilityCardText>
        </PossibilityCard>
      ))}
    </PossibilitiesMosaic>
  </PossibilitiesSection>
)
