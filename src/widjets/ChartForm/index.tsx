import { useRef } from 'react'

import { Formik, FormikHelpers, FormikProps } from 'formik'

import { Form } from './Form'
import { Container } from './index.linaria'
import { ChartFormFieldValues } from './types'
import { formInitialValues } from './utils/config'
import { mapValuesToRequest } from './utils/mapValuesToRequest'
import { chartFormSchema } from './utils/validationSchema'

const ChartForm = () => {
  const formRef = useRef<FormikProps<ChartFormFieldValues>>(null)
  const handleSubmit = async (
    values: ChartFormFieldValues,
    formikHelpers: FormikHelpers<ChartFormFieldValues>,
  ) => {
    try {
      const request = mapValuesToRequest(values)

      return request
    } catch (error) {
      console.log(error, 'Ошибка преобразования request-a')
    }
  }

  return (
    <Container>
      {/* <Title>Рассчитать гороскоп</Title> */}
      <Formik
        initialValues={formInitialValues}
        validationSchema={chartFormSchema}
        onSubmit={handleSubmit}
        innerRef={formRef}
      >
        <Form />
      </Formik>
    </Container>
  )
}
export default ChartForm
