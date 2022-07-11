import { useCallback, memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from 'common/components/form'
import { StyledButton } from 'common/styled/styledButton'
import { StyledP } from 'common/styled/styledP'
import { Input } from 'common/components/input'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { COLORS } from 'utils/constants'
import { requiredField } from 'utils/validators'

interface SignupFirstStageProps {
  onSubmitHandler: () => void
}

export const SignupFirstStage = memo(
  ({ onSubmitHandler }: SignupFirstStageProps) => {
    const navigate = useNavigate()

    const onRouteToSignup = () => {
      navigate('/auth/login')
    }

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

      return errors
    }, [])

    const initialValues = useMemo(
      () => ({ firstName: null, lastName: null, middleName: null }),
      []
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

            <StyledP
              color={COLORS.PRIMARY}
              onClick={onRouteToSignup}
              cursor="pointer"
              data-cy="toSignupRoute"
            >
              Уже есть аккаунт?
            </StyledP>

            <StyledFlexContainer column alignItems="center">
              <StyledButton
                type="button"
                color={isFormValid ? COLORS.PRIMARY : COLORS.GRAY}
                padding="0.5rem 1rem"
                disabled={!isFormValid}
                onClick={onSubmitHandler}
                data-cy="nextStageButton"
              >
                Продолжить
              </StyledButton>
            </StyledFlexContainer>
          </StyledFlexContainer>
        )}
      </Form>
    )
  }
)
