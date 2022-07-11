import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import accountReducer from './accountSlice'
import dealsReduces from './dealsSlice'
import { api } from './api'

export const store = configureStore({
  reducer: {
    account: accountReducer,
    deals: dealsReduces,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
