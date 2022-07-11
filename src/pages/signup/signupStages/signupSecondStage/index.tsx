import { PRIMARY_COLOR, GRAY_COLOR } from 'common/constants'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { Button } from 'common/styled/button'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { phoneNumber, requiredField } from 'common/utils/validators'
import { FlexContainer } from 'common/styled/flexContainer'

interface SignupSecondStageProps {
  onSubmitHandler: () => void
}

export const SignupSecondStage = ({
  onSubmitHandler,
}: SignupSecondStageProps) => {
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
        <FlexContainer column gap="1rem">
          <Input
            label="Номер телефона"
            name="number"
            value={values.number}
            error={errors.number}
            cypressName="number"
          />

          <FlexContainer column alignItems="center">
            <Button
              type="button"
              color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
              padding="0.5rem 1rem"
              disabled={!isFormValid}
              onClick={onSubmitHandler}
              data-cy="nextStageButton"
            >
              Продолжить
            </Button>
          </FlexContainer>
        </FlexContainer>
      )}
    </Form>
  )
}
