import { useEffect, useMemo, useState, useCallback, ChangeEvent } from 'react'

import { useField, useFormikContext } from 'formik'

import { getInsertedSegment } from '../helpers/getInsertedSegment'
import { ChartFormFieldValues } from '../types'
import { LocalityOption } from '../ui/LocalityOption'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'
import { formatCoord, toInputLocality } from '@/entities/locality/helpers/search-input-mappers.helpers'
import { IInputLocality } from '@/entities/locality/types/input-locality.types'
import { useLazyGetLocalitiesByNameQuery } from '@/store/api/locality.api'

const norm = (s?: string) => (s ?? '').trim()

export const useFormInside = () => {
  const { values, submitForm, isSubmitting, setFieldValue, setValues, validateForm, status } =
    useFormikContext<ChartFormFieldValues>()

  const [, searchMeta] = useField<string>('searchLocality')

  const [showErrorToast, setShowErrorToast] = useState(false)
  useEffect(() => setShowErrorToast(!!status?.submitError), [status?.submitError])
  const closeErrorToast = () => setShowErrorToast(false)
  const isInitialSearch = useMemo(
    () => norm(values.searchLocality) === norm(searchMeta.initialValue),
    [searchMeta.initialValue, values.searchLocality],
  )

  const [
    fetchFromAPI,
    { currentData: localitiesList, isError: isLocalitiesError, isFetching: isLocalitiesLoading },
  ] = useLazyGetLocalitiesByNameQuery()

  const mapedLocalitiesList = useMemo(
    () => (localitiesList ?? []).map((el) => toInputLocality(el)),
    [localitiesList],
  )

  const searchDropdownItems = useMemo(() => {
    const list = mapedLocalitiesList?.map((x) => {
      const title = typeof x.content === 'string' ? x.content : String(x.content ?? '')

      return {
        ...x,
        localityName: title,
        content: (
          <LocalityOption
            title={title}
            lat={x.latitude}
            lon={x.longitude}
          />
        ),
      }
    })

    return list
  }, [mapedLocalitiesList])

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Фокус: пустое поле + есть данные → открыть дропдаун
  const onSearchInputFocus = useCallback(() => {
    if (values.enter_coordinates === true) return
    if (values.searchLocality.trim().length === 0 && mapedLocalitiesList.length > 0) {
      setIsDropdownOpen(true)
    }
  }, [values.enter_coordinates, values.searchLocality, mapedLocalitiesList.length])

  // Смена текста (получаем событие!)
  const onSearchLocalityChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value
      const prev = values.searchLocality ?? ''

      // первый пользовательский ввод по предзаполненному значению?
      const isFirstTouchByInitial = prev === (searchMeta.initialValue ?? '') && prev.trim().length > 0

      // критерий жёсткой очистки: был выбран locality ИЛИ это первый touch по initialValue
      const needHardReset = Boolean(values.locality) || isFirstTouchByInitial

      // ⛔ ручной режим — поиск/дропдаун не работаем
      if (values.enter_coordinates === true) {
        if (needHardReset) {
          const typed = getInsertedSegment(prev, next)
          const newValues: ChartFormFieldValues = {
            ...values,
            locality: null,
            // координаты в ручном режиме не трогаем
            latitude: values.latitude,
            longitude: values.longitude,
            searchLocality: typed,
          }
          setValues(newValues)
          validateForm(newValues)
        } else {
          setFieldValue('searchLocality', next)
        }
        setHasSearched(false)
        setIsDropdownOpen(false)

        return
      }

      // ✅ обычный режим
      if (needHardReset) {
        const typed = getInsertedSegment(prev, next)
        const newValues: ChartFormFieldValues = {
          ...values,
          locality: null,
          latitude: '',
          longitude: '',
          searchLocality: typed, // начать «с нуля»
        }
        setValues(newValues)
        validateForm(newValues)

        const q = typed.trim()
        if (q.length >= 3) {
          setHasSearched(true)
          setIsDropdownOpen(true)
          fetchFromAPI({ name: q }, true)
        } else {
          setHasSearched(false)
          setIsDropdownOpen(false)
        }

        return
      }

      // locality пуст и это не первый touch — обычное поведение
      setFieldValue('searchLocality', next)
      const q = next.trim()
      if (q.length >= 3) {
        setHasSearched(true)
        setIsDropdownOpen(true)
        fetchFromAPI({ name: q }, true)
      } else {
        setHasSearched(false)
        setIsDropdownOpen(false)
      }
    },
    [values, searchMeta.initialValue, setValues, setFieldValue, validateForm, fetchFromAPI],
  )

  const showEmptyState =
    hasSearched && !isLocalitiesLoading && !isLocalitiesError && mapedLocalitiesList.length === 0

  const timezoneHadleChange = (value: { default?: boolean; value: number }) => {
    if (value.default) {
      setFieldValue('is_timezone_auto', true)
      setFieldValue(CalculatorRequestKeys.timezone, 0)
    } else {
      setFieldValue('is_timezone_auto', false)
      setFieldValue(CalculatorRequestKeys.timezone, value.value)
    }
  }

  // (опционально) автоподгрузка по текущему значению
  useEffect(() => {
    if (norm(values.searchLocality).length >= 3 && !values.locality && !isInitialSearch) {
      const { abort } = fetchFromAPI({ name: values.searchLocality }, true)

      return () => abort()
    }
  }, [values.locality, fetchFromAPI, values.searchLocality, isInitialSearch])

  const localitiesClickHandler = (e: MouseEvent | undefined, item: IInputLocality | null) => {
    if (!item) return
    const newValues: ChartFormFieldValues = {
      ...values,
      locality: item,
      searchLocality: mapedLocalitiesList.find((el) => el.id === item.id)?.content?.toString() ?? '',
      latitude: formatCoord(item.latitude),
      longitude: formatCoord(item.longitude),
    }
    setValues(newValues)
    validateForm(newValues)
    setIsDropdownOpen(false)
  }

  return {
    values,
    isSubmitting,
    searchDropdownItems,
    isLocalitiesError,
    isLocalitiesLoading,

    isDropdownOpen,
    setIsDropdownOpen,
    onSearchInputFocus,
    onSearchLocalityChange,
    showEmptyState,

    submitForm,
    timezoneHadleChange,
    localitiesClickHandler,
    showErrorToast,
    closeErrorToast,
  }
}
