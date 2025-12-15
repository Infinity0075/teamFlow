import { useState } from 'react'

const EditEmployeeForm = ({ employee, onSave }) => {
  const [form, setForm] = useState({
    name: employee.name || '',
    email: employee.email || '',

    // ✅ SUPPORT OLD + NEW FIELD
    // if role exists → use it
    // else fallback to designation
    role: employee.role || employee.designation || '',

    department: employee.department || '',
    skills: employee.skills?.join(', ') || '',

    // ✅ ADDED: backend-compatible status
    status: employee.status || 'pending'
  })

  const handleSubmit = e => {
    e.preventDefault()

    // ✅ VALIDATION (unchanged intent)
    if (!form.name || !form.email || !form.role || !form.department) {
      alert('All fields are required')
      return
    }

    // ✅ CLEAN, BACKEND-COMPATIBLE PAYLOAD
    onSave({
      name: form.name,
      email: form.email,

      // ✅ ALWAYS SEND role (backend expects this)
      role: form.role,

      department: form.department,
      skills: form.skills ? form.skills.split(',').map(s => s.trim()) : [],

      // ✅ NEW: allow admin to update status
      status: form.status
    })
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h3 className='text-xl font-bold mb-2'>Edit Employee</h3>

      <input
        className='w-full p-3 border rounded'
        placeholder='Name'
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        className='w-full p-3 border rounded'
        placeholder='Email'
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      {/* 🔁 DESIGNATION → ROLE (BACKWARD SAFE) */}
      <input
        className='w-full p-3 border rounded'
        placeholder='Role / Designation'
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
      />

      <input
        className='w-full p-3 border rounded'
        placeholder='Department'
        value={form.department}
        onChange={e => setForm({ ...form, department: e.target.value })}
      />

      <input
        className='w-full p-3 border rounded'
        placeholder='Skills (React, Node, Mongo)'
        value={form.skills}
        onChange={e => setForm({ ...form, skills: e.target.value })}
      />

      {/* ✅ ADMIN STATUS CONTROL (NEW, SAFE ADDITION) */}
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
        type='submit'
        className='w-full bg-indigo-600 text-white py-3 rounded'
      >
        Save Changes
      </button>
    </form>
  )
}

export default EditEmployeeForm
