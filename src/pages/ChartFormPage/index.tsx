import { useNavigate } from 'react-router-dom'

import { Container, ContentContainer, FormBlock, HeaderContainer } from './index.linaria'
import { Header } from '@/shared/components/Header'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'
import ChartForm from '@/widjets/ChartForm'

const ChartFormPage = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <HeaderContainer>
        <Header
          text="Калькулятор"
          showBackButton
          onClick={() => navigate(ROUTER_PATHES.DEFAULT_AUTH_PATH)}
        />
      </HeaderContainer>
      <ContentContainer>
        <FormBlock>
          <ChartForm />
        </FormBlock>
      </ContentContainer>
    </Container>
  )
}

export default ChartFormPage
