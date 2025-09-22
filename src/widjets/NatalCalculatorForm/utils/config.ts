import { ChartFormFieldValues } from '../types'
import {
  CalculatorRequestKeys,
  IBasicCalculatorRequest,
} from '@/entities/astro-charts/types/calculator-request.types'
import { LocalStorageKeys } from '@/shared/constants/localStorageKeys'
import { loadRequest } from '@/shared/helpers/shareRequest'

export const formInitialValues: ChartFormFieldValues = {
  [CalculatorRequestKeys.date]: new Date().toISOString().substring(0, 10),
  locality: null,
  searchLocality: '',
  enter_coordinates: false,
  is_timezone_auto: true,
  [CalculatorRequestKeys.time]: '12:00:00',
  [CalculatorRequestKeys.hsys]: undefined,
  [CalculatorRequestKeys.timezone]: 0,
  [CalculatorRequestKeys.latitude]: '',
  [CalculatorRequestKeys.longitude]: '',
  [CalculatorRequestKeys.name]: undefined,
}

type RawType = IBasicCalculatorRequest

export function getInitialValues(): ChartFormFieldValues {
  try {
    const raw = loadRequest(LocalStorageKeys.NATAL_LAST_REQUEST) as RawType
    if (!raw) return formInitialValues

    return {
      [CalculatorRequestKeys.date]: raw[CalculatorRequestKeys.date] ?? formInitialValues.date,
      locality: null,
      searchLocality: raw[CalculatorRequestKeys.place] ?? formInitialValues.searchLocality,
      enter_coordinates: formInitialValues.enter_coordinates,
      is_timezone_auto: raw[CalculatorRequestKeys.timezone] ? false : true,
      [CalculatorRequestKeys.time]: raw[CalculatorRequestKeys.time] ?? formInitialValues.time,
      [CalculatorRequestKeys.hsys]: raw[CalculatorRequestKeys.hsys] ?? formInitialValues.hsys,
      [CalculatorRequestKeys.timezone]: raw[CalculatorRequestKeys.timezone] ?? formInitialValues.timezone,
      [CalculatorRequestKeys.latitude]: (
        raw[CalculatorRequestKeys.latitude] ?? formInitialValues.latitude
      ).toString(),
      [CalculatorRequestKeys.longitude]: (
        raw[CalculatorRequestKeys.longitude] ?? formInitialValues.longitude
      ).toString(),
      [CalculatorRequestKeys.name]: raw[CalculatorRequestKeys.name] ?? formInitialValues.name,
    }
  } catch {
    return formInitialValues
  }
}
