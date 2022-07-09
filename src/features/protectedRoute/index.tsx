import { memo, ReactElement, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface ProtectedRouteProps {
  isLoggedIn: boolean
  children?: ReactElement | Array<ReactElement | null>
}

export const ProtectedRoute = memo(
  ({ isLoggedIn, children }: ProtectedRouteProps): ReactElement => {
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
