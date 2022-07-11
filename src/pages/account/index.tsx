import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from 'common/components/layout'
import { ProtectedRoute } from 'common/components/protectedRoute'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { AccountForm } from './accountForm'

export const Account = () => {
  const navigate = useNavigate()

  const onClickReturnHandler = useCallback(() => {
    navigate('/services')
  }, [navigate])

  return (
    <ProtectedRoute>
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
