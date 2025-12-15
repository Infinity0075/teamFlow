import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../services/api'
import { isValidEmail, isValidPassword } from '../utils/validators'
import LandingNavbar from '../shared/components/LandingNavbar'
import { Eye, EyeOff } from 'lucide-react'

const Signup = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' // ✅ ADDED: default role = user
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validate = () => {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!isValidEmail(form.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!isValidPassword(form.password)) {
      newErrors.password =
        'Password must be at least 8 characters and contain a number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)

      // ✅ role is now sent to backend explicitly
      await API.post('/auth/register', form)

      navigate('/login')
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || 'Signup failed'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <LandingNavbar />

      <div className='min-h-screen grid md:grid-cols-2'>
        {/* IMAGE */}
        <div className='hidden md:flex items-center justify-center bg-gray-50'>
          <img src='/images/auth.jpg' alt='Auth' className='w-3/4' />
        </div>

        {/* FORM */}
        <div className='flex items-center justify-center px-6'>
          <form
            onSubmit={handleSubmit}
            className='w-full max-w-md bg-white p-6 rounded-lg shadow-sm'
          >
            <h2 className='text-2xl font-bold mb-4'>Create Account</h2>

            {errors.api && (
              <p className='text-red-500 text-sm mb-3'>{errors.api}</p>
            )}

            {/* NAME */}
            <input
              className='w-full p-3 border rounded mb-1'
              placeholder='Full Name'
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            {/* EMAIL */}
            <input
              className='w-full p-3 border rounded mb-1'
              placeholder='Email'
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            {/* ROLE SELECTION */}
            {/* ✅ ADDED: explicit role selection */}
            <select
              className='w-full p-3 border rounded mb-3'
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>

            {/* PASSWORD */}
            <div className='relative mb-1'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='w-full p-3 border rounded pr-10'
                placeholder='Password'
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              disabled={loading}
              className='w-full bg-indigo-600 text-white py-3 rounded'
            >
              {loading ? 'Creating...' : 'Sign Up'}
            </button>

            <p className='text-sm mt-4'>
              Already have an account?{' '}
              <Link to='/login' className='text-indigo-600'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
