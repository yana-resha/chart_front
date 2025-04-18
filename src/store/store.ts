import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { localityApi } from './api/locality.api'
import { testReducer } from './slices/test'

const rootReducer = combineReducers({
  test: testReducer,
  [localityApi.reducerPath]: localityApi.reducer,
})
export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localityApi.middleware),
  })

export const store = setupStore()
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
