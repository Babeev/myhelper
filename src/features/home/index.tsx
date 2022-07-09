import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { FlexContainer } from 'common/styled/flexContainer'
import person from 'common/icons/person-circle.svg'
import 'react-toastify/dist/ReactToastify.css'
import { useAppSelector } from 'app/hooks'
import { BACKGROUND_COLOR } from 'common/constants'

const Header = styled.h1`
  font-size: 3rem;
  margin: 1rem auto 1.5rem 2rem;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`
const Img = styled.img`
  margin: auto 2rem auto auto;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`

export const Home = () => {
  const navigate = useNavigate()

  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn)

  const onClickHeaderHandler = () => {
    navigate('/services')
  }

  const onClickAccountHandler = () => {
    navigate('/account')
  }

  return (
    <FlexContainer
      column
      height="100%"
      backgroundColor={BACKGROUND_COLOR}
      overflow="auto"
    >
      <FlexContainer backgroundColor="#fff">
        <Header onClick={onClickHeaderHandler}>MyHelper</Header>

        {isLoggedIn && <Img src={person} onClick={onClickAccountHandler} />}
      </FlexContainer>

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
