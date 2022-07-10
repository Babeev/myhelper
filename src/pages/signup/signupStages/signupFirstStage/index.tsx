import { useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRIMARY_COLOR, GRAY_COLOR } from 'common/constants'
import { Form } from 'common/components/form'
import { Button } from 'common/styled/button'
import { P } from 'common/styled/paragraph'
import { Input } from 'common/components/input'
import { useMemo } from 'react'
import { requiredField } from 'common/utils/validators'

interface SignupFirstStageProps {
  linkNavigatePath: string
  linkNavigateText: string
  submitButtonText: string
  onSubmitHandler: () => void
}

export const SignupFirstStage = memo(
  ({
    linkNavigatePath,
    linkNavigateText,
    submitButtonText,
    onSubmitHandler,
  }: SignupFirstStageProps) => {
    const navigate = useNavigate()

    const onRouteToSignup = () => {
      navigate(linkNavigatePath)
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
              cypressName="middleName"
            />

            <P
              color={PRIMARY_COLOR}
              onClick={onRouteToSignup}
              cursor="pointer"
              margin="0.5rem auto 0 0.75rem"
              data-cy="toSignupRoute"
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
              data-cy="nextStageButton"
            >
              {submitButtonText}
            </Button>
          </>
        )}
      </Form>
    )
  }
)
