import { Navigate } from 'react-router-dom'
import { useUserAuth } from '@/Context/authContext'

export const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth()
  console.log('protected route', user)

  /* if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />
  } */
  if (user === null) {
    // user is authenticated
    return <Navigate to="/login" />
  }
  return children
  /* return children */
}

export default ProtectedRoute
