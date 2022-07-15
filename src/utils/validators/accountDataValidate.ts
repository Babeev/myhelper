import {
  requiredField,
  minMaxLength,
  phoneNumber,
  composeValidator,
  onlyLatinLetters,
} from 'utils/validators'

export const accountDataValidate = (inputName: string, inputValue: string) => {
  const errors: Record<string, string | null> = {}

  if (inputName === 'firstName') {
    const validator = composeValidator([requiredField, minMaxLength(1, 30)])
    const error = validator(inputValue)

    errors.firstName = error
  }

  if (inputName === 'lastName') {
    const validator = composeValidator([requiredField, minMaxLength(1, 30)])
    const error = validator(inputValue)

    errors.lastName = error
  }

  if (inputName === 'middleName') {
    const validator = composeValidator([requiredField, minMaxLength(1, 30)])
    const error = validator(inputValue)

    errors.middleName = error
  }

  if (inputName === 'login') {
    const validator = composeValidator([requiredField, onlyLatinLetters])
    const error = validator(inputValue)

    errors.login = error
  }

  if (inputName === 'password') {
    const validator = composeValidator([requiredField, minMaxLength(5, 30)])
    const error = validator(inputValue)

    errors.password = error
  }

  if (inputName === 'phoneNumber') {
    const validator = composeValidator([requiredField, phoneNumber])
    const error = validator(inputValue)

    errors.phoneNumber = error
  }

  return errors
}
