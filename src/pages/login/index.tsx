import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { Layout } from 'common/components/layout'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledP } from 'common/styled/styledP'
import { composeValidator, minMaxLength, requiredField } from 'utils/validators'
import { COLORS } from 'utils/constants'
import { useGetOAuthTokenMutation } from 'redux/api/auth'
import { toast } from 'react-toastify'

export const Login = () => {
  const navigate = useNavigate()

  const [getOAuthToken] = useGetOAuthTokenMutation()

  const initialValues = useMemo(() => ({ login: null, password: null }), [])

  const onSignupRouteHandler = () => {
    navigate('/auth/signup')
  }

  const onLoginHandler = (values: typeof initialValues) => {
    const loginPromise = getOAuthToken({
      login: values.login || '',
      password: values.password || '',
    }).unwrap()

    toast.promise(loginPromise, {
      pending: 'Загрузка...',
      error: 'Произошла ошибка',
    })

    loginPromise
      .then(() => {
        navigate('/services')
      })
      .catch((e) => console.log(e))
  }

  const validate = useCallback((inputName: string, inputValue: string) => {
    const errors: Record<string, string | null> = {}

    if (inputName === 'login') {
      const error = requiredField(inputValue)

      errors.login = error
    }
    if (inputName === 'password') {
      const validator = composeValidator([requiredField, minMaxLength(5, 30)])
      const error = validator(inputValue)

      errors.password = error
    }

    return errors
  }, [])

  return (
    <Layout title="Вход">
      <StyledFlexContainer column width="50%" padding="3rem 0 0 0">
        <Form
          initialValues={initialValues}
          validate={validate}
          onSubmit={onLoginHandler}
        >
          {({ values, errors, isFormValid }) => (
            <StyledFlexContainer column gap="1rem">
              <Input
                required
                name="login"
                label="Логин"
                value={values.login}
                error={errors.login}
              />

              <Input
                required
                type="password"
                name="password"
                label="Пароль"
                value={values.password}
                error={errors.password}
              />

              <StyledP
                color={COLORS.PRIMARY}
                cursor="pointer"
                onClick={onSignupRouteHandler}
                data-cy="toSignupRoute"
              >
                Нет аккаунта?
              </StyledP>

              <StyledFlexContainer justifyContent="space-around">
                <StyledButton
                  type="submit"
                  color={isFormValid ? COLORS.PRIMARY : COLORS.GRAY}
                  disabled={!isFormValid}
                  padding="0.5rem 1rem"
                >
                  Войти
                </StyledButton>
              </StyledFlexContainer>
            </StyledFlexContainer>
          )}
        </Form>
      </StyledFlexContainer>
    </Layout>
  )
}
