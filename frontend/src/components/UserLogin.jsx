import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const UserRoute = ({ children }) => {
  const { isAuthenticated, isUser, isOnboarded } = useAuth()

  // ❌ Not logged in
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  // ❌ Admin trying to access user routes
  if (!isUser) {
    return <Navigate to='/admin/dashboard' replace />
  }

  // ❌ User not onboarded but trying to access dashboard
  if (!isOnboarded && window.location.pathname !== '/onboarding') {
    return <Navigate to='/onboarding' replace />
  }

  // ❌ User already onboarded trying to go back to onboarding
  if (isOnboarded && window.location.pathname === '/onboarding') {
    return <Navigate to='/dashboard' replace />
  }

  return children
}

export default UserRoute
