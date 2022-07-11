import { memo, ReactElement, SyntheticEvent, useMemo, useState } from 'react'
import { StyledForm } from './styled'

type Values = Record<string, string | null>
type Errors = Record<string, string | null>
type ChildrenProps = {
  values: Values
  errors: Errors
  isFormValid: boolean
}

interface FormProps {
  initialValues: Values
  validate: (name: string, value: string) => Errors
  children: ({ values, errors }: ChildrenProps) => ReactElement
}

export const Form = memo(({ initialValues, validate, children }: FormProps) => {
  const [values, setValues] = useState<Values>(initialValues)
  const [errors, setErrors] = useState<Errors>({})

  const onChangeHandler = (event: SyntheticEvent<HTMLFormElement>) => {
    const input = event.target as HTMLInputElement

    setValues({ ...values, [input.name]: input.value })

    const newErrors = validate(input.name, input.value)
    setErrors({ ...errors, ...newErrors })
  }

  const isAllValuesExist = useMemo(
    () => Object.values(values).every((value) => value),
    [values]
  )

  const areAllValuesValid = useMemo(
    () => Object.values(errors).every((value) => !value),
    [errors]
  )

  const isFormValid = isAllValuesExist && areAllValuesValid

  return (
    <StyledForm onChange={onChangeHandler}>
      {children({ errors, values, isFormValid })}
    </StyledForm>
  )
})
