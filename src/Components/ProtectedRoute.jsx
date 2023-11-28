import { Navigate } from 'react-router-dom'
import { useUserAuth } from '@/Context/authContext'

export const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth()

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
