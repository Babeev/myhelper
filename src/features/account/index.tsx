import { Page } from 'common/page'
import { ProtectedRoute } from 'features/protectedRoute'
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
      <Page
        isReturnPath={true}
        onReturnHandler={onClickReturnHandler}
        title="Профиль"
        contentWidth="50%"
      >
        <AccountForm />
      </Page>
    </ProtectedRoute>
  )
}
