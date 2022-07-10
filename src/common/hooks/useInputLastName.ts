import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setLastName } from 'features/account/accountSlice'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { requiredField } from 'utils/validators'

export const useInputLastName = () => {
  const dispatch = useAppDispatch()

  const [lastNameValue, setLastNameValue] = useState<string | null>(null)
  const [lastNameError, setLastNameError] = useState<string | null>(null)

  const initialLastNameValue = useAppSelector((state) => state.account.lastName)

  const onChangeLastNameHandler = useCallback((value: string) => {
    setLastNameValue(value)
  }, [])

  const onBlurSecondNameHandler = useCallback(
    (value: string) => {
      dispatch(setLastName(value))
    },
    [dispatch]
  )

  const onValidateSecondNameHandler = useCallback((value: string) => {
    const error = requiredField(value)

    setLastNameError(error)
  }, [])

  const isLastNameValueExist = useMemo(
    () => Boolean(lastNameValue),
    [lastNameValue]
  )
  const isLastNameErrorExist = useMemo(
    () => Boolean(lastNameError),
    [lastNameError]
  )

  useEffect(() => {
    setLastNameValue(initialLastNameValue)
  }, [initialLastNameValue])

  return {
    lastNameValue,
    lastNameError,
    onChangeLastNameHandler,
    onBlurSecondNameHandler,
    onValidateSecondNameHandler,
    isLastNameValueExist,
    isLastNameErrorExist,
  }
}
