import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGetUserInfoQuery } from 'redux/api/user'
import { MainLayout } from 'common/components/mainLayout'
import { NotFound } from 'pages/404'
import { Account } from 'pages/account'
import { Login } from 'pages/login'
import { Signup } from 'pages/signup'
import { Service } from 'pages/service'
import { Services } from 'pages/services'
import { useAppSelector } from 'redux/hooks'

export const App = () => {
  const userId = useAppSelector((state) => state.account.userId)

  const { isError, error } = useGetUserInfoQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (isError) {
      toast.error('Не удалось получить данные пользователя')

      console.log(error)
    }
  }, [isError, error])

  return (
    <BrowserRouter basename="myhelper">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Services />} />

          <Route path="auth">
            <Route path="login" element={<Login />} />

            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path="services" element={<Services />}>
            <Route path=":serviceId" element={<Service />} />
          </Route>

          <Route path="account" element={<Account />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
