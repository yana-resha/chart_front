import { createSlice } from '@reduxjs/toolkit'

import { ASTRO_CHART_VARIABLE, IFullNatalChart } from '@/entities/astro-charts/types/astro-chart'

type TValue =
  | (IFullNatalChart & { chart_type: ASTRO_CHART_VARIABLE.NATAL_CHART })
  | (IFullNatalChart & { chart_type: ASTRO_CHART_VARIABLE.CHOROSCOPE })

interface initialStateType {
  chartValues: TValue[]
}

const initialState: initialStateType = {
  chartValues: [],
}

const astroDecodingSlice = createSlice({
  name: 'astro-decoding',
  initialState,
  reducers: {
    addChartValue: (state, action: { type: string; payload: TValue }) => {
      state.chartValues.unshift(action.payload)
    },
  },
})

export const { addChartValue } = astroDecodingSlice.actions
export const astroDecodingReducer = astroDecodingSlice.reducer
