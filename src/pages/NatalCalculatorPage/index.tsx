import { Container, ContentContainer, FormBlock } from './index.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'
import NatalCalculatorForm from '@/widjets/NatalCalculatorForm'

export const NatalCalculatorPage = () => (
  <Container>
    <PageHeader>
      <HeaderBackButton />
    </PageHeader>
    <ContentContainer>
      <FormBlock>
        <NatalCalculatorForm />
      </FormBlock>
    </ContentContainer>
  </Container>
)
