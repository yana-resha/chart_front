import { useCallback } from 'react'

import { useField, useFormikContext } from 'formik'

export const useFormikWrapper = (name: string, onChange?: (value: unknown) => void) => {
  const [field, meta] = useField(name)
  const { value } = field
  const { touched, error } = meta
  const isError = meta != undefined && touched && error != undefined
  const { setFieldValue } = useFormikContext()

  const handleChange = useCallback(
    (value: unknown) => {
      setFieldValue(name, value)
      onChange?.(value)
    },
    [setFieldValue, name, onChange],
  )

  return { value, isError, error, handleChange }
}
