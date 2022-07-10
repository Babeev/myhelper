import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import { PRIMARY_COLOR, GRAY_COLOR } from 'common/constants'
import { CustomForm } from 'common/customForm'
import { CustomInput } from 'common/customInput'
import { Button } from 'common/styled/button'
import { P } from 'common/styled/paragraph'
import { maxLength, onlyNumbers, requiredField } from 'utils/validators'

interface ThirdStageProps {
  onSubmitHandler: () => void
}

const maxLenght4 = maxLength(4)

export const ThirdStage = ({ onSubmitHandler }: ThirdStageProps) => {
  const [codeValue, setCodeValue] = useState<string | null>(null)
  const [codeError, setCodeError] = useState<string | null>(null)
  const [counter, setCounter] = useState(30)

  const areAllValuesValid = [codeError].every((value) => !value)

  const isAllValuesExist = [codeValue].every((value) => value?.length)

  const isFormValid = isAllValuesExist && areAllValuesValid

  const onChangeCodeValue = useCallback((value: string) => {
    setCodeValue(value)
  }, [])

  const validate = useCallback((inputName: string, inputValue: string) => {
    if (inputName === 'code') {
      const error = [requiredField, onlyNumbers, maxLenght4]
        .map((validate) => validate(inputValue))
        .filter((error) => error)

      setCodeError(error?.[0] || null)
    }
  }, [])

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

  return (
    <CustomForm validate={validate} width="100%">
      <CustomInput
        label="Код из СМС"
        name="code"
        value={codeValue}
        onChange={onChangeCodeValue}
        error={codeError}
        margin="0 0 1rem 0"
        cypressName="code"
      />

      {counter ? (
        <P color={GRAY_COLOR}>
          Отправить код повторно можно через {counter} секунд
        </P>
      ) : (
        <P color={PRIMARY_COLOR} cursor="pointer" onClick={onResendHandler}>
          Отправить код повторно
        </P>
      )}

      <Button
        type="button"
        color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
        margin="1rem auto"
        padding="0.5rem"
        disabled={!isFormValid}
        onClick={onSubmitHandler}
        width="auto"
        data-cy="submitSignup"
      >
        Зарегистрироваться
      </Button>
    </CustomForm>
  )
}
