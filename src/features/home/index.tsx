import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { FlexContainer } from 'common/styled/flexContainer'

const Header = styled.h1`
  font-size: 3rem;
  margin: 2rem auto;
`

export const Home = () => {
  return (
    <FlexContainer column height="100%">
      <Header>myhelper</Header>

      <Outlet />
    </FlexContainer>
  )
}
