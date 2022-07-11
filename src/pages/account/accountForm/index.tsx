import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { setAccount } from 'redux/accountSlice'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { DANGER_COLOR, GRAY_COLOR, PRIMARY_COLOR } from 'utils/constants'
import { phoneNumber, requiredField } from 'utils/validators'

export const AccountForm = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const firstName = useAppSelector((state) => state.account.fistName)
  const lastName = useAppSelector((state) => state.account.lastName)
  const middleName = useAppSelector((state) => state.account.middleName)
  const login = useAppSelector((state) => state.account.login)
  const number = useAppSelector((state) => state.account.number)

  const validate = useCallback((inputName: string, inputValue: string) => {
    const errors: Record<string, string | null> = {}

    if (inputName === 'firstName') {
      const error = requiredField(inputValue)
      errors.firstName = error
    }

    if (inputName === 'lastName') {
      const error = requiredField(inputValue)

      errors.lastName = error
    }

    if (inputName === 'middleName') {
      const error = requiredField(inputValue)

      errors.middleName = error
    }

    if (inputName === 'login') {
      const error = requiredField(inputValue)

      errors.login = error
    }

    if (inputName === 'number') {
      const validateResults = [phoneNumber, requiredField]
        ?.map((validate) => validate(inputValue))
        .filter((error) => error)

      errors.number = validateResults[0] || ''
    }

    return errors
  }, [])

  const onExitHandler = () => {
    navigate('/auth/login')
    dispatch(setAccount({ input: 'isLoggedIn', value: false }))
  }

  const initialValues = useMemo(
    () => ({
      firstName,
      lastName,
      middleName,
      login,
      number,
    }),
    [firstName, lastName, middleName, login, number]
  )

  return (
    <Form initialValues={initialValues} validate={validate}>
      {({ values, errors, isFormValid }) => (
        <StyledFlexContainer column gap="1rem">
          <Input
            label="Имя"
            name="firstName"
            value={values.firstName}
            error={errors.firstName}
            cypressName="firstName"
          />

          <Input
            label="Фамилия"
            name="lastName"
            value={values.lastName}
            error={errors.lastName}
            cypressName="lastName"
          />

          <Input
            label="Отчество"
            name="middleName"
            value={values.middleName}
            error={errors.middleName}
            cypressName="middleName"
          />

          <Input
            label="Логин"
            name="login"
            value={values.login}
            error={errors.login}
            cypressName="login"
          />

          <Input
            label="Номер телефона"
            name="number"
            value={values.number}
            error={errors.number}
            cypressName="number"
          />

          <StyledFlexContainer justifyContent="space-between">
            <StyledButton
              type="button"
              color={DANGER_COLOR}
              padding="0.5rem 1rem"
              onClick={onExitHandler}
            >
              Выйти
            </StyledButton>

            <StyledButton
              type="button"
              color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
              padding="0.5rem 1rem"
              disabled={!isFormValid}
            >
              Сохранить
            </StyledButton>
          </StyledFlexContainer>
        </StyledFlexContainer>
      )}
    </Form>
  )
}
