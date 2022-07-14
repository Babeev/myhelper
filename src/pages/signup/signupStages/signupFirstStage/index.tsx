import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledButton } from 'common/styled/styledButton'
import { StyledP } from 'common/styled/styledP'
import { Input } from 'common/components/input'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { COLORS } from 'utils/constants'

interface SignupFirstStageProps {
  values: {
    firstName: string | null
    lastName: string | null
    middleName: string | null
    login: string | null
    password: string | null
    phoneNumber: number | null
    code: number | null
  }
  errors: Record<string, string | null>
  onSubmitHandler: (isValid: boolean, stage: number) => void
}

export const SignupFirstStage = memo(
  ({ values, errors, onSubmitHandler }: SignupFirstStageProps) => {
    const navigate = useNavigate()

    const onRouteToSignup = () => {
      navigate('/auth/login')
    }

    const { phoneNumber, code, ...valuesToValidate } = values

    const isAllValuesExist = Object.values(valuesToValidate).every(
      (value) => value
    )
    const areAllValuesValid = Object.values(errors).every((value) => !value)
    const isFormValid = isAllValuesExist && areAllValuesValid

    return (
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

        <Input
          label="Логин"
          name="login"
          value={values.login}
          error={errors.login}
          cypressName="login"
        />

        <Input
          label="Пароль"
          name="password"
          value={values.password}
          error={errors.password}
          cypressName="password"
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
            onClick={() => onSubmitHandler(isFormValid, 2)}
            data-cy="nextStageButton"
          >
            Продолжить
          </StyledButton>
        </StyledFlexContainer>
      </StyledFlexContainer>
    )
  }
)
