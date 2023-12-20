import { Navigate } from 'react-router-dom'
import { useUserAuth } from '@/Context/authContext'

const ProtectedRouteLog = ({ children }) => {
  const { user } = useUserAuth()
  if (user) {
    // user is authenticated
    return <Navigate to="/" />
  }

  // user is not authenticated
  return children
}
export default ProtectedRouteLog
