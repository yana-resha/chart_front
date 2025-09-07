import { advantagesListData } from './data/advantages.data'
import HeroImage from './hero.png'
import {
  Layout,
  HeroButtonsBlock,
  HeroContentWrapper,
  HeroLead,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  AdvantagesSection,
  AdvantagesInner,
  AdvantagesHeadWrapper,
  AdvantagesTitle,
  AdvantagesSubtitle,
  AdvantagesMosaic,
  AdvantageCard,
  AdvantageCardOverlay,
  AdvantageCardText,
  AdvantageCardTitle,
  AdvantageCardCaption,
} from './index.linaria'
import { Button } from '@/shared/components/Button'

export const MainPage = () => (
  <Layout>
    <HeroSection>
      <img
        src={HeroImage}
        alt=""
        loading="lazy"
      />
      <HeroContentWrapper>
        <HeroTitle>ASTRODOC</HeroTitle>
        <HeroSubtitle>— новый формат астрологии</HeroSubtitle>
        <HeroLead>Точные расчёты астрологических карт и наглядные визуализации.</HeroLead>
        <HeroButtonsBlock>
          <Button
            kind="ghost"
            size="large"
          >
            Рассчитать карту
          </Button>

          <Button
            kind="ghost"
            theme="secondary"
            size="large"
          >
            Как это работает
          </Button>
        </HeroButtonsBlock>
      </HeroContentWrapper>
    </HeroSection>
    <AdvantagesSection>
      <AdvantagesInner>
        <AdvantagesHeadWrapper>
          <AdvantagesTitle>Возможности ASTRODOC</AdvantagesTitle>
          <AdvantagesSubtitle>
            Технологичный астросервис с акцентом на скорость и наглядность
          </AdvantagesSubtitle>
        </AdvantagesHeadWrapper>
        <AdvantagesMosaic>
          {advantagesListData.map((adv) => (
            <AdvantageCard
              key={adv.id}
              $area={adv.area}
              $hue={adv.hue ?? 190}
            >
              <img
                src={adv.image}
                alt=""
                loading="lazy"
              />
              <AdvantageCardOverlay />
              <AdvantageCardText>
                <AdvantageCardTitle>{adv.title}</AdvantageCardTitle>
                {adv.caption && <AdvantageCardCaption>{adv.caption}</AdvantageCardCaption>}
              </AdvantageCardText>
            </AdvantageCard>
          ))}
        </AdvantagesMosaic>
      </AdvantagesInner>
    </AdvantagesSection>
  </Layout>
)
