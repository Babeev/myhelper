import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import { PRIMARY_COLOR, GRAY_COLOR } from 'common/constants'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { Button } from 'common/styled/button'
import { P } from 'common/styled/paragraph'
import { maxLength, onlyNumbers, requiredField } from 'common/utils/validators'
import { useMemo } from 'react'

interface SignupThirdStageProps {
  onSubmitHandler: () => void
}

const maxLenght4 = maxLength(4)

export const SignupThirdStage = ({
  onSubmitHandler,
}: SignupThirdStageProps) => {
  const [counter, setCounter] = useState(30)

  const validate = useCallback((inputName: string, inputValue: string) => {
    const errors: Record<string, string | null> = {}

    if (inputName === 'code') {
      const validateResults = [requiredField, onlyNumbers, maxLenght4]
        .map((validate) => validate(inputValue))
        .filter((error) => error)

      errors.code = validateResults[0]
    }

    return errors
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

  const initialValues = useMemo(
    () => ({
      code: null,
    }),
    []
  )

  return (
    <Form initialValues={initialValues} validate={validate}>
      {({ values, errors, isFormValid }) => (
        <>
          <Input
            label="Код из СМС"
            name="code"
            value={values.code}
            error={errors.code}
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
        </>
      )}
    </Form>
  )
}
