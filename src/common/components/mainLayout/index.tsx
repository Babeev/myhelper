import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppSelector } from 'redux/hooks'
import { Avatar } from 'common/components/avatar'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledHeader } from 'common/styled/styledHeader'
import { COLORS } from 'utils/constants'
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
          myhelper
        </StyledHeader>

        {isLoggedIn && (
          <StyledFlexContainer
            alignItems="center"
            borderRadius="50%"
            cursor="pointer"
            onClick={onClickAccountHandler}
          >
            <Avatar isEditable={false} width="50px" height="50px" />
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
