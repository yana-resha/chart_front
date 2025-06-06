import { createSlice } from '@reduxjs/toolkit'

import {
  IFullNatalСalculations,
  ISingleChartSourceData,
} from '@/entities/astro-charts/types/astro-charts.types'

interface NatalChartEntry {
  sourceValue: ISingleChartSourceData & { locality?: string }
  calculation: IFullNatalСalculations
}

type NatalDecodingState = {
  chartsById: Record<string, NatalChartEntry>
}

const initialState: NatalDecodingState = {
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
        }
      },
    ) => {
      state.chartsById[action.payload.id] = {
        sourceValue: action.payload.sourceValue,
        calculation: action.payload.calculation,
      }
    },

    removeNatalChart: (state, action: { type: string; payload: string }) => {
      delete state.chartsById[action.payload]
    },
  },
})

export const { addNatalChart, removeNatalChart } = natalDecodingSlice.actions
export const natalDecodingReducer = natalDecodingSlice.reducer
