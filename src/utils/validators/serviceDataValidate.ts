import {
  composeValidator,
  minMaxLength,
  onlyNumbers,
  requiredField,
} from 'utils/validators'

export const validate = (inputName: string, inputValue: string) => {
  const errors: Record<string, string | null> = {}

  if (inputName === 'name') {
    const validator = composeValidator([requiredField, minMaxLength(5, 50)])
    const error = validator(inputValue)

    errors.name = error
  }

  if (inputName === 'description') {
    const validator = composeValidator([requiredField, minMaxLength(5, 200)])
    const error = validator(inputValue)

    errors.description = error
  }

  if (inputName === 'city') {
    const validator = composeValidator([requiredField, minMaxLength(5, 200)])
    const error = validator(inputValue)

    errors.city = error
  }

  if (inputName === 'price') {
    const validator = composeValidator([onlyNumbers, requiredField])
    const error = validator(inputValue)

    errors.price = error
  }
  return errors
}
