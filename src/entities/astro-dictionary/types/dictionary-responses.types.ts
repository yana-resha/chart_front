import { DICTIONARY_ITEMS_CATEGORY } from './dictionary-common.types'
import { DictionaryItemByCategory } from './dictionary-items.types'
import { IBasicResponse } from '@/shared/types/api'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'

/* Тип WithTextAndCategory */
type WithTextAndCategory<T, C extends DICTIONARY_ITEMS_CATEGORY> = T & {
  text: string | null
  category: C
}

/* Маппинг типа ответа по категории */
export type DictionaryItemResponseByCategory = {
  [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN]: WithTextAndCategory<
    DictionaryItemByCategory[DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN],
    DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN
  >
  [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE]: WithTextAndCategory<
    DictionaryItemByCategory[DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE],
    DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE
  >
  [DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN]: WithTextAndCategory<
    DictionaryItemByCategory[DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN],
    DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN
  >
  [DICTIONARY_ITEMS_CATEGORY.ASPECT]: WithTextAndCategory<
    DictionaryItemByCategory[DICTIONARY_ITEMS_CATEGORY.ASPECT],
    DICTIONARY_ITEMS_CATEGORY.ASPECT
  >
  [DICTIONARY_ITEMS_CATEGORY.CONFIGURATION]: WithTextAndCategory<
    DictionaryItemByCategory[DICTIONARY_ITEMS_CATEGORY.CONFIGURATION],
    DICTIONARY_ITEMS_CATEGORY.CONFIGURATION
  >
}

/* Общий ответ по категории */

export interface IDictionarySchemaResponseByCategory<C extends DICTIONARY_ITEMS_CATEGORY> {
  chart: ASTRO_CHART_VARIABLE
  items: DictionaryItemResponseByCategory[C][]
}

/* Частные типы для каждого ответа */

export type IPlanetInSignDictionaryResponse = IBasicResponse<
  IDictionarySchemaResponseByCategory<DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN>
>

export type IPlanetInHousesDictionaryResponse = IBasicResponse<
  IDictionarySchemaResponseByCategory<DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE>
>

export type IHouseInSignDictionaryResponse = IBasicResponse<
  IDictionarySchemaResponseByCategory<DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN>
>

export type IAspectDictionaryResponse = IBasicResponse<
  IDictionarySchemaResponseByCategory<DICTIONARY_ITEMS_CATEGORY.ASPECT>
>

export type IConfigurationDictionaryResponse = IBasicResponse<
  IDictionarySchemaResponseByCategory<DICTIONARY_ITEMS_CATEGORY.CONFIGURATION>
>

/* Bulk-ответ (все категории в одном) */
export type DictionaryItemResponse = DictionaryItemResponseByCategory[keyof DictionaryItemResponseByCategory]

export interface IBulkItemsDictionary {
  chart: ASTRO_CHART_VARIABLE
  items: DictionaryItemResponse[]
}

export type IBulkItemsDictionaryResponse = IBasicResponse<IBulkItemsDictionary>
