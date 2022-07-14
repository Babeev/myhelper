import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Input } from 'common/components/input'
import { StyledButton } from 'common/styled/styledButton'
import { StyledP } from 'common/styled/styledP'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { maxLength, onlyNumbers, requiredField } from 'utils/validators'
import { COLORS } from 'utils/constants'

const maxLenght4 = maxLength(4)

export const SignupThirdStage = () => {
  const [codeValue, setCodeValue] = useState<string | null>(null)
  const [codeError, setCodeError] = useState<string | null>(null)
  const [counter, setCounter] = useState(30)

  const validate = useCallback((inputValue: string) => {
    const validateResults = [requiredField, onlyNumbers, maxLenght4]
      .map((validate) => validate(inputValue))
      .filter((error) => error)

    const error = validateResults[0]
    setCodeError(error)
  }, [])

  const onChange = useCallback(
    (inputValue: string) => {
      setCodeValue(inputValue)
      validate(inputValue)
    },
    [validate]
  )

  const onResendHandler = () => {
    setCounter(30)
    toast.success('Код отправлен снова')
  }

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => setCounter(counter - 1), 1000)

      return () => clearInterval(timer)
    }
  }, [counter])

  const isFormValid = Boolean(codeValue && !codeError)

  return (
    <StyledFlexContainer column gap="0.5rem">
      <Input
        label="Код из СМС"
        name="code"
        value={codeValue}
        error={codeError}
        onChange={onChange}
        cypressName="code"
      />

      {counter ? (
        <StyledP color={COLORS.GRAY}>
          Отправить код повторно можно через {counter} секунд
        </StyledP>
      ) : (
        <StyledP
          color={COLORS.PRIMARY}
          cursor="pointer"
          onClick={onResendHandler}
        >
          Отправить код повторно
        </StyledP>
      )}

      <StyledFlexContainer column alignItems="center" padding="0.5rem 0 0 0">
        <StyledButton
          type="submit"
          color={isFormValid ? COLORS.PRIMARY : COLORS.GRAY}
          padding="0.5rem 1rem"
          disabled={!isFormValid}
          data-cy="submitSignup"
        >
          Зарегистрироваться
        </StyledButton>
      </StyledFlexContainer>
    </StyledFlexContainer>
  )
}
