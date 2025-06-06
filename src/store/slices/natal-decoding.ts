import { createSlice } from '@reduxjs/toolkit'

import {
  ISingleChartSourceData,
  IFullNatalСalculations,
} from '@/entities/astro-charts/types/astro-charts.types'

interface initialStateType {
  sourceValue?: ISingleChartSourceData & { locality?: string }
  calculation?: IFullNatalСalculations
}

const initialState: initialStateType = {
  sourceValue: undefined,
  calculation: undefined,
}

const natalDecodingSlice = createSlice({
  name: 'natal-decoding',
  initialState,
  reducers: {
    update: (state, action: { type: string; payload: initialStateType }) => {
      state.sourceValue = action.payload.sourceValue
      state.calculation = action.payload.calculation
    },
  },
})

export const { update } = natalDecodingSlice.actions
export const natalDecodingReducer = natalDecodingSlice.reducer
