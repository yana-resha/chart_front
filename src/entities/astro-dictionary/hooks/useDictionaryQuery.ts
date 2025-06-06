import { DICTIONARY_ITEMS_CATEGORY } from '../types/dictionary-common.types'
import {
  useGetPlanetInSignQuery,
  useGetPlanetInHouseQuery,
  useGetHouseInSignQuery,
  useGetAspectQuery,
  useGetConfigurationQuery,
  useGetBulkDictionaryQuery,
  useLazyGetPlanetInSignQuery,
  useLazyGetPlanetInHouseQuery,
  useLazyGetHouseInSignQuery,
  useLazyGetAspectQuery,
  useLazyGetConfigurationQuery,
  useLazyGetBulkDictionaryQuery,
} from '@/store/api/astro-dictionary.api'

// --- Карта обычных хуков ---
const hookMap = {
  [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN]: useGetPlanetInSignQuery,
  [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE]: useGetPlanetInHouseQuery,
  [DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN]: useGetHouseInSignQuery,
  [DICTIONARY_ITEMS_CATEGORY.ASPECT]: useGetAspectQuery,
  [DICTIONARY_ITEMS_CATEGORY.CONFIGURATION]: useGetConfigurationQuery,
  bulk: useGetBulkDictionaryQuery,
} as const

// --- Карта ленивых хуков ---
const lazyHookMap = {
  [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN]: useLazyGetPlanetInSignQuery,
  [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE]: useLazyGetPlanetInHouseQuery,
  [DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN]: useLazyGetHouseInSignQuery,
  [DICTIONARY_ITEMS_CATEGORY.ASPECT]: useLazyGetAspectQuery,
  [DICTIONARY_ITEMS_CATEGORY.CONFIGURATION]: useLazyGetConfigurationQuery,
  bulk: useLazyGetBulkDictionaryQuery,
} as const

// --- Типы на основе карты ---
type HookMap = typeof hookMap
type LazyHookMap = typeof lazyHookMap

type DictionaryQueryMap = {
  [K in keyof HookMap]: {
    hook: HookMap[K]
    request: Parameters<HookMap[K]>[0]
    response: ReturnType<HookMap[K]>
    lazyHook: LazyHookMap[K]
  }
}

// --- Универсальный хук запроса (авто-запрос) ---
export function useDictionaryQuery<C extends keyof DictionaryQueryMap>(
  category: C,
  args: DictionaryQueryMap[C]['request'],
): DictionaryQueryMap[C]['response'] {
  const hook = hookMap[category] as (
    arg: DictionaryQueryMap[C]['request'],
  ) => DictionaryQueryMap[C]['response']

  return hook(args)
}

// --- Универсальный ленивый хук (вызов по триггеру) ---
export function useLazyDictionaryQuery<C extends keyof LazyHookMap>(category: C) {
  const hook = lazyHookMap[category]

  return hook()
}
