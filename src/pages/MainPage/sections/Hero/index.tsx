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
          to={'/test'}
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
)
