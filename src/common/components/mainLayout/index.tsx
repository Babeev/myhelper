import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppSelector } from 'redux/hooks'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledHeader } from 'common/styled/styledHeader'
import { StyledImg } from 'common/styled/styledImg'
import { BACKGROUND_COLOR } from 'utils/constants'
import person from 'assets/icons/person-circle.svg'
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
    <StyledFlexContainer
      column
      height="100%"
      backgroundColor={BACKGROUND_COLOR}
      overflow="auto"
    >
      <StyledFlexContainer backgroundColor="#fff">
        <StyledHeader
          fontSize="3rem"
          margin="1rem auto 1.5rem 2rem"
          opacity="0.7"
          cursor="pointer"
          onClick={onClickHeaderHandler}
        >
          MyHelper
        </StyledHeader>

        {isLoggedIn && (
          <StyledImg
            margin="auto 2rem auto auto"
            width="40px"
            height="40px"
            cursor="pointer"
            hoverOpacity="0.7"
            src={person}
            onClick={onClickAccountHandler}
          />
        )}
      </StyledFlexContainer>

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
    </StyledFlexContainer>
  )
}
