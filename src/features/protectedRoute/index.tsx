import { memo, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  isLoggedIn: boolean
  children?: ReactElement | Array<ReactElement | null>
}

export const ProtectedRoute = memo(
  ({ isLoggedIn, children }: ProtectedRouteProps): ReactElement => {
    if (isLoggedIn) {
      return <>{children}</>
    }

    return <Navigate to="/auth/login" replace />
  }
)
