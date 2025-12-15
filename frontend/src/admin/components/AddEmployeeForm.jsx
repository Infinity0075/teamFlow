import { useState } from 'react'
import API from '../../services/api'

const AddEmployeeForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    skills: '',
    status: 'active' // ✅ CHANGED: use backend-compatible field
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    // ✅ ADMIN VALIDATION
    if (!form.name || !form.email || !form.role || !form.department) {
      setError('All required fields must be filled')
      return
    }

    try {
      setLoading(true)

      await API.post('/employees', {
        name: form.name,
        email: form.email,
        role: form.role,
        department: form.department,
        skills: form.skills ? form.skills.split(',').map(s => s.trim()) : [],
        status: form.status // ✅ FIXED: matches backend schema
      })

      onSuccess()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h3 className='text-xl font-bold'>Add Employee</h3>

      {error && <p className='text-red-500 text-sm'>{error}</p>}

      <input
        className='w-full p-3 border rounded'
        placeholder='Employee Name *'
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        className='w-full p-3 border rounded'
        placeholder='Employee Email *'
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        className='w-full p-3 border rounded'
        placeholder='Role *'
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
      />

      <input
        className='w-full p-3 border rounded'
        placeholder='Department *'
        value={form.department}
        onChange={e => setForm({ ...form, department: e.target.value })}
      />

      <input
        className='w-full p-3 border rounded'
        placeholder='Skills (React, Node)'
        value={form.skills}
        onChange={e => setForm({ ...form, skills: e.target.value })}
      />

      {/* ✅ ADMIN STATUS CONTROL */}
      <label className='flex items-center gap-2 text-sm'>
        <input
          type='checkbox'
          checked={form.status === 'active'}
          onChange={e =>
            setForm({
              ...form,
              status: e.target.checked ? 'active' : 'pending'
            })
          }
        />
        Active Employee
      </label>

      <button
        disabled={loading}
        className='w-full bg-indigo-600 text-white py-3 rounded'
      >
        {loading ? 'Saving...' : 'Add Employee'}
      </button>
    </form>
  )
}

export default AddEmployeeForm
