import { ProtectedRoute } from 'features/protectedRoute'

interface AccountProps {
  isLoggedIn: boolean
}

export const Account = ({ isLoggedIn }: AccountProps) => {
  return <ProtectedRoute isLoggedIn={isLoggedIn}></ProtectedRoute>
}
