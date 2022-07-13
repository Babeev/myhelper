import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Layout } from 'common/components/layout'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { SignupBody } from 'types'
import { useGetOAuthTokenMutation, useSignupMutation } from 'redux/api/auth'
import { SignupFirstStage } from './signupStages/signupFirstStage'
import { SignupSecondStage } from './signupStages/signupSecondStage'
import { SignupThirdStage } from './signupStages/signupThirdStage'

export const Signup = () => {
  const navigate = useNavigate()

  const [stage, setStage] = useState(1)
  const [accountData, setAccountData] = useState<SignupBody>({
    firstName: null,
    lastName: null,
    middleName: null,
    login: null,
    password: null,
  })

  const [signup] = useSignupMutation()
  const [getOAuthToken] = useGetOAuthTokenMutation()

  const onClickReturnHandler = useCallback(() => {
    if (stage === 1) {
      navigate('/auth/login')
    } else {
      setStage((prev) => prev - 1)
    }
  }, [navigate, stage])

  const onSetAccountDataHandler = useCallback((data: Partial<SignupBody>) => {
    setAccountData((prev) => ({
      ...prev,
      ...data,
    }))

    setStage(2)
  }, [])

  const onSubmitSignupHandler = useCallback(async () => {
    const signupPromise = signup(accountData).unwrap()
    const getTokenPromise = getOAuthToken({
      login: accountData.login || '',
      password: accountData.password || '',
    }).unwrap()

    const allPromises = Promise.all([signupPromise, getTokenPromise])

    toast.promise(allPromises, {
      pending: 'Загрузка...',
      success: 'Регистрация прошла успешно',
      error: 'Произошла ошибка',
    })

    try {
      await signupPromise
      await getTokenPromise

      navigate('/services')
    } catch (e) {
      console.log(e)
    }
  }, [signup, getOAuthToken, accountData, navigate])

  return (
    <Layout
      isReturnPath={true}
      onReturnHandler={onClickReturnHandler}
      title="Регистрация"
    >
      <StyledFlexContainer column width="50%" padding="3rem 0 0 0">
        {stage === 1 ? (
          <SignupFirstStage
            initialValues={accountData}
            onSubmitHandler={onSetAccountDataHandler}
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
