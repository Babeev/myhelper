import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { Layout } from 'common/components/layout'
import { GRAY_COLOR, PRIMARY_COLOR } from 'common/constants'
import { Button } from 'common/styled/button'
import { FlexContainer } from 'common/styled/flexContainer'
import { P } from 'common/styled/paragraph'
import { requiredField } from 'common/utils/validators'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()

  const onSignupRouteHandler = () => {
    navigate('/auth/signup')
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
      <FlexContainer column width="50%" padding="3rem 0 0 0">
        <Form initialValues={initialValues} validate={validate}>
          {({ values, errors, isFormValid }) => (
            <FlexContainer column gap="1rem">
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

              <P
                color={PRIMARY_COLOR}
                cursor="pointer"
                onClick={onSignupRouteHandler}
                data-cy="toSignupRoute"
              >
                Нет аккаунта?
              </P>

              <FlexContainer justifyContent="space-around">
                <Button
                  type="button"
                  color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
                  disabled={!isFormValid}
                  padding="0.5rem 1rem"
                >
                  Войти
                </Button>
              </FlexContainer>
            </FlexContainer>
          )}
        </Form>
      </FlexContainer>
    </Layout>
  )
}
