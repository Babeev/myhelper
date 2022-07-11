import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { NotFound } from 'pages/404'
import { Account } from 'pages/account'
import { Login } from 'pages/login'
import { Signup } from 'pages/signup'
import { MainLayout } from 'common/components/mainLayout'
import { Service } from 'pages/service'
import { Services } from 'pages/services'

export const App = () => {
  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn)

  return (
    <BrowserRouter basename="myhelper">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Services isLoggedIn={false} />} />

          <Route path="auth">
            <Route path="login" element={<Login />} />

            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path="services" element={<Services isLoggedIn={isLoggedIn} />}>
            <Route path=":serviceId" element={<Service />} />
          </Route>

          <Route path="account" element={<Account isLoggedIn={isLoggedIn} />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
