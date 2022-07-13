import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { Layout } from 'common/components/layout'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledP } from 'common/styled/styledP'
import { requiredField } from 'utils/validators'
import { COLORS } from 'utils/constants'
import { useGetOAuthTokenMutation } from 'redux/api/auth'
import { toast } from 'react-toastify'

export const Login = () => {
  const navigate = useNavigate()

  const [getOAuthToken] = useGetOAuthTokenMutation()

  const onSignupRouteHandler = () => {
    navigate('/auth/signup')
  }

  const onLoginHandler = (login: string | null, password: string | null) => {
    const loginPromise = getOAuthToken({
      login: login || '',
      password: password || '',
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
      const error = requiredField(inputValue)

      errors.password = error
    }

    return errors
  }, [])

  const initialValues = useMemo(() => ({ login: null, password: null }), [])

  return (
    <Layout title="Вход">
      <StyledFlexContainer column width="50%" padding="3rem 0 0 0">
        <Form initialValues={initialValues} validate={validate}>
          {({ values, errors, isFormValid }) => (
            <StyledFlexContainer column gap="1rem">
              <Input
                name="login"
                label="Логин"
                value={values.login}
                error={errors.login}
              />

              <Input
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
                  type="button"
                  color={isFormValid ? COLORS.PRIMARY : COLORS.GRAY}
                  disabled={!isFormValid}
                  padding="0.5rem 1rem"
                  onClick={() => onLoginHandler(values.login, values.password)}
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
