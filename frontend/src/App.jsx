import { Routes, Route } from 'react-router-dom'
import AdminRoute from './admin/routes/AdminRoute'
import UserRoute from './user/routes/UserRoute'

// pages
import Home from './pages/Home'

// auth
import Login from './auth/Login'
import Signup from './auth/Signup'
import AuthGate from './auth/AuthGate'

// admin pages
import AdminDashboard from './admin/pages/AdminDashboard'
import Employees from './admin/pages/Employees'

// user pages
import Dashboard from './user/pages/Dashboard'
import Onboarding from './user/pages/Onboarding'

function App () {
  return (
    <Routes>
      {/* Public */}
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* USER ONLY */}
      <Route
        path='/onboarding'
        element={
          <UserRoute>
            {' '}
            {/* ✅ CHANGED */}
            <Onboarding />
          </UserRoute>
        }
      />

      <Route
        path='/dashboard'
        element={
          <UserRoute>
            {' '}
            {/* ✅ CHANGED */}
            <Dashboard />
          </UserRoute>
        }
      />

      {/* ADMIN ONLY */}
      <Route
        path='/admin/dashboard'
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path='/employees'
        element={
          <AdminRoute>
            <Employees />
          </AdminRoute>
        }
      />
    </Routes>
  )
}

export default App
