import { useMemo, useRef } from 'react'

import { Formik, FormikProps } from 'formik'

import { Form } from './Form'
import { useFormOutside } from './hooks/useFormOutside'
import { Container } from './index.linaria'
import { ChartFormFieldValues } from './types'
import { getInitialValues } from './utils/config'
import { chartFormSchema } from './utils/validationSchema'
import { LoaderModal } from '@/shared/components/Modal'

const NatalCalculatorForm = () => {
  const formRef = useRef<FormikProps<ChartFormFieldValues>>(null)
  const { formSubmit, formIsLoading, isRedirecting } = useFormOutside()
  const initialValues = useMemo(getInitialValues, [])

  return (
    <>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={chartFormSchema}
          onSubmit={formSubmit}
          innerRef={formRef}
        >
          <Form />
        </Formik>
      </Container>
      <LoaderModal
        open={isRedirecting || formIsLoading ? true : false}
        showExitCross={false}
        phase={isRedirecting ? 'success' : 'loading'}
        content={isRedirecting ? 'Готово ✨' : 'Строим вашу карту 🪐'}
        subtitle={
          isRedirecting
            ? 'Перенаправляем на страницу с результатами...'
            : 'Это займёт всего несколько секунд...'
        }
        onClose={() => {}}
      />
    </>
  )
}

export default NatalCalculatorForm
