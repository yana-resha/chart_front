import { PageTitle } from '@/shared/assets/styles/titles.linaria'
import { Layout, FormWrapper, FormBlock } from './index.linaria'
import { PageContentWrapper } from '@/shared/assets/styles/pages.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'
import NatalCalculatorForm from '@/widjets/NatalCalculatorForm'

export const NatalCalculatorPage = () => (
  <Layout>
    <PageHeader>
      <HeaderBackButton />
    </PageHeader>
    <PageContentWrapper>
      <PageTitle>Рассчитать натальную карту онлайн</PageTitle>
      <FormWrapper>
        <FormBlock>
          <NatalCalculatorForm />
        </FormBlock>
      </FormWrapper>
    </PageContentWrapper>
  </Layout>
)
