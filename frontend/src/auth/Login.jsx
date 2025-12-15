import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import API from '../services/api'
import { isValidEmail } from '../utils/validators'
import { useAuth } from '../context/AuthContext'
import LandingNavbar from '../shared/components/LandingNavbar'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // ✅ ADDED: login type (user | admin)
  const [loginType, setLoginType] = useState('user')

  const validate = () => {
    const err = {}
    if (!isValidEmail(form.email)) err.email = 'Invalid email'
    if (!form.password) err.password = 'Password required'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)

      const res = await API.post('/auth/login', form)
      const { token, user } = res.data

      // ❌ BLOCK WRONG LOGIN SECTION
      // User trying admin login OR admin trying user login
      if (loginType === 'admin' && user.role !== 'admin') {
        setErrors({ api: 'Admin access only' })
        return
      }

      if (loginType === 'user' && user.role !== 'user') {
        setErrors({ api: 'User access only' })
        return
      }

      // ✅ save auth state
      login(token, user)

      // ✅ ADMIN FLOW
      if (user.role === 'admin') {
        navigate('/admin/dashboard')
        return
      }

      // ✅ USER FLOW
      if (!user.isOnboarded) {
        navigate('/onboarding')
        return
      }

      navigate('/dashboard')
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || 'Invalid email or password'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <LandingNavbar />

      <div className='min-h-screen grid md:grid-cols-2'>
        {/* LEFT IMAGE */}
        <div className='hidden md:flex items-center justify-center bg-gray-50'>
          <img src='/images/login.png' alt='Login' className='w-3/4' />
        </div>

        {/* RIGHT FORM */}
        <div className='flex items-center justify-center px-6'>
          <form
            onSubmit={handleSubmit}
            className='w-full max-w-md bg-white p-6 rounded-xl shadow-md'
          >
            <h2 className='text-2xl font-bold mb-4'>Login</h2>

            {/* ✅ LOGIN TYPE TOGGLE */}
            <div className='flex gap-2 mb-6'>
              <button
                type='button'
                onClick={() => setLoginType('user')}
                className={`flex-1 py-2 rounded ${
                  loginType === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                User Login
              </button>

              <button
                type='button'
                onClick={() => setLoginType('admin')}
                className={`flex-1 py-2 rounded ${
                  loginType === 'admin'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                Admin Login
              </button>
            </div>

            {errors.api && (
              <p className='text-red-500 text-sm mb-4'>{errors.api}</p>
            )}

            {/* EMAIL */}
            <input
              className='w-full p-3 border rounded mb-1'
              placeholder='Email'
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <p className='text-red-500 text-xs mb-3'>{errors.email}</p>
            )}

            {/* PASSWORD */}
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='w-full p-3 border rounded mb-1 pr-10'
                placeholder='Password'
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-3 text-gray-500'
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              disabled={loading}
              className='w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-60'
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {loginType === 'user' && (
              <p className='text-sm mt-4 text-center'>
                Don’t have an account?{' '}
                <Link to='/signup' className='text-indigo-600 font-medium'>
                  Sign up
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
