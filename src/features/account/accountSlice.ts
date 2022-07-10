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
    setFirstName(state, action: PayloadAction<string | null>) {
      state.fistName = action.payload
    },

    setLastName(state, action: PayloadAction<string | null>) {
      state.lastName = action.payload
    },

    setMiddleName(state, action: PayloadAction<string | null>) {
      state.middleName = action.payload
    },

    setLogin(state, action: PayloadAction<string | null>) {
      state.login = action.payload
    },

    setNumber(state, action: PayloadAction<string | null>) {
      state.number = action.payload
    },

    setUserId(state, action: PayloadAction<number | null>) {
      state.userId = action.payload
    },

    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
})

const { actions, reducer } = accountSlice

export const {
  setFirstName,
  setLastName,
  setMiddleName,
  setLogin,
  setNumber,
  setUserId,
  setLoggedIn,
} = actions
export default reducer
