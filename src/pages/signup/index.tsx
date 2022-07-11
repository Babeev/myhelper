import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { Layout } from 'common/components/layout'
import { setAccount } from 'redux/accountSlice'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSignupMutation } from 'redux/api/auth'
import { SignupFirstStage } from './signupStages/signupFirstStage'
import { SignupSecondStage } from './signupStages/signupSecondStage'
import { SignupThirdStage } from './signupStages/signupThirdStage'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'

export const Signup = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [stage, setStage] = useState(1)

  const firstName = useAppSelector((state) => state.account.fistName)
  const lastName = useAppSelector((state) => state.account.lastName)
  const middleName = useAppSelector((state) => state.account.middleName)

  const [signup] = useSignupMutation()

  const onClickReturnHandler = useCallback(() => {
    if (stage === 1) {
      navigate('/auth/login')
    } else {
      setStage((prev) => prev - 1)
    }
  }, [navigate, stage])

  const onSubmitSignupHandler = useCallback(async () => {
    const promise = signup({
      firstName: firstName || '',
      lastName: lastName || '',
      middleName: middleName || '',
    }).unwrap()

    toast.promise(promise, {
      pending: 'Загрузка...',
      success: 'Регистрация прошла успешно',
      error: 'Произошла ошибка',
    })

    promise
      .then(() => {
        dispatch(setAccount({ input: 'isLoggedIn', value: true }))
        navigate('/services')
      })
      .catch((e) => {
        console.log(e)
      })
  }, [signup, firstName, lastName, middleName, dispatch, navigate])

  return (
    <Layout
      isReturnPath={true}
      onReturnHandler={onClickReturnHandler}
      title="Регистрация"
    >
      <StyledFlexContainer column width="50%" padding="3rem 0 0 0">
        {stage === 1 ? (
          <SignupFirstStage
            linkNavigatePath="/auth/login"
            linkNavigateText="Уже есть аккаунт?"
            submitButtonText="Продолжить"
            onSubmitHandler={() => setStage(2)}
          />
        ) : null}

        {stage === 2 ? (
          <SignupSecondStage onSubmitHandler={() => setStage(3)} />
        ) : null}

        {stage === 3 ? (
          <SignupThirdStage onSubmitHandler={onSubmitSignupHandler} />
        ) : null}
      </StyledFlexContainer>
    </Layout>
  )
}
