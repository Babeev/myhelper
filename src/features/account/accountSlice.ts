import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState: {
    fistName: '',
    lastName: '',
    patronymic: '',
  },
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.fistName = action.payload
    },

    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload
    },

    setPatronymic(state, action: PayloadAction<string>) {
      state.patronymic = action.payload
    },
  },
})

const { actions, reducer } = accountSlice

export const { setFirstName, setLastName, setPatronymic } = actions
export default reducer
