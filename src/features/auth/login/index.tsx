import { Page } from 'common/page'
import { FlexContainer } from 'common/styled/flexContainer'
import { Header } from 'common/styled/header'
import { FirstStage } from '../firstStage'

export const Login = () => {
  return (
    <Page title="Вход" contentWidth="50%">
      <FirstStage
        linkNavigatePath="/auth/signup"
        linkNavigateText="Нет аккаунта?"
        submitButtonText="Войти"
        onSubmitHandler={() => null}
      />
    </Page>
  )
}
