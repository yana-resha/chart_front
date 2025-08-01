import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SharedState {
  astroSettings: Record<string, unknown>
}
const initialState: SharedState = {
  astroSettings: {},
}

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setAstroSetting(state, action: PayloadAction<{ key: string; value: unknown }>) {
      state.astroSettings[action.payload.key] = action.payload.value
    },

    resetAstroSettings(state) {
      state.astroSettings = {}
    },
  },
})

export const { setAstroSetting, resetAstroSettings } = sharedSlice.actions

export const sharedReducer = sharedSlice.reducer
