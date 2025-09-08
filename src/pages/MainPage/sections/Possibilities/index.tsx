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
import { Inner, SectionHeadWrapper, SectionTitle, SectionSubtitle } from '../../index.linaria'

export const Possibilities = () => (
  <PossibilitiesSection>
    <Inner>
      <SectionHeadWrapper>
        <SectionTitle variant="light">Возможности сервиса</SectionTitle>
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
    </Inner>
  </PossibilitiesSection>
)
