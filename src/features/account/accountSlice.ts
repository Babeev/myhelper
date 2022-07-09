import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState: {
    fistName: '',
    lastName: '',
    middleName: '',
    isLoggedIn: false,
  },
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.fistName = action.payload
    },

    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload
    },

    setMiddleName(state, action: PayloadAction<string>) {
      state.middleName = action.payload
    },

    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
})

const { actions, reducer } = accountSlice

export const { setFirstName, setLastName, setMiddleName, setLoggedIn } = actions
export default reducer
