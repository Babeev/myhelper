import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getOAuthToken } from 'redux/api/auth'
import { getUserInfo } from 'redux/api/user'
import { AccountSliceState } from 'types'

const initialState: AccountSliceState = {
  firstName: null,
  lastName: null,
  middleName: null,
  login: null,
  phoneNumber: null,
  userId: null,
  isLoggedIn: false,
}

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    setAccountId(state, action: PayloadAction<number>) {
      state.userId = action.payload
    },
    clearAccount(state) {
      state.firstName = null
      state.lastName = null
      state.middleName = null
      state.login = null
      state.phoneNumber = null
      state.isLoggedIn = false
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(getOAuthToken.matchFulfilled, (state, action) => {
        const { access_token, user_id } = action.payload

        state.isLoggedIn = true
        state.userId = user_id

        localStorage.setItem('token', access_token)
      })
      .addMatcher(getUserInfo.matchFulfilled, (state, action) => {
        const { firstName, lastName, middleName, login, phoneNumber, id } =
          action.payload

        state.firstName = firstName
        state.lastName = lastName
        state.middleName = middleName
        state.login = login
        state.phoneNumber = phoneNumber
        state.userId = id
      }),
})

const { actions, reducer } = accountSlice

export const { setAccountId, clearAccount } = actions
export default reducer
