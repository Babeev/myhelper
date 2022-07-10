import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setNumber } from 'features/account/accountSlice'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { phoneNumber, requiredField } from 'utils/validators'

export const useInputNumber = () => {
  const dispatch = useAppDispatch()

  const [numberValue, setNumberValue] = useState<string | null>(null)
  const [numberError, setNumberError] = useState<string | null>(null)

  const initialNumberValue = useAppSelector((state) => state.account.number)

  const onChangeNumberHandler = useCallback((value: string) => {
    setNumberValue(value)
  }, [])

  const onBlurNumberHandler = useCallback(
    (value: string) => {
      dispatch(setNumber(value))
    },
    [dispatch]
  )

  const onValidateNumberHandler = useCallback((value: string) => {
    const error = [phoneNumber, requiredField]
      .map((validate) => validate(value))
      .filter((error) => error)

    setNumberError(error?.[0] || null)
  }, [])

  const isNumberValueExist = useMemo(() => Boolean(numberValue), [numberValue])
  const isNumberErrorExist = useMemo(() => Boolean(numberError), [numberError])

  useEffect(() => {
    setNumberValue(initialNumberValue)
  }, [initialNumberValue])

  return {
    numberValue,
    numberError,
    onChangeNumberHandler,
    onBlurNumberHandler,
    onValidateNumberHandler,
    isNumberValueExist,
    isNumberErrorExist,
  }
}
