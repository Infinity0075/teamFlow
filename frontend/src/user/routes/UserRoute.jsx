import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const UserRoute = ({ children }) => {
  const { isAuthenticated, isUser, isOnboarded } = useAuth()
  const location = useLocation()

  // ❌ Not logged in → login
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  // ❌ Admin trying to access user routes
  // Admin has NO business in user flow
  if (!isUser) {
    return <Navigate to='/admin/dashboard' replace />
  }

  // ❌ User NOT onboarded but trying to access dashboard
  if (!isOnboarded && location.pathname !== '/onboarding') {
    return <Navigate to='/onboarding' replace />
  }

  // ❌ User already onboarded trying to revisit onboarding
  if (isOnboarded && location.pathname === '/onboarding') {
    return <Navigate to='/dashboard' replace />
  }

  // ✅ Correct user access
  return children
}

export default UserRoute
