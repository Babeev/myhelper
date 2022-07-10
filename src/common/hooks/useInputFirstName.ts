import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setFirstName } from 'features/account/accountSlice'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { requiredField } from 'utils/validators'

export const useInputFirstName = () => {
  const dispatch = useAppDispatch()

  const [firstNameValue, setFirstNameValue] = useState<string | null>(null)
  const [firstNameError, setFirstNameError] = useState<string | null>(null)

  const initialFirstNameValue = useAppSelector(
    (state) => state.account.fistName
  )

  const onChangeFirstNameHandler = useCallback((value: string) => {
    setFirstNameValue(value)
  }, [])

  const onBlurFirstNameHandler = useCallback(
    (value: string) => {
      dispatch(setFirstName(value))
    },
    [dispatch]
  )

  const onValidateFirstNameHandler = useCallback((value: string) => {
    const error = requiredField(value)

    setFirstNameError(error)
  }, [])

  const isFirstNameValueExist = useMemo(
    () => Boolean(firstNameValue),
    [firstNameValue]
  )
  const isFirstNameErrorExist = useMemo(
    () => Boolean(firstNameError),
    [firstNameError]
  )

  useEffect(() => {
    setFirstNameValue(initialFirstNameValue)
  }, [initialFirstNameValue])

  return {
    firstNameValue,
    firstNameError,
    onChangeFirstNameHandler,
    onBlurFirstNameHandler,
    onValidateFirstNameHandler,
    isFirstNameValueExist,
    isFirstNameErrorExist,
  }
}
