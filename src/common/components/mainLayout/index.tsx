import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppSelector } from 'redux/hooks'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledHeader } from 'common/styled/styledHeader'
import { StyledImg } from 'common/styled/styledImg'
import { COLORS } from 'utils/constants'
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
      backgroundColor={COLORS.BACKGROUND}
      overflow="auto"
    >
      <StyledFlexContainer
        backgroundColor="#fff"
        justifyContent="space-between"
        padding="2rem"
      >
        <StyledHeader
          fontSize="3rem"
          opacity="0.7"
          cursor="pointer"
          onClick={onClickHeaderHandler}
        >
          MyHelper
        </StyledHeader>

        {isLoggedIn && (
          <StyledFlexContainer alignItems="center">
            <StyledImg
              width="40px"
              height="40px"
              cursor="pointer"
              hoverOpacity="0.7"
              src={person}
              onClick={onClickAccountHandler}
            />
          </StyledFlexContainer>
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
