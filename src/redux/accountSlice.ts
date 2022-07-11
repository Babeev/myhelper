import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AccountSlice } from 'types/account'
import { signup } from './api/auth'

const initialState: AccountSlice = {
  fistName: null,
  lastName: null,
  middleName: null,
  login: null,
  number: null,
  userId: null,
  isLoggedIn: false,
}

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    setAccount(
      state,
      action: PayloadAction<{
        input: keyof AccountSlice
        value: string | boolean | null
      }>
    ) {
      const { input, value } = action.payload

      //@ts-ignore
      state[input] = value
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(signup.matchFulfilled, (state, action) => {
      const { firstName, lastName, middleName, login, number, userId } =
        action.payload

      state.fistName = firstName
      state.lastName = lastName
      state.middleName = middleName
      state.login = login
      state.number = number
      state.userId = userId
    }),
})

const { actions, reducer } = accountSlice

export const { setAccount } = actions
export default reducer
