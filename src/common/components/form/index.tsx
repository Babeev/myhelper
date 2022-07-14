import {
  memo,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { toast } from 'react-toastify'
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
  onSubmit: (values: InitialValuesType) => void
  children: ({
    values,
    errors,
    isFormValid,
  }: ChildrenProps<InitialValuesType>) => ReactElement
}

const genericMemo: <T>(component: T) => T = memo

function GenericForm<InitialValuesType>({
  initialValues,
  onSubmit,
  validate,
  children,
}: FormProps<InitialValuesType>) {
  const [values, setValues] = useState<InitialValuesType>(initialValues)
  const [errors, setErrors] = useState<Errors>({})

  const isFormValid = useMemo(
    () => Object.values(errors).every((value) => !value),
    [errors]
  )

  const onChangeHandler = (event: SyntheticEvent<HTMLFormElement>) => {
    const input = event.target as HTMLInputElement

    setValues({ ...values, [input.name]: input.value })

    const newErrors = validate(input.name, input.value)
    setErrors({ ...errors, ...newErrors })
  }

  const onPreSubmitValidate = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const inputs = Array.from(form.elements) as HTMLInputElement[]
    let errors: Errors = {}

    inputs.map((input) => {
      if (input.required) {
        const newErrors = validate(input.name, input.value)
        errors = { ...errors, ...newErrors }
      }
    })

    const isFormValid = Object.values(errors).every((value) => !value)

    if (isFormValid) {
      onSubmit(values)
    } else {
      setErrors(errors)
      toast.error('Не все поля заполнены верно. Пожалуйста, проверьте еще раз')
    }
  }

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  return (
    <StyledForm
      onChange={onChangeHandler}
      onSubmit={onPreSubmitValidate}
      noValidate
    >
      {children({ errors, values, isFormValid })}
    </StyledForm>
  )
}

export const Form = genericMemo(GenericForm) as typeof GenericForm
