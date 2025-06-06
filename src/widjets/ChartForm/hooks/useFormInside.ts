import { useEffect, useState } from 'react'

import { useFormikContext } from 'formik'

import { ChartFormFieldValues, IInputLocality } from '../types'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'
import { useLazyGetLocalitiesByNameQuery } from '@/store/api/locality.api'

export const useFormInside = () => {
  const { values, submitForm, isSubmitting, setFieldValue, setValues, validateForm, status } =
    useFormikContext<ChartFormFieldValues>()

  const [showErrorToast, setShowErrorToast] = useState(false)

  useEffect(() => {
    if (status?.submitError && status.submitError !== false) {
      setShowErrorToast(true)
    } else {
      setShowErrorToast(false)
    }
  }, [status?.submitError])

  const closeErrorToast = () => setShowErrorToast(false)

  const [
    fetchFromAPI,
    { currentData: localitiesList, isError: isLocalitiesError, isFetching: isLocalitiesLoading },
  ] = useLazyGetLocalitiesByNameQuery()

  const timezoneHadleChange = (value: { default?: boolean; value: number }) => {
    if (value.default) {
      setFieldValue('is_timezone_auto', true)
      setFieldValue(CalculatorRequestKeys.timezone, 0)
    } else {
      setFieldValue('is_timezone_auto', false)
      setFieldValue(CalculatorRequestKeys.timezone, value.value)
    }
  }

  useEffect(() => {
    if (values.searchLocality.length >= 3 && !values.locality) {
      const { abort } = fetchFromAPI({ name: values.searchLocality }, true)

      return () => abort()
    }
  }, [values.locality, fetchFromAPI, values.searchLocality])

  const localitiesClickHandler = (e: MouseEvent | undefined, item: IInputLocality | null) => {
    if (!item) return

    const newValues = {
      ...values,
      locality: item,
      searchLocality: item.content?.toString() ?? '',
      latitude: item.latitude.toString(),
      longitude: item.longitude.toString(),
    }
    setValues(newValues)
    validateForm(newValues)
  }

  const resetLocality = () => {
    const newValues = {
      ...values,
      locality: null,
      latitude: '',
      longitude: '',
      searchLocality: '',
    }
    setValues(newValues)
    validateForm(newValues)
  }

  return {
    values,
    isSubmitting,
    localitiesList,
    isLocalitiesError,
    isLocalitiesLoading,
    submitForm,
    timezoneHadleChange,
    localitiesClickHandler,
    resetLocality,
    showErrorToast,
    closeErrorToast,
  }
}
