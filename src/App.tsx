import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from 'common/components/mainLayout'
import { NotFound } from 'pages/404'
import { Account } from 'pages/account'
import { Login } from 'pages/login'
import { Signup } from 'pages/signup'
import { Services } from 'pages/services'
import { Service } from 'pages/service'

export const App = () => {
  return (
    <BrowserRouter basename="myhelper">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Services />} />

          <Route path="auth">
            <Route path="login" element={<Login />} />

            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path="services" element={<Services />} />

          <Route path="services/:serviceId" element={<Service />} />

          <Route path="account" element={<Account />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
