import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch {
      return null
    }
  })

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  // ✅ ADDED: derived helpers for role-based routing
  // Reason: guards & routing should NOT repeat this logic everywhere
  const isAdmin = user?.role === 'admin'
  const isUser = user?.role === 'user'

  // ✅ ADDED: onboarding state shortcut
  // Reason: onboarding flow must be enforced only for users
  const isOnboarded = user?.isOnboarded === true

  const isAuthenticated = Boolean(token)

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isAdmin, // ✅ NEW
        isUser, // ✅ NEW
        isOnboarded, // ✅ NEW
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
