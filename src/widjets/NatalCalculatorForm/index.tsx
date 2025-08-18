import { useMemo, useRef } from 'react'

import { Formik, FormikProps } from 'formik'

import { Form } from './Form'
import { useFormOutside } from './hooks/useFormOutside'
import { Container, LoaderContent } from './index.linaria'
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
    </>
  )
}

export default NatalCalculatorForm
