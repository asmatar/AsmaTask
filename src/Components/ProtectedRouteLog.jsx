import { Navigate } from 'react-router-dom'
import { useUserAuth } from '@/Context/authContext'

const ProtectedRouteLog = ({ children }) => {
  const { user } = useUserAuth()
  console.log('protected route log', user)
  if (user) {
    // user is authenticated
    return <Navigate to="/" />
  }

  // user is not authenticated
  return children
}
export default ProtectedRouteLog
