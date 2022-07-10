import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { FlexContainer } from 'common/styled/flexContainer'
import { useAppSelector } from 'redux/hooks'
import { BACKGROUND_COLOR } from 'common/constants'
import { Header } from 'common/styled/header'
import { Img } from 'common/styled/img'
import person from 'common/assets/icons/person-circle.svg'
import 'react-toastify/dist/ReactToastify.css'

export const MainLayout = () => {
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
        <Header
          fontSize="3rem"
          margin="1rem auto 1.5rem 2rem"
          opacity="0.7"
          cursor="pointer"
          onClick={onClickHeaderHandler}
        >
          MyHelper
        </Header>

        {isLoggedIn && (
          <Img
            margin="auto 2rem auto auto"
            width="40px"
            height="40px"
            cursor="pointer"
            hoverOpacity="0.7"
            src={person}
            onClick={onClickAccountHandler}
          />
        )}
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
