import { useState, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRIMARY_COLOR, GRAY_COLOR } from 'common/constants'
import { CustomForm } from 'common/customForm'
import { CustomInput } from 'common/customInput'
import { Button } from 'common/styled/button'
import { P } from 'common/styled/paragraph'
import { requiredField } from 'utils/validators'
import {
  setFirstName,
  setLastName,
  setPatronymic,
} from 'features/account/accountSlice'
import { useAppDispatch } from 'app/hooks'

interface FirstStageProps {
  linkNavigatePath: string
  linkNavigateText: string
  submitButtonText: string
  onSubmitHandler: () => void
}

export const FirstStage = memo(
  ({
    linkNavigatePath,
    linkNavigateText,
    submitButtonText,
    onSubmitHandler,
  }: FirstStageProps) => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [firstNameValue, setFirstNameValue] = useState<string | null>(null)
    const [firstNameError, setFirstNameError] = useState<string | null>(null)
    const [lastNameValue, setLastNameValue] = useState<string | null>(null)
    const [lastNameError, setLastNameError] = useState<string | null>(null)
    const [patronymicValue, setPatronymicValue] = useState<string | null>(null)
    const [patronymicError, setPatronymicError] = useState<string | null>(null)

    const onChangeFirstNameHandler = useCallback((value: string) => {
      setFirstNameValue(value)
    }, [])

    const onBlurFirstNameHandler = useCallback(
      (value: string) => {
        dispatch(setFirstName(value))
      },
      [dispatch]
    )

    const onChangeLastNameHandler = useCallback((value: string) => {
      setLastNameValue(value)
    }, [])

    const onBlurSecondNameHandler = useCallback(
      (value: string) => {
        dispatch(setLastName(value))
      },
      [dispatch]
    )

    const onChangePatronymicHandler = useCallback((value: string) => {
      setPatronymicValue(value)
    }, [])

    const onBlurPatronymicHandler = useCallback(
      (value: string) => {
        dispatch(setPatronymic(value))
      },
      [dispatch]
    )

    const onRouteToSignup = () => {
      navigate(linkNavigatePath)
    }

    const validate = (inputName: string, inputValue: string) => {
      if (inputName === 'firstName') {
        const error = requiredField(inputValue)

        setFirstNameError(error || '')
      }
      if (inputName === 'lastName') {
        const error = requiredField(inputValue)

        setLastNameError(error || '')
      }
      if (inputName === 'patronymic') {
        const error = requiredField(inputValue)

        setPatronymicError(error || '')
      }
    }

    const areAllValuesValid = [
      firstNameError,
      lastNameError,
      patronymicError,
    ].every((value) => !value)

    const isAllValuesExist = [
      firstNameValue,
      lastNameValue,
      patronymicValue,
    ].every((value) => value?.length)

    const isFormValid = isAllValuesExist && areAllValuesValid

    return (
      <CustomForm validate={validate} width="100%">
        <CustomInput
          label="Имя"
          name="firstName"
          value={firstNameValue}
          onChange={onChangeFirstNameHandler}
          onBlur={onBlurFirstNameHandler}
          error={firstNameError}
          margin="0 0 1rem 0"
        />

        <CustomInput
          label="Фамилия"
          name="lastName"
          value={lastNameValue}
          error={lastNameError}
          onChange={onChangeLastNameHandler}
          onBlur={onBlurSecondNameHandler}
          margin="0 0 1rem 0"
        />

        <CustomInput
          label="Отчество"
          name="patronymic"
          value={patronymicValue}
          error={patronymicError}
          onChange={onChangePatronymicHandler}
          onBlur={onBlurPatronymicHandler}
        />

        <P
          color={PRIMARY_COLOR}
          onClick={onRouteToSignup}
          cursor="pointer"
          margin="0.5rem auto 0 0"
        >
          {linkNavigateText}
        </P>

        <Button
          type="button"
          color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
          margin="1rem auto"
          padding="0.5rem"
          disabled={!isFormValid}
          onClick={onSubmitHandler}
        >
          {submitButtonText}
        </Button>
      </CustomForm>
    )
  }
)
