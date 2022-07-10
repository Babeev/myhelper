import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AccountSlice {
  fistName: string | null
  lastName: string | null
  middleName: string | null
  login: string | null
  number: string | null
  userId: number | null
  isLoggedIn: boolean
}

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
})

const { actions, reducer } = accountSlice

export const { setAccount } = actions
export default reducer
