import { DICTIONARY_ITEMS_CATEGORY } from './dictionary-common.types'
import { ASTRO_ASPECT } from '@/shared/types/astro/astro-aspects.types'
import { ASTRO_CONFIGURATION } from '@/shared/types/astro/astro-configurations.types'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'
import { ASTRO_ZODIAC } from '@/shared/types/astro/astro-zodiac.types'

export interface IPlanetInSignDictionaryItem {
  planet: ASTRO_PLANET
  sign: ASTRO_ZODIAC
}

export interface IPlanetInHouseDictionaryItem {
  planet: ASTRO_PLANET
  house: number
}

export interface IHouseInSignDictionaryItem {
  house: number
  sign: ASTRO_ZODIAC
}

export interface IAspectDictionaryItem {
  planetA: ASTRO_PLANET
  planetB: ASTRO_PLANET
  aspect: ASTRO_ASPECT
}

export interface IConfigurationDictionaryItem {
  config: ASTRO_CONFIGURATION
  planets: ASTRO_PLANET[]
}

// --- Маппинг категории к соответствующему типу item ---
export type DictionaryItemByCategory = {
  [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN]: IPlanetInSignDictionaryItem
  [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE]: IPlanetInHouseDictionaryItem
  [DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN]: IHouseInSignDictionaryItem
  [DICTIONARY_ITEMS_CATEGORY.ASPECT]: IAspectDictionaryItem
  [DICTIONARY_ITEMS_CATEGORY.CONFIGURATION]: IConfigurationDictionaryItem
}

// --- Универсальный item ---
export type AnyDictionaryItem = DictionaryItemByCategory[keyof DictionaryItemByCategory]

// --- Это для Bulk ---
// Каждому item присваиваем свою категорию явно
export type PlanetInSignItemWithCategory = IPlanetInSignDictionaryItem & {
  category: DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN
}

export type PlanetInHouseItemWithCategory = IPlanetInHouseDictionaryItem & {
  category: DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE
}

export type HouseInSignItemWithCategory = IHouseInSignDictionaryItem & {
  category: DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN
}

export type AspectItemWithCategory = IAspectDictionaryItem & {
  category: DICTIONARY_ITEMS_CATEGORY.ASPECT
}

export type ConfigurationItemWithCategory = IConfigurationDictionaryItem & {
  category: DICTIONARY_ITEMS_CATEGORY.CONFIGURATION
}

export type AnyDictionaryItemWithCategory =
  | PlanetInSignItemWithCategory
  | PlanetInHouseItemWithCategory
  | HouseInSignItemWithCategory
  | AspectItemWithCategory
  | ConfigurationItemWithCategory
