import { useRef } from 'react'

import { Formik, FormikProps } from 'formik'

import { Form } from './Form'
import { useFormOutside } from './hooks/useFormOutside'
import { Container, LoaderContent } from './index.linaria'
import { ChartFormFieldValues } from './types'
import { formInitialValues } from './utils/config'
import { chartFormSchema } from './utils/validationSchema'
import { LoaderModal } from '@/shared/components/Modal'

const NatalCalculatorForm = () => {
  const formRef = useRef<FormikProps<ChartFormFieldValues>>(null)
  const { formSubmit, formIsLoading, isRedirecting } = useFormOutside()

  return (
    <Container>
      <Formik
        initialValues={formInitialValues}
        validationSchema={chartFormSchema}
        onSubmit={formSubmit}
        innerRef={formRef}
      >
        <Form />
      </Formik>

      {(isRedirecting || formIsLoading) && (
        <LoaderModal
          showExitCross={false}
          icon={isRedirecting ? 'check' : 'loader'}
          content={
            <LoaderContent>
              {isRedirecting ? (
                <>Расчёты завершены, переходим к результатам...</>
              ) : (
                <>
                  Идёт расчёт карты на основе ваших данных.
                  <br />
                  Секунду терпения...
                </>
              )}
            </LoaderContent>
          }
          onClose={() => {}}
        />
      )}
    </Container>
  )
}

export default NatalCalculatorForm
