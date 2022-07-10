import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'redux/hooks'
import { setAccount } from 'redux/accountSlice'
import { DANGER_COLOR, GRAY_COLOR, PRIMARY_COLOR } from 'common/constants'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { Button } from 'common/styled/button'
import { FlexContainer } from 'common/styled/flexContainer'
import { phoneNumber, requiredField } from 'common/utils/validators'

export const AccountForm = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

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
      firstName: null,
      lastName: null,
      middleName: null,
      login: null,
      number: null,
    }),
    []
  )

  return (
    <Form initialValues={initialValues} validate={validate}>
      {({ values, errors, isFormValid }) => (
        <>
          <Input
            label="Имя"
            name="firstName"
            value={values.firstName}
            error={errors.firstName}
            margin="0 0 1rem 0"
            cypressName="firstName"
          />

          <Input
            label="Фамилия"
            name="lastName"
            value={values.lastName}
            error={errors.lastName}
            margin="0 0 1rem 0"
            cypressName="lastName"
          />

          <Input
            label="Отчество"
            name="middleName"
            value={values.middleName}
            error={errors.middleName}
            margin="0 0 1rem 0"
            cypressName="middleName"
          />

          <Input
            label="Логин"
            name="login"
            value={values.login}
            error={errors.login}
            margin="0 0 1rem 0"
            cypressName="login"
          />

          <Input
            label="Номер телефона"
            name="number"
            value={values.number}
            error={errors.number}
            margin="0 0 1rem 0"
            cypressName="number"
          />

          <FlexContainer>
            <Button
              type="button"
              color={DANGER_COLOR}
              margin="0 auto 0 0"
              padding="0.5rem"
              onClick={onExitHandler}
            >
              Выйти
            </Button>

            <Button
              type="button"
              color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
              margin="0"
              padding="0.5rem"
              disabled={!isFormValid}
            >
              Сохранить
            </Button>
          </FlexContainer>
        </>
      )}
    </Form>
  )
}
