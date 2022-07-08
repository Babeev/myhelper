import { FlexContainer } from 'common/styled/flexContainer'
import { FirstStage } from '../firstStage'

export const Login = () => {
  return (
    <FlexContainer margin="auto" width="50%">
      <FirstStage
        linkNavigatePath="/auth/signup"
        linkNavigateText="Нет аккаунта?"
        submitButtonText="Войти"
        onSubmitHandler={() => null}
      />
    </FlexContainer>
  )
}
