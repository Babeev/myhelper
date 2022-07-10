import { Layout } from 'common/components/layout'
import { SignupFirstStage } from '../signup/signupStages/signupFirstStage'

export const Login = () => {
  return (
    <Layout title="Вход" contentWidth="50%">
      <SignupFirstStage
        linkNavigatePath="/auth/signup"
        linkNavigateText="Нет аккаунта?"
        submitButtonText="Войти"
        onSubmitHandler={() => null}
      />
    </Layout>
  )
}
