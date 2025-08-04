import { Container, ContentContainer, FormBlock } from './index.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'
import ChartForm from '@/widjets/ChartForm'

export const CalculatorPage = () => (
  <Container>
    <PageHeader>
      <HeaderBackButton />
    </PageHeader>
    <ContentContainer>
      <FormBlock>
        <ChartForm />
      </FormBlock>
    </ContentContainer>
  </Container>
)
