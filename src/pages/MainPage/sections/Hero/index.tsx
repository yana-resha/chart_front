/* import { Link } from 'react-router-dom'

import HeroImage from './hero/23.png'
import {
  HeroSection,
  HeroContentWrapper,
  HeroTitle,
  HeroSubtitle,
  HeroLead,
  HeroButtonsBlock,
  ContentWrapper,
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
      <ContentWrapper>
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
      </ContentWrapper>
    </HeroContentWrapper>
  </HeroSection>
) */

import IcicleBubbles from './IcicleBubbles'

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        borderRadius: 0,
        marginBottom: '20px',
        overflow: 'hidden',
        height: 'calc(100vh - 30px)', // <-- высота есть
      }}
    >
      <IcicleBubbles
        background="rgba(23,25,26,1)"
        count={500}
        strandWidth={5.0}
        trail={10.0}
        color1="#43a3e7ff"
        color2="#970808ff"
        speeds={[0.22, 0.0018, 1.4, 0.4, 2.2, 5.8]}
        gain={1}
      />
      <div style={{ position: 'relative', zIndex: 2, display: 'grid', placeItems: 'center', height: '100%' }}>
        <h1 style={{ color: '#fff' }}>ASTRODOC</h1>
      </div>
    </section>
  )
}
