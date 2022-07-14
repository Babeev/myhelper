import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGetOAuthTokenMutation, useSignupMutation } from 'redux/api/auth'
import { Layout } from 'common/components/layout'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { Form } from 'common/components/form'
import { SignupFirstStage } from './signupStages/signupFirstStage'
import { SignupSecondStage } from './signupStages/signupSecondStage'
import { SignupThirdStage } from './signupStages/signupThirdStage'
import { accountDataValidate } from 'utils/validators/accountDataValidate'

export const Signup = () => {
  const navigate = useNavigate()

  const [stage, setStage] = useState(1)

  const [signup] = useSignupMutation()
  const [getOAuthToken] = useGetOAuthTokenMutation()

  const initialValues = useMemo(
    () => ({
      firstName: null,
      lastName: null,
      middleName: null,
      login: null,
      password: null,
      phoneNumber: null,
      code: null,
    }),
    []
  )

  const onClickReturnHandler = useCallback(() => {
    if (stage === 1) {
      navigate('/auth/login')
    } else {
      setStage((prev) => prev - 1)
    }
  }, [navigate, stage])

  const onNextStageHandler = useCallback((isValid: boolean, stage: number) => {
    if (isValid) {
      setStage(stage)
    } else {
      toast.error('Не все поля заполнены верно. Пожалуйста, проверьте еще раз')
    }
  }, [])

  const onSubmitSignupHandler = useCallback(
    async (values: typeof initialValues) => {
      const { code, ...body } = values
      const waiting = toast.loading('Загрузка...')

      try {
        await signup(body).unwrap()
        await getOAuthToken({
          login: values.login || '',
          password: values.password || '',
        }).unwrap()

        toast.update(waiting, {
          render: 'Регистрация прошла успешно',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
        navigate('/services')
      } catch (e) {
        toast.update(waiting, {
          render: 'Произошла ошибка',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        })
        console.log(e)
      }
    },
    [signup, getOAuthToken, navigate]
  )

  return (
    <Layout
      isReturnPath={true}
      onReturnHandler={onClickReturnHandler}
      title="Регистрация"
    >
      <StyledFlexContainer column width="50%" padding="3rem 0 0 0">
        <Form
          initialValues={initialValues}
          validate={accountDataValidate}
          onSubmit={onSubmitSignupHandler}
        >
          {({ values, errors }) => (
            <>
              {stage === 1 ? (
                <SignupFirstStage
                  values={values}
                  errors={errors}
                  onSubmitHandler={onNextStageHandler}
                />
              ) : null}

              {stage === 2 ? (
                <SignupSecondStage
                  value={values.phoneNumber}
                  error={errors.phoneNumber}
                  onSubmitHandler={onNextStageHandler}
                />
              ) : null}

              {stage === 3 ? <SignupThirdStage /> : null}
            </>
          )}
        </Form>
      </StyledFlexContainer>
    </Layout>
  )
}
