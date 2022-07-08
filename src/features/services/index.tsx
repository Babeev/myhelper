import { ProtectedRoute } from 'features/protectedRoute'

interface ServicesProps {
  isLoggedIn: boolean
}

export const Services = ({ isLoggedIn }: ServicesProps) => {
  return <ProtectedRoute isLoggedIn={isLoggedIn}></ProtectedRoute>
}
