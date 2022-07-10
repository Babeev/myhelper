import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setLogin } from 'features/account/accountSlice'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { requiredField } from 'utils/validators'

export const useInputLogin = () => {
  const dispatch = useAppDispatch()

  const [loginValue, setLoginValue] = useState<string | null>(null)
  const [loginError, setLoginError] = useState<string | null>(null)

  const initialLoginValue = useAppSelector((state) => state.account.login)

  const onChangeLoginHandler = useCallback((value: string) => {
    setLoginValue(value)
  }, [])

  const onBlurLoginHandler = useCallback(
    (value: string) => {
      dispatch(setLogin(value))
    },
    [dispatch]
  )

  const onValidateLoginHandler = useCallback((value: string) => {
    const error = requiredField(value)

    setLoginError(error)
  }, [])

  const isLoginValueExist = useMemo(() => Boolean(loginValue), [loginValue])
  const isLoginErrorExist = useMemo(() => Boolean(loginError), [loginError])

  useEffect(() => {
    setLoginValue(initialLoginValue)
  }, [initialLoginValue])

  return {
    loginValue,
    loginError,
    onChangeLoginHandler,
    onBlurLoginHandler,
    onValidateLoginHandler,
    isLoginValueExist,
    isLoginErrorExist,
  }
}
