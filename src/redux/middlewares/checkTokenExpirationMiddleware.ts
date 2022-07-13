import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'
import { clearAccount } from 'redux/slices/accountSlice'
import { RootState } from 'redux/store'
import { DecodedAccountToken } from 'types'

export const checkTokenExpirationMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const token = localStorage.getItem('token')
    const state = api.getState() as RootState
    const isLoggedIn = state.account.isLoggedIn

    if (isLoggedIn) {
      if (token) {
        const decodedToken = jwtDecode<DecodedAccountToken>(token)
        const expiration = decodedToken.exp
        const now = Date.now() / 1000

        //checking: has token expired
        if (expiration < now) {
          toast.error('Время сессии завершено')

          localStorage.removeItem('token')
          api.dispatch(clearAccount())
        }
      } else {
        toast.error('Время сессии завершено')

        api.dispatch(clearAccount())
        console.log('logged without token')
      }
    }

    next(action)
  }
