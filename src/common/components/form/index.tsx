import {
  memo,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { StyledForm } from './styled'

type Errors = Record<string, string | null>

type ChildrenProps<InitialValuesType> = {
  values: InitialValuesType
  errors: Errors
  isFormValid: boolean
}

interface FormProps<InitialValuesType> {
  initialValues: InitialValuesType
  validate: (name: string, value: string) => Errors
  children: ({
    values,
    errors,
    isFormValid,
  }: ChildrenProps<InitialValuesType>) => ReactElement
}

const genericMemo: <T>(component: T) => T = memo

function GenericForm<InitialValuesType>({
  initialValues,
  validate,
  children,
}: FormProps<InitialValuesType>) {
  const [values, setValues] = useState<InitialValuesType>(initialValues)
  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

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
}

export const Form = genericMemo(GenericForm) as typeof GenericForm
