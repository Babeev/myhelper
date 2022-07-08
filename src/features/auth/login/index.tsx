import { PRIMARY_COLOR } from 'common/constants'
import { CustomForm } from 'common/customForm'
import { CustomInput } from 'common/customInput'
import { Button } from 'common/styled/button'
import { FlexContainer } from 'common/styled/flexContainer'
import { P } from 'common/styled/paragraph'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { requiredField } from 'utils/validators'

export const Login = () => {
  const navigate = useNavigate()

  const [firstNameValue, setFirstNameVale] = useState<string | null>(null)
  const [firstNameError, setFirstNameError] = useState<string | null>(null)
  const [lastNameValue, setLastNameValue] = useState<string | null>(null)
  const [lastNameError, setLastNameError] = useState<string | null>(null)
  const [patronymicValue, setPatronymicValue] = useState<string | null>(null)
  const [patronymicError, setPatronymicError] = useState<string | null>(null)

  const onChangeFirstNameHandler = useCallback((value: string) => {
    setFirstNameVale(value)
  }, [])

  const onChangeLastNameHandler = useCallback((value: string) => {
    setLastNameValue(value)
  }, [])

  const onChangePatronymicHandler = useCallback((value: string) => {
    setPatronymicValue(value)
  }, [])

  const onRouteToSignup = () => {
    navigate('/auth/signup')
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

  return (
    <FlexContainer margin="3rem auto auto auto" width="50%">
      <CustomForm validate={validate} width="100%">
        <CustomInput
          label="Имя"
          name="firstName"
          value={firstNameValue}
          onChange={onChangeFirstNameHandler}
          error={firstNameError}
          margin="0 0 1rem 0"
        />

        <CustomInput
          label="Фамилия"
          name="lastName"
          value={lastNameValue}
          error={lastNameError}
          onChange={onChangeLastNameHandler}
          margin="0 0 1rem 0"
        />

        <CustomInput
          label="Отчество"
          name="patronymic"
          value={patronymicValue}
          error={patronymicError}
          onChange={onChangePatronymicHandler}
        />

        <P
          color={PRIMARY_COLOR}
          onClick={onRouteToSignup}
          cursor="pointer"
          margin="0.5rem auto 0 0"
        >
          Нет аккаунта?
        </P>

        <Button
          type="button"
          color={PRIMARY_COLOR}
          margin="1rem auto"
          padding="0.5rem"
        >
          Войти
        </Button>
      </CustomForm>
    </FlexContainer>
  )
}
