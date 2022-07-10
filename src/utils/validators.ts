export const requiredField = (value: string | number): string | null => {
  if (value?.toString().length) {
    return null
  }
  return 'Поле, обязательное для заполнения'
}

export const maxLength =
  (maxLengthValue: number) =>
  <T>(value: T): string | null => {
    if (value && String(value).length > maxLengthValue) {
      return `Максимум символов - ${maxLengthValue}`
    }

    return null
  }

export const onlyNumbers = <T>(value: T): string | null =>
  value && isNaN(Number(value)) ? 'Используйте только цифры' : null

export const phoneNumber = (value: string): string | null => {
  if (value) {
    const testBeginning = /^((\+7)|8){1}/gm.test(value)

    if (!testBeginning) {
      return 'Номер должен начинаться с 8 или с +7'
    }

    const testBrace = /\(|\)/gm.test(value)

    if (testBrace) {
      return 'В номере не должно быть скобок'
    }

    const testWhiteSpace = /\s/gm.test(value)

    if (testWhiteSpace) {
      return 'В номере не должно быть пробелов'
    }

    const testAmountOfNumber = /[0-9]{11}$/gm.test(value)

    if (!testAmountOfNumber) {
      return 'В номере должно быть 11 цифр'
    }

    const testOverMuchOfNumber = /[0-9]{12,}/gm.test(value)

    if (testOverMuchOfNumber) {
      return 'В номере не должно быть больше 11 цифр'
    }
  }

  return null
}
