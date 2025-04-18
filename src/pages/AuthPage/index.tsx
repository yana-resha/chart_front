import { Formik, FormikHelpers } from 'formik'

import { AuthForm } from './AuthForm'
import { Container, FormContainer, FormTitle, LeftSide, RightSide, Title } from './index.linaria'
import { formInitialValues } from './utils/config'
import { authFormSchema } from './utils/validationSchema'

export const AuthPage = () => {
  const handleSubmit = async (
    values: { password: string; email: string },
    formikHelpers: FormikHelpers<{ password: string; email: string }>,
  ) => {
    console.log(values, formikHelpers)
  }

  return (
    <Container>
      <LeftSide>
        <FormContainer>
          <FormTitle>Войти</FormTitle>
          <Formik
            isInitialValid={false}
            initialValues={formInitialValues}
            validationSchema={authFormSchema}
            onSubmit={handleSubmit}
          >
            <AuthForm />
          </Formik>
        </FormContainer>
      </LeftSide>
      <RightSide>
        <Title>
          {/* <span>Витрина Health SDK</span> для интеграции инноваций в сфере здравохранения */}
        </Title>
      </RightSide>
    </Container>
  )
}
