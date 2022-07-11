import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Deal, DealsSlice } from 'types'
import { signup } from './api/auth'
import { getDeals } from './api/deals'

const initialState: DealsSlice = {
  allDeals: [],
  myDeals: [],
}

const dealsSlice = createSlice({
  name: 'dealsSlice',
  initialState,
  reducers: {
    setAllDeals(state, action: PayloadAction<Deal[]>) {
      state.allDeals = action.payload
    },

    setMyDeals(state, action: PayloadAction<Deal[]>) {
      state.myDeals = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(signup.matchFulfilled, (state, action) => {
        state.myDeals = action.payload.deals
      })
      .addMatcher(getDeals.matchFulfilled, (state, action) => {
        state.allDeals = action.payload
      }),
})

const { actions, reducer } = dealsSlice

export const { setAllDeals, setMyDeals } = actions
export default reducer
