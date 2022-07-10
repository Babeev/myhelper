import { useAppDispatch } from 'app/hooks'
import { DANGER_COLOR, GRAY_COLOR, PRIMARY_COLOR } from 'common/constants'
import { CustomForm } from 'common/customForm'
import { CustomInput } from 'common/customInput'
import { useInputFirstName } from 'common/hooks/useInputFirstName'
import { useInputLastName } from 'common/hooks/useInputLastName'
import { useInputLogin } from 'common/hooks/useInputLogin'
import { useInputMiddleName } from 'common/hooks/useInputMiddleName'
import { useInputNumber } from 'common/hooks/useInputNumber'
import { Button } from 'common/styled/button'
import { FlexContainer } from 'common/styled/flexContainer'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { setLoggedIn } from '../accountSlice'

export const AccountForm = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const {
    firstNameValue,
    firstNameError,
    onChangeFirstNameHandler,
    onBlurFirstNameHandler,
    onValidateFirstNameHandler,
    isFirstNameValueExist,
    isFirstNameErrorExist,
  } = useInputFirstName()

  const {
    lastNameValue,
    lastNameError,
    onChangeLastNameHandler,
    onBlurSecondNameHandler,
    onValidateSecondNameHandler,
    isLastNameValueExist,
    isLastNameErrorExist,
  } = useInputLastName()

  const {
    middleNameValue,
    middleNameError,
    onChangeMiddleNameHandler,
    onBlurMiddleNameHandler,
    onValidateMiddleNameHandler,
    isMiddleNameValueExist,
    isMiddleNameErrorExist,
  } = useInputMiddleName()

  const {
    loginValue,
    loginError,
    onChangeLoginHandler,
    onBlurLoginHandler,
    onValidateLoginHandler,
    isLoginValueExist,
    isLoginErrorExist,
  } = useInputLogin()

  const {
    numberValue,
    numberError,
    onChangeNumberHandler,
    onBlurNumberHandler,
    onValidateNumberHandler,
    isNumberValueExist,
    isNumberErrorExist,
  } = useInputNumber()

  const validate = useCallback(
    (inputName: string, inputValue: string) => {
      if (inputName === 'firstName') {
        onValidateFirstNameHandler(inputValue)
      }

      if (inputName === 'lastName') {
        onValidateSecondNameHandler(inputValue)
      }

      if (inputName === 'middleName') {
        onValidateMiddleNameHandler(inputValue)
      }

      if (inputName === 'login') {
        onValidateLoginHandler(inputValue)
      }

      if (inputName === 'number') {
        onValidateNumberHandler(inputValue)
      }
    },
    [
      onValidateFirstNameHandler,
      onValidateSecondNameHandler,
      onValidateMiddleNameHandler,
      onValidateLoginHandler,
      onValidateNumberHandler,
    ]
  )

  const areAllValuesValid = [
    isFirstNameErrorExist,
    isLastNameErrorExist,
    isMiddleNameErrorExist,
    isLoginErrorExist,
    isNumberErrorExist,
  ].every((value) => !value)

  const isAllValuesExist = [
    isFirstNameValueExist,
    isLastNameValueExist,
    isMiddleNameValueExist,
    isLoginValueExist,
    isNumberValueExist,
  ].every((value) => value)

  const isFormValid = isAllValuesExist && areAllValuesValid

  const onExitHandler = () => {
    navigate('/auth/login')
    dispatch(setLoggedIn(false))
  }

  return (
    <CustomForm validate={validate} width="100%">
      <CustomInput
        label="Имя"
        name="firstName"
        value={firstNameValue}
        onChange={onChangeFirstNameHandler}
        onBlur={onBlurFirstNameHandler}
        error={firstNameError}
        margin="0 0 1rem 0"
        cypressName="firstName"
      />

      <CustomInput
        label="Фамилия"
        name="lastName"
        value={lastNameValue}
        error={lastNameError}
        onChange={onChangeLastNameHandler}
        onBlur={onBlurSecondNameHandler}
        margin="0 0 1rem 0"
        cypressName="lastName"
      />

      <CustomInput
        label="Отчество"
        name="middleName"
        value={middleNameValue}
        error={middleNameError}
        onChange={onChangeMiddleNameHandler}
        onBlur={onBlurMiddleNameHandler}
        margin="0 0 1rem 0"
        cypressName="middleName"
      />

      <CustomInput
        label="Логин"
        name="login"
        value={loginValue}
        error={loginError}
        onChange={onChangeLoginHandler}
        onBlur={onBlurLoginHandler}
        margin="0 0 1rem 0"
        cypressName="login"
      />

      <CustomInput
        label="Номер телефона"
        name="number"
        value={numberValue}
        onChange={onChangeNumberHandler}
        onBlur={onBlurNumberHandler}
        error={numberError}
        margin="0 0 1rem 0"
        cypressName="number"
      />

      <FlexContainer>
        <Button
          type="button"
          color={DANGER_COLOR}
          margin="0 auto 0 0"
          padding="0.5rem"
          onClick={onExitHandler}
        >
          Выйти
        </Button>

        <Button
          type="button"
          color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
          margin="0"
          padding="0.5rem"
          disabled={!isFormValid}
        >
          Сохранить
        </Button>
      </FlexContainer>
    </CustomForm>
  )
}
