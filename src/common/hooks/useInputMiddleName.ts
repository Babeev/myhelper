import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setMiddleName } from 'features/account/accountSlice'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { requiredField } from 'utils/validators'

export const useInputMiddleName = () => {
  const dispatch = useAppDispatch()

  const [middleNameValue, setMiddleNameValue] = useState<string | null>(null)
  const [middleNameError, setMiddleNameError] = useState<string | null>(null)

  const initialMiddleNameValue = useAppSelector(
    (state) => state.account.middleName
  )

  const onChangeMiddleNameHandler = useCallback((value: string) => {
    setMiddleNameValue(value)
  }, [])

  const onBlurMiddleNameHandler = useCallback(
    (value: string) => {
      dispatch(setMiddleName(value))
    },
    [dispatch]
  )

  const onValidateMiddleNameHandler = useCallback((inputValue: string) => {
    const error = requiredField(inputValue)

    setMiddleNameError(error)
  }, [])

  const isMiddleNameValueExist = useMemo(
    () => Boolean(middleNameValue),
    [middleNameValue]
  )
  const isMiddleNameErrorExist = useMemo(
    () => Boolean(middleNameError),
    [middleNameError]
  )

  useEffect(() => {
    setMiddleNameValue(initialMiddleNameValue)
  }, [initialMiddleNameValue])

  return {
    middleNameValue,
    middleNameError,
    onChangeMiddleNameHandler,
    onBlurMiddleNameHandler,
    onValidateMiddleNameHandler,
    isMiddleNameValueExist,
    isMiddleNameErrorExist,
  }
}
