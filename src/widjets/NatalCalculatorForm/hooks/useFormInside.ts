import { useEffect, useMemo, useState } from 'react'

import { useFormikContext } from 'formik'

import { ChartFormFieldValues } from '../types'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'
import { formatCoord, toInputLocality } from '@/entities/locality/helpers/search-input-mappers.helpers'
import { IInputLocality } from '@/entities/locality/types/input-locality.types'
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

  const mapedLocalitiesList = useMemo(
    () => (localitiesList ?? []).map((x) => toInputLocality(x)),
    [localitiesList],
  )

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

    const newValues: ChartFormFieldValues = {
      ...values,
      locality: item,
      searchLocality: item.content?.toString() ?? '',
      latitude: formatCoord(item.latitude), // ← строка
      longitude: formatCoord(item.longitude), // ← строка
    }

    setValues(newValues)
    validateForm(newValues)
  }

  const resetLocality = () => {
    const newValues: ChartFormFieldValues = {
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
    mapedLocalitiesList,
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
