import { useState } from 'react'
import { Link } from 'react-router-dom'

const TryOnboarding = () => {
  // =======================
  // DEMO STATE (LOCAL ONLY)
  // =======================
  const [form, setForm] = useState({
    name: '',
    role: '',
    department: '',
    skills: ''
  })

  const [employee, setEmployee] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()

    setEmployee({
      ...form,
      status: 'Pending'
    })
  }

  return (
    <section id='try' className='py-24 px-8 bg-white'>
      {/* HEADING */}
      <h2 className='text-4xl font-bold text-center mb-4'>
        Try Employee Onboarding
      </h2>

      <p className='text-center text-gray-600 mb-14'>
        Experience how easy it is to onboard employees with Infinity.
      </p>

      <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12'>
        {/* =======================
            FORM
        ======================== */}
        <div className='bg-gray-50 p-8 rounded-2xl shadow-sm'>
          <h3 className='text-xl font-semibold mb-6'>Add Employee (Demo)</h3>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              className='w-full p-3 border rounded-lg'
              placeholder='Full Name'
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <input
              className='w-full p-3 border rounded-lg'
              placeholder='Role'
              onChange={e => setForm({ ...form, role: e.target.value })}
            />

            <input
              className='w-full p-3 border rounded-lg'
              placeholder='Department'
              onChange={e => setForm({ ...form, department: e.target.value })}
            />

            <input
              className='w-full p-3 border rounded-lg'
              placeholder='Skills (React, Node)'
              onChange={e => setForm({ ...form, skills: e.target.value })}
            />

            <button
              type='submit'
              className='w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition'
            >
              Add Employee
            </button>
          </form>
        </div>

        {/* =======================
            LIVE PREVIEW
        ======================== */}
        <div className='bg-gray-50 p-8 rounded-2xl shadow-sm'>
          <h3 className='text-xl font-semibold mb-6'>Live Preview</h3>

          {!employee ? (
            <p className='text-gray-500'>Fill the form to see live preview</p>
          ) : (
            <div className='border rounded-xl p-5 bg-white'>
              <h4 className='font-bold text-lg'>{employee.name}</h4>

              <p className='text-sm text-gray-600'>
                {employee.role} • {employee.department}
              </p>

              <span className='inline-block mt-3 px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full'>
                {employee.status}
              </span>

              <p className='mt-4 text-sm text-gray-500'>
                Sign up to save and manage employees
              </p>

              <Link
                to='/signup'
                className='inline-block mt-4 text-indigo-600 font-medium'
              >
                Sign up →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TryOnboarding
