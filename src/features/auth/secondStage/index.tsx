import { PRIMARY_COLOR, GRAY_COLOR } from 'common/constants'
import { CustomForm } from 'common/customForm'
import { CustomInput } from 'common/customInput'
import { Button } from 'common/styled/button'
import { useState, useCallback } from 'react'
import { phoneNumber, requiredField } from 'utils/validators'

interface SecondStageProps {
  onSubmitHandler: () => void
}

export const SecondStage = ({ onSubmitHandler }: SecondStageProps) => {
  const [numberValue, setNumberValue] = useState<string | null>(null)
  const [numberError, setNumberError] = useState<string | null>(null)

  const areAllValuesValid = [numberError].every((value) => !value)

  const isAllValuesExist = [numberValue].every((value) => value?.length)

  const isFormValid = isAllValuesExist && areAllValuesValid

  const onChangeFirstNameHandler = useCallback((value: string) => {
    setNumberValue(value)
  }, [])

  const validate = (inputName: string, inputValue: string) => {
    if (inputName === 'number') {
      const error = [phoneNumber, requiredField].map((validate) =>
        validate(inputValue)
      )

      setNumberError(error?.[0] || '')
    }
  }

  return (
    <CustomForm validate={validate} width="100%">
      <CustomInput
        label="Номер телефона"
        name="number"
        value={numberValue}
        onChange={onChangeFirstNameHandler}
        error={numberError}
        margin="0 0 1rem 0"
      />

      <Button
        type="button"
        color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
        margin="1rem auto"
        padding="0.5rem"
        disabled={!isFormValid}
        onClick={onSubmitHandler}
      >
        Продолжить
      </Button>
    </CustomForm>
  )
}
