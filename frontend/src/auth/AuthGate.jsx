// import { Navigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

// const AuthGate = ({ children }) => {
//   const { isAuthenticated, user } = useAuth()
//   const location = useLocation()

//   if (!isAuthenticated) {
//     return <Navigate to='/login' replace />
//   }

//   // Force onboarding
//   if (!user?.isOnboarded && location.pathname !== '/onboarding') {
//     return <Navigate to='/onboarding' replace />
//   }

//   // Prevent onboarded user from going back
//   if (user?.isOnboarded && location.pathname === '/onboarding') {
//     return <Navigate to='/dashboard' replace />
//   }

//   return children
// }

// export default AuthGate

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AuthGate = ({ children }) => {
  const { isAuthenticated } = useAuth()

  // ✅ ONLY responsibility of AuthGate:
  // check whether user is logged in or not
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  // ❌ REMOVED onboarding logic from here
  // Reason:
  // - onboarding is USER-specific
  // - admin should NEVER be evaluated for onboarding
  // - this logic will move to UserRoute

  return children
}

export default AuthGate
