import { DICTIONARY_ITEMS_CATEGORY } from './dictionary-common.types'
import { AnyDictionaryItemWithCategory, DictionaryItemByCategory } from './dictionary-items.types'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'

// --- Универсальный request ---
export interface IDictionarySchemaRequest<T> {
  chart: ASTRO_CHART_VARIABLE
  items: T[]
}

// --- Request по категории (строгая типизация по enum) ---
export type IDictionarySchemaRequestByCategory<C extends DICTIONARY_ITEMS_CATEGORY> =
  IDictionarySchemaRequest<DictionaryItemByCategory[C]>

// --- Частные типы для удобства, если нужно оставить ---
export type IPlanetInSignDictionaryRequest =
  IDictionarySchemaRequestByCategory<DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN>
export type IPlanetInHousesDictionaryRequest =
  IDictionarySchemaRequestByCategory<DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE>
export type IHouseInSignDictionaryRequest =
  IDictionarySchemaRequestByCategory<DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN>
export type IAspectDictionaryRequest = IDictionarySchemaRequestByCategory<DICTIONARY_ITEMS_CATEGORY.ASPECT>
export type IConfigurationDictionaryRequest =
  IDictionarySchemaRequestByCategory<DICTIONARY_ITEMS_CATEGORY.CONFIGURATION>

// --- Bulk запрос — любые items ---
export type IBulkItemsDictionaryRequest = IDictionarySchemaRequest<AnyDictionaryItemWithCategory>
