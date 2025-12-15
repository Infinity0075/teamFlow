import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../services/api'
import AppNavbar from '../components/AppNavbar'
import { useAuth } from '../../context/AuthContext'

const Onboarding = () => {
  const navigate = useNavigate()
  const { login, user } = useAuth()

  const [form, setForm] = useState({
    department: '',
    designation: '',
    skills: ''
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    if (!form.department || !form.designation) {
      alert('Please fill all required fields')
      return
    }

    try {
      setLoading(true)

      const res = await API.post('/users/onboarding', {
        department: form.department,
        designation: form.designation,
        skills: form.skills ? form.skills.split(',').map(s => s.trim()) : []
      })

      // ✅ update auth user after onboarding
      login(localStorage.getItem('token'), res.data.user)

      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || 'Onboarding failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AppNavbar />

      <div className='min-h-screen flex items-center justify-center px-6'>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-lg bg-white p-6 rounded-lg shadow-sm'
        >
          <h2 className='text-2xl font-bold mb-2'>Welcome, {user?.name} 👋</h2>

          <p className='text-gray-500 mb-6'>
            Complete your profile to continue
          </p>

          <input
            className='w-full p-3 border rounded mb-3'
            placeholder='Department *'
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
          />

          <input
            className='w-full p-3 border rounded mb-3'
            placeholder='Designation *'
            value={form.designation}
            onChange={e => setForm({ ...form, designation: e.target.value })}
          />

          <input
            className='w-full p-3 border rounded mb-6'
            placeholder='Skills (React, Node, Mongo)'
            value={form.skills}
            onChange={e => setForm({ ...form, skills: e.target.value })}
          />

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 disabled:opacity-60'
          >
            {loading ? 'Saving...' : 'Complete Onboarding'}
          </button>

          <p className='text-xs text-gray-400 mt-4'>* Required fields</p>
        </form>
      </div>
    </>
  )
}

export default Onboarding
