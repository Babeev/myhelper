import { memo, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface ProtectedRouteProps {
  isLoggedIn: boolean
  children?: ReactElement | Array<ReactElement | null>
}

export const ProtectedRoute = memo(
  ({ isLoggedIn, children }: ProtectedRouteProps): ReactElement => {
    if (isLoggedIn) {
      return <>{children}</>
    } else {
      toast.error('Пожалуйста, войдите снова')
    }

    return <Navigate to="/auth/login" replace />
  }
)
