import { Navigate } from 'react-router-dom'
/* import { useUserAuth } from '@/Context/AuthContext' */

import { useUserAuth } from '@/Context/authContext'

export const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth()

  if (user === null) {
    // user is authenticated
    return <Navigate to="/login" />
  }
  return children
  /* return children */
}

export default ProtectedRoute
