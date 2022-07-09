import { useAppDispatch, useAppSelector } from 'app/hooks'
import { FlexContainer } from 'common/styled/flexContainer'
import { setLoggedIn } from 'features/account/accountSlice'
import { ReturnButton } from 'features/returnButton'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSignupMutation } from '../authEndpoints'
import { FirstStage } from '../firstStage'
import { SecondStage } from '../secondStage'
import { ThirdStage } from '../thirdStage'

export const Signup = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [stage, setStage] = useState(1)

  const firstName = useAppSelector((state) => state.account.fistName)
  const lastName = useAppSelector((state) => state.account.lastName)
  const middleName = useAppSelector((state) => state.account.middleName)

  const [signup, { isLoading }] = useSignupMutation()

  const onClickReturnHandler = useCallback(() => {
    if (stage === 1) {
      navigate('/auth/login')
    } else {
      setStage((prev) => prev - 1)
    }
  }, [navigate, stage])

  const onSubmitSignupHandler = useCallback(async () => {
    const promise = signup({
      firstName,
      lastName,
      middleName,
    }).unwrap()

    toast.promise(promise, {
      pending: 'Загрузка...',
      success: 'Регистрация прошла успешно',
      error: 'Произошла ошибка',
    })

    promise
      .then(() => {
        dispatch(setLoggedIn(true))
        navigate('/services')
      })
      .catch((e) => {
        console.log(e)
      })
  }, [signup, firstName, lastName, middleName, dispatch, navigate])

  return (
    <FlexContainer width="100%" height="100%" position="relative">
      <ReturnButton onClickHandler={onClickReturnHandler} />

      <FlexContainer margin="auto" width="50%">
        {stage === 1 && (
          <FirstStage
            linkNavigatePath="/auth/login"
            linkNavigateText="Уже есть аккаунт?"
            submitButtonText="Продолжить"
            onSubmitHandler={() => setStage(2)}
          />
        )}

        {stage === 2 && <SecondStage onSubmitHandler={() => setStage(3)} />}

        {stage === 3 && <ThirdStage onSubmitHandler={onSubmitSignupHandler} />}
      </FlexContainer>
    </FlexContainer>
  )
}
