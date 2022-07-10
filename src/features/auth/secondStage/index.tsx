import { PRIMARY_COLOR, GRAY_COLOR } from 'common/constants'
import { CustomForm } from 'common/customForm'
import { CustomInput } from 'common/customInput'
import { useInputNumber } from 'common/hooks/useInputNumber'
import { Button } from 'common/styled/button'
import { useCallback } from 'react'

interface SecondStageProps {
  onSubmitHandler: () => void
}

export const SecondStage = ({ onSubmitHandler }: SecondStageProps) => {
  const {
    numberValue,
    numberError,
    onChangeNumberHandler,
    onBlurNumberHandler,
    onValidateNumberHandler,
    isNumberValueExist,
    isNumberErrorExist,
  } = useInputNumber()

  const isFormValid = isNumberValueExist && !isNumberErrorExist

  const validate = useCallback(
    (inputName: string, inputValue: string) => {
      if (inputName === 'number') {
        onValidateNumberHandler(inputValue)
      }
    },
    [onValidateNumberHandler]
  )

  return (
    <CustomForm validate={validate} width="100%">
      <CustomInput
        label="Номер телефона"
        name="number"
        value={numberValue}
        onChange={onChangeNumberHandler}
        onBlur={onBlurNumberHandler}
        error={numberError}
        margin="0 0 1rem 0"
        cypressName="number"
      />

      <Button
        type="button"
        color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
        margin="1rem auto"
        padding="0.5rem"
        disabled={!isFormValid}
        onClick={onSubmitHandler}
        data-cy="nextStageButton"
      >
        Продолжить
      </Button>
    </CustomForm>
  )
}
