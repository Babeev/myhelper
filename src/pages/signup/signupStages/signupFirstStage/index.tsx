import { useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRIMARY_COLOR, GRAY_COLOR } from 'common/constants'
import { Form } from 'common/components/form'
import { Button } from 'common/styled/button'
import { P } from 'common/styled/paragraph'
import { Input } from 'common/components/input'
import { useMemo } from 'react'
import { requiredField } from 'common/utils/validators'
import { FlexContainer } from 'common/styled/flexContainer'

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
          <FlexContainer column gap="1rem">
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

            <P
              color={PRIMARY_COLOR}
              onClick={onRouteToSignup}
              cursor="pointer"
              data-cy="toSignupRoute"
            >
              {linkNavigateText}
            </P>

            <FlexContainer column alignItems="center">
              <Button
                type="button"
                color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
                padding="0.5rem 1rem"
                disabled={!isFormValid}
                onClick={onSubmitHandler}
                data-cy="nextStageButton"
              >
                {submitButtonText}
              </Button>
            </FlexContainer>
          </FlexContainer>
        )}
      </Form>
    )
  }
)
