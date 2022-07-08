export const requiredField = (value: string | number): string | undefined => {
  if (value?.toString().length) {
    return undefined
  }
  return 'Поле, обязательное для заполнения'
}

export const maxLength =
  (maxLengthValue: number) =>
  <T>(value: T): string | undefined => {
    if (value && String(value).length > maxLengthValue) {
      return `Максимальная длина - ${maxLengthValue} символов`
    }

    return undefined
  }

export const onlyNumbers = <T>(value: T): string | undefined =>
  value && isNaN(Number(value)) ? 'Используйте только цифры' : undefined
