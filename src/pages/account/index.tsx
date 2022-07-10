import { Layout } from 'common/components/layout'
import { ProtectedRoute } from 'common/components/protectedRoute'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountForm } from './accountForm'

interface AccountProps {
  isLoggedIn: boolean
}

export const Account = ({ isLoggedIn }: AccountProps) => {
  const navigate = useNavigate()

  const onClickReturnHandler = useCallback(() => {
    navigate('/services')
  }, [navigate])

  return (
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <Layout
        isReturnPath={true}
        onReturnHandler={onClickReturnHandler}
        title="Профиль"
        contentWidth="50%"
      >
        <AccountForm />
      </Layout>
    </ProtectedRoute>
  )
}
