import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Deal, DealsSlice } from 'types'
import { getDeals } from 'redux/api/deals'
import { getUserInfo } from 'redux/api/user'

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
      .addMatcher(getDeals.matchFulfilled, (state, action) => {
        state.allDeals = action.payload
      })
      .addMatcher(getUserInfo.matchFulfilled, (state, action) => {
        state.myDeals = action.payload.placedDeals
      }),
})

const { actions, reducer } = dealsSlice

export const { setAllDeals, setMyDeals } = actions
export default reducer
