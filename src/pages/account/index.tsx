import { Layout } from 'common/components/layout'
import { ProtectedRoute } from 'common/components/protectedRoute'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
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
      >
        <StyledFlexContainer column width="50%" padding="2rem 0 0 0">
          <AccountForm />
        </StyledFlexContainer>
      </Layout>
    </ProtectedRoute>
  )
}
