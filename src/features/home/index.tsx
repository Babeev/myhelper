import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { FlexContainer } from 'common/styled/flexContainer'
import 'react-toastify/dist/ReactToastify.css'

const Header = styled.h1`
  font-size: 3rem;
  margin: 1rem auto;
`

export const Home = () => {
  return (
    <FlexContainer column height="100%">
      <Header>myhelper</Header>

      <Outlet />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </FlexContainer>
  )
}
