import { createSlice } from '@reduxjs/toolkit'

interface initialStateType {
  test: string
}

const initialState: initialStateType = {
  test: 'Hello World!',
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    changeRaw: (state, action: { type: string; payload: string }) => {
      state.test = action.payload
    },
  },
})

export const { changeRaw } = testSlice.actions
export const testReducer = testSlice.reducer
