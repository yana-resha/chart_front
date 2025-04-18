import { useFormikContext } from 'formik'

import { Form, FormBtnContainer, FormInputField } from './index.linaria'
import PasswordIcon from '@/shared/assets/icons/lock.svg?react'
import MailIcon from '@/shared/assets/icons/mail.svg?react'
import { Button } from '@/shared/components/Button'
import Input from '@/shared/components/Input'
import { useFormikWrapper } from '@/shared/hooks/useFormikWrapper'

export const AuthForm = () => {
  const { submitForm, isSubmitting, isValid, submitCount } = useFormikContext<{
    password: string
    email: string
  }>()
  const {
    value: password,
    isError: passwordInvalid,
    error: passwordInvalidText,
    handleChange: handleChangePassword,
  } = useFormikWrapper('password')

  const {
    value: email,
    isError: emailInvalid,
    error: emailInvalidText,
    handleChange: handleChangeEmail,
  } = useFormikWrapper('email')

  return (
    <Form>
      <FormInputField mask={''}>
        <Input
          value={email}
          onChange={(e) => handleChangeEmail(e.currentTarget.value)}
          invalid={emailInvalid}
          invalidText={emailInvalidText}
          type="email"
          autoComplete="true"
          mask=""
          placeholder="Введите email"
          leftIcon={<MailIcon />}
        />
      </FormInputField>
      <FormInputField>
        <Input
          invalid={passwordInvalid}
          value={password}
          onChange={(e) => handleChangePassword(e.currentTarget.value)}
          invalidText={passwordInvalidText}
          type="password"
          autoComplete="true"
          mask=""
          placeholder="Введите пароль"
          leftIcon={<PasswordIcon />}
        />
      </FormInputField>
      <FormBtnContainer>
        <Button
          disabled={(!isValid && submitCount > 0) || isSubmitting}
          isLoading={isSubmitting}
          onClick={(e) => {
            e.preventDefault()
            submitForm()
          }}
          type="submit"
          kind="gradient"
          roundedCorner
        >
          Войти
        </Button>
        <Button
          type="button"
          kind="text"
          theme="primary"
          disabled={!(email && !emailInvalid)}
        >
          Забыли пароль?
        </Button>
      </FormBtnContainer>
    </Form>
  )
}
