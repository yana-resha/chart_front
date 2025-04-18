import { useRef } from 'react'

import { Formik, FormikProps } from 'formik'

import { Form } from './Form'
import { useFormOutside } from './hooks/useFormOutside'
import { Container, LoaderContent, modalWrapper } from './index.linaria'
import { ChartFormFieldValues } from './types'
import { formInitialValues } from './utils/config'
import { chartFormSchema } from './utils/validationSchema'
import { FadeWrapper } from '@/shared/components/FadeWrapper/FadeWrapper'
import { LoaderModal } from '@/shared/components/Modal'

const ChartForm = () => {
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
      <FadeWrapper
        className={modalWrapper}
        show={isRedirecting || formIsLoading ? true : false}
      >
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
      </FadeWrapper>
    </Container>
  )
}

export default ChartForm
