import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { usePutUserUpdateMutation } from 'redux/api/user'
import { clearAccount } from 'redux/slices/accountSlice'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { Avatar } from 'common/components/avatar'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { COLORS } from 'utils/constants'
import { accountDataValidate } from 'utils/validators/accountDataValidate'

export const AccountForm = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const firstName = useAppSelector((state) => state.account.firstName)
  const lastName = useAppSelector((state) => state.account.lastName)
  const middleName = useAppSelector((state) => state.account.middleName)
  const login = useAppSelector((state) => state.account.login)
  const phoneNumber = useAppSelector((state) => state.account.phoneNumber)
  const userId = useAppSelector((state) => state.account.userId)

  const [putUserUpdate] = usePutUserUpdateMutation()

  const initialValues = useMemo(
    () => ({
      firstName,
      lastName,
      middleName,
      login,
      phoneNumber,
      password: null,
    }),
    [firstName, lastName, middleName, login, phoneNumber]
  )

  const onExitHandler = () => {
    navigate('/auth/login')

    dispatch(clearAccount())
  }

  const onSaveHandler = (values: typeof initialValues) => {
    const promise = putUserUpdate({ ...values, id: userId }).unwrap()

    toast.promise(promise, {
      pending: 'Сохранение...',
      success: 'Сохранено',
      error: 'Произошла ошибка',
    })

    promise.catch((e) => console.log(e))
  }

  return (
    <Form
      initialValues={initialValues}
      validate={accountDataValidate}
      onSubmit={onSaveHandler}
    >
      {({ values, errors, isFormValid }) => (
        <StyledFlexContainer column>
          <StyledFlexContainer justifyContent="center" padding="1rem">
            <Avatar isEditable width="100px" height="100px" />
          </StyledFlexContainer>

          <StyledFlexContainer column gap="1rem">
            <Input
              required
              label="Имя"
              name="firstName"
              value={values.firstName}
              error={errors.firstName}
              cypressName="firstName"
            />

            <Input
              required
              label="Фамилия"
              name="lastName"
              value={values.lastName}
              error={errors.lastName}
              cypressName="lastName"
            />

            <Input
              required
              label="Отчество"
              name="middleName"
              value={values.middleName}
              error={errors.middleName}
              cypressName="middleName"
            />

            <Input
              required
              label="Логин"
              name="login"
              value={values.login}
              error={errors.login}
              cypressName="login"
            />

            <Input
              label="Новый пароль"
              name="password"
              type="password"
              value={values.password}
              error={errors.password}
              cypressName="password"
            />

            <Input
              required
              label="Номер телефона"
              name="phoneNumber"
              value={values.phoneNumber}
              error={errors.phoneNumber}
              cypressName="number"
            />

            <StyledFlexContainer justifyContent="space-between">
              <StyledButton
                type="button"
                color={COLORS.DANGER}
                padding="0.5rem 1rem"
                onClick={onExitHandler}
              >
                Выйти
              </StyledButton>

              <StyledButton
                type="submit"
                color={isFormValid ? COLORS.PRIMARY : COLORS.GRAY}
                padding="0.5rem 1rem"
                disabled={!isFormValid}
              >
                Сохранить
              </StyledButton>
            </StyledFlexContainer>
          </StyledFlexContainer>
        </StyledFlexContainer>
      )}
    </Form>
  )
}
