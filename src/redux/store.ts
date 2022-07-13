import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import { checkTokenExpirationMiddleware } from './middlewares'
import accountReducer from './slices/accountSlice'
import dealsReduces from './slices/dealsSlice'

export const store = configureStore({
  reducer: {
    account: accountReducer,
    deals: dealsReduces,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      api.middleware,
      checkTokenExpirationMiddleware
    ),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
