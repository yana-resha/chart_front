import { createSlice } from '@reduxjs/toolkit'

import {
  IFullNatalСalculations,
  ISingleChartSourceData,
} from '@/entities/astro-charts/types/astro-charts.types'
import { DICTIONARY_ITEMS_CATEGORY } from '@/entities/astro-dictionary/types/dictionary-common.types'
import { DictionaryItemResponseByCategory } from '@/entities/astro-dictionary/types/dictionary-responses.types'

interface INatalDictionaries {
  [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE]: DictionaryItemResponseByCategory[DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE][]
  [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN]: DictionaryItemResponseByCategory[DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN][]
  [DICTIONARY_ITEMS_CATEGORY.ASPECT]: DictionaryItemResponseByCategory[DICTIONARY_ITEMS_CATEGORY.ASPECT][]
  [DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN]: DictionaryItemResponseByCategory[DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN][]
}

interface NatalChartEntry {
  sourceValue: ISingleChartSourceData
  calculation: IFullNatalСalculations
  dictionaries: INatalDictionaries
}

type IInitialState = {
  chartsById: Record<string, NatalChartEntry>
}

const initialState: IInitialState = {
  chartsById: {},
}

const natalDecodingSlice = createSlice({
  name: 'natal-decoding',
  initialState,
  reducers: {
    addNatalChart: (
      state,
      action: {
        type: string
        payload: {
          id: string
          sourceValue: ISingleChartSourceData & { locality?: string }
          calculation: IFullNatalСalculations
          dictionaries?: INatalDictionaries
        }
      },
    ) => {
      state.chartsById[action.payload.id] = {
        sourceValue: action.payload.sourceValue,
        calculation: action.payload.calculation,
        dictionaries: {
          [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE]: [],
          [DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN]: [],
          [DICTIONARY_ITEMS_CATEGORY.ASPECT]: [],
          [DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN]: [],
          ...action.payload.dictionaries,
        },
      }
    },

    updateNatalDictionaries: <C extends keyof INatalDictionaries>(
      state: IInitialState,
      action: {
        type: string
        payload: {
          id: string
          category: C
          items: INatalDictionaries[C]
        }
      },
    ) => {
      const { id, category, items } = action.payload
      const chart = state.chartsById[id]
      if (!chart) return
      chart.dictionaries[category] = [...chart.dictionaries[category], ...items] as INatalDictionaries[C]
    },

    removeNatalChart: (state, action: { type: string; payload: string }) => {
      delete state.chartsById[action.payload]
    },
  },
})

export const { addNatalChart, removeNatalChart, updateNatalDictionaries } = natalDecodingSlice.actions
export const natalDecodingReducer = natalDecodingSlice.reducer
