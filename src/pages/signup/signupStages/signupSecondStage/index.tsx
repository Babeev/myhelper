import { memo, useCallback, useMemo } from 'react'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { phoneNumber, requiredField } from 'utils/validators'
import { PRIMARY_COLOR, GRAY_COLOR } from 'utils/constants'

interface SignupSecondStageProps {
  onSubmitHandler: () => void
}

export const SignupSecondStage = memo(
  ({ onSubmitHandler }: SignupSecondStageProps) => {
    const validate = useCallback((inputName: string, inputValue: string) => {
      const errors: Record<string, string | null> = {}

      if (inputName === 'number') {
        const validateResults = [phoneNumber, requiredField]
          .map((validate) => validate(inputValue))
          .filter((error) => error)

        errors.number = validateResults[0]
      }

      return errors
    }, [])

    const initialValues = useMemo(() => ({ number: null }), [])

    return (
      <Form initialValues={initialValues} validate={validate}>
        {({ values, errors, isFormValid }) => (
          <StyledFlexContainer column gap="1rem">
            <Input
              label="Номер телефона"
              name="number"
              value={values.number}
              error={errors.number}
              cypressName="number"
            />

            <StyledFlexContainer column alignItems="center">
              <StyledButton
                type="button"
                color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
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
