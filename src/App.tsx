import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppSelector } from 'app/hooks'
import { NotFound } from './features/404'
import { Account } from './features/account'
import { Login } from './features/auth/login'
import { Signup } from './features/auth/signup'
import { Home } from './features/home'
import { Service } from './features/service'
import { Services } from './features/services'

export const App = () => {
  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn)

  return (
    <BrowserRouter basename="myhelper">
      <Routes>
        <Route path="/" element={<Home />}>
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