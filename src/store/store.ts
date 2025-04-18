import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { astroApi } from './api/astro.api'
import { localityApi } from './api/locality.api'
import { astroDecodingReducer } from './slices/astro-decoding'
import { testReducer } from './slices/test'

const rootReducer = combineReducers({
  test: testReducer,
  astroDecoding: astroDecodingReducer,
  [localityApi.reducerPath]: localityApi.reducer,
  [astroApi.reducerPath]: astroApi.reducer,
})
export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localityApi.middleware).concat(astroApi.middleware), // Добавь middleware для astroApi
  })

export const store = setupStore()
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
