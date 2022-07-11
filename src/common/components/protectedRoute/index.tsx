import { memo, ReactElement, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from 'redux/hooks'

interface ProtectedRouteProps {
  children?: ReactElement | Array<ReactElement | null>
}

export const ProtectedRoute = memo(
  ({ children }: ProtectedRouteProps): ReactElement => {
    const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn)

    useEffect(() => {
      if (!isLoggedIn) {
        toast.error('Пожалуйста, войдите снова')
      }
    }, [isLoggedIn])

    if (isLoggedIn) {
      return <>{children}</>
    }

    return <Navigate to="/auth/login" replace />
  }
)
