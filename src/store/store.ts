import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { astroCalculateApi } from './api/astro-calculate.api'
import { astroDictionaryApi } from './api/astro-dictionary.api'
import { localityApi } from './api/locality.api'
import { natalDecodingReducer } from './slices/natal-decoding'
import { sharedReducer } from './slices/shared'
import { testReducer } from './slices/test'

const rootReducer = combineReducers({
  test: testReducer,
  natalDecoding: natalDecodingReducer,
  shared: sharedReducer,
  [localityApi.reducerPath]: localityApi.reducer,
  [astroCalculateApi.reducerPath]: astroCalculateApi.reducer,
  [astroDictionaryApi.reducerPath]: astroDictionaryApi.reducer,
})
export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(localityApi.middleware)
        .concat(astroCalculateApi.middleware)
        .concat(astroDictionaryApi.middleware),
  })

export const store = setupStore()
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
