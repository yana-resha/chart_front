import { Link } from 'react-router-dom'

import HeroImage from './hero.png'
import {
  HeroSection,
  HeroContentWrapper,
  HeroTitle,
  HeroSubtitle,
  HeroLead,
  HeroButtonsBlock,
} from './index.linaria'
import { Button } from '@/shared/components/Button'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'

export const Hero = () => (
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
          as={Link}
          to={ROUTER_PATHES.CALCULATOR_PATH}
          kind="ghost"
          size="large"
        >
          Рассчитать карту
        </Button>
      </HeroButtonsBlock>
    </HeroContentWrapper>
  </HeroSection>
)
