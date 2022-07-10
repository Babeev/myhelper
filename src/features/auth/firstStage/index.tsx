import { useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRIMARY_COLOR, GRAY_COLOR } from 'common/constants'
import { CustomForm } from 'common/customForm'
import { Button } from 'common/styled/button'
import { P } from 'common/styled/paragraph'
import { useInputFirstName } from 'common/hooks/useInputFirstName'
import { useInputLastName } from 'common/hooks/useInputLastName'
import { useInputMiddleName } from 'common/hooks/useInputMiddleName'
import { CustomInput } from 'common/customInput'

interface FirstStageProps {
  linkNavigatePath: string
  linkNavigateText: string
  submitButtonText: string
  onSubmitHandler: () => void
}

export const FirstStage = memo(
  ({
    linkNavigatePath,
    linkNavigateText,
    submitButtonText,
    onSubmitHandler,
  }: FirstStageProps) => {
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

    const onRouteToSignup = () => {
      navigate(linkNavigatePath)
    }

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
      },
      [
        onValidateFirstNameHandler,
        onValidateSecondNameHandler,
        onValidateMiddleNameHandler,
      ]
    )

    const areAllValuesValid = [
      isFirstNameErrorExist,
      isLastNameErrorExist,
      isMiddleNameErrorExist,
    ].every((value) => !value)

    const isAllValuesExist = [
      isFirstNameValueExist,
      isLastNameValueExist,
      isMiddleNameValueExist,
    ].every((value) => value)

    const isFormValid = isAllValuesExist && areAllValuesValid

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
          cypressName="middleName"
        />

        <P
          color={PRIMARY_COLOR}
          onClick={onRouteToSignup}
          cursor="pointer"
          margin="0.5rem auto 0 0.75rem"
          data-cy="toSignupRoute"
        >
          {linkNavigateText}
        </P>

        <Button
          type="button"
          color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
          margin="1rem auto"
          padding="0.5rem"
          disabled={!isFormValid}
          onClick={onSubmitHandler}
          data-cy="nextStageButton"
        >
          {submitButtonText}
        </Button>
      </CustomForm>
    )
  }
)
