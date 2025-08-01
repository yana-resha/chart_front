import { Container, ContentContainer, FormBlock, HeaderContainer } from './index.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import ChartForm from '@/widjets/ChartForm'

export const CalculatorPage = () => (
  <Container>
    <HeaderContainer>
      <HeaderBackButton />
    </HeaderContainer>
    <ContentContainer>
      <FormBlock>
        <ChartForm />
      </FormBlock>
    </ContentContainer>
  </Container>
)
