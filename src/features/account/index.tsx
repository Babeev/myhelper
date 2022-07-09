import { CustomForm } from 'common/customForm'
import { CustomInput } from 'common/customInput'
import { FlexContainer } from 'common/styled/flexContainer'
import { P } from 'common/styled/paragraph'
import { ProtectedRoute } from 'features/protectedRoute'
import { ReturnButton } from 'features/returnButton'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface AccountProps {
  isLoggedIn: boolean
}

const Header = styled.h1`
  font-size: 2rem;
  margin: 0 auto 0 0;
`

export const Account = ({ isLoggedIn }: AccountProps) => {
  const navigate = useNavigate()

  const onClickReturnHandler = useCallback(() => {
    navigate('/services')
  }, [navigate])

  return (
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <FlexContainer width="100%" height="100%" position="relative">
        <ReturnButton onClickHandler={onClickReturnHandler} />

        <FlexContainer width="100%" column margin="0" padding="3rem">
          <FlexContainer margin="0 0 2rem 0">
            <Header>Профиль</Header>
          </FlexContainer>

          <FlexContainer>
            <CustomForm validate={() => null}>
              <P>GJHGKJHGK</P>
            </CustomForm>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </ProtectedRoute>
  )
}
