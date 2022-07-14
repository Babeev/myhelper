import { memo } from 'react'
import { Input } from 'common/components/input'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { COLORS } from 'utils/constants'

interface SignupSecondStageProps {
  value: number | null
  error: string | null
  onSubmitHandler: (isValid: boolean, stage: number) => void
}

export const SignupSecondStage = memo(
  ({ value, error, onSubmitHandler }: SignupSecondStageProps) => {
    const isFormValid = Boolean(value && !error)

    return (
      <StyledFlexContainer column gap="1rem">
        <Input
          label="Номер телефона"
          name="phoneNumber"
          value={value}
          error={error}
          cypressName="number"
        />

        <StyledFlexContainer column alignItems="center">
          <StyledButton
            type="button"
            color={isFormValid ? COLORS.PRIMARY : COLORS.GRAY}
            padding="0.5rem 1rem"
            disabled={!isFormValid}
            onClick={() => onSubmitHandler(isFormValid, 3)}
            data-cy="nextStageButton"
          >
            Продолжить
          </StyledButton>
        </StyledFlexContainer>
      </StyledFlexContainer>
    )
  }
)
