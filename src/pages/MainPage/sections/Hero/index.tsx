import { Link } from 'react-router-dom'

import HeroImg from './hero_2.png'
import {
  HeroSection,
  HeroContentWrapper,
  HeroTitle,
  HeroSubtitle,
  HeroLead,
  HeroButtonsBlock,
  ContentWrapper,
  HeroImage,
  Gradient,
  Gradient2,
} from './index.linaria'
import { Button } from '@/shared/components/Button'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'

export const Hero = () => (
  <HeroSection>
    <HeroImage src={HeroImg} />

    <HeroContentWrapper>
      <ContentWrapper>
        <Gradient />
        <Gradient2 />
        <HeroTitle>ASTRODOC</HeroTitle>
        <HeroSubtitle>— новый формат астрологии</HeroSubtitle>
        <HeroLead>Точные расчёты астрологических карт и наглядные визуализации.</HeroLead>
        <HeroButtonsBlock>
          <Button
            as={Link}
            to={ROUTER_PATHES.CALCULATOR_PATH}
            kind="ghost"
            size="large"
            style={{ boxShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}
          >
            Рассчитать карту
          </Button>
        </HeroButtonsBlock>
      </ContentWrapper>
    </HeroContentWrapper>
  </HeroSection>
)
