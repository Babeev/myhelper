import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState: {
    name: '',
  },
  reducers: {
    setAccount(state, action: PayloadAction<{ name: string }>) {
      state.name = action.payload.name
    },
  },
})

const { actions, reducer } = accountSlice

export const { setAccount } = actions
export default reducer
