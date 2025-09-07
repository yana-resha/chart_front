import {
  HeroButtonsBlock,
  HeroContentWrapper,
  HeroLead,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
} from './index.linaria'
import { Layout } from '../NatalCalculatorPage/index.linaria'
import { Button } from '@/shared/components/Button'

export const MainPage = () => (
  <Layout>
    <HeroSection>
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
  </Layout>
)
