import { useState } from 'react'
import { Link } from 'react-router-dom'

import dashboard from '../images/dashboard.jpg'
import onboarding from '../images/Onboarding.jpg'
import management from '../images/management.jpg'

const demos = [
  {
    title: 'Admin Dashboard',
    desc: 'Admins get full control over users, roles, and employee status in one place.',
    img: dashboard
  },
  {
    title: 'Employee Onboarding',
    desc: 'Employees onboard themselves with guided steps and role-based access.',
    img: onboarding
  },
  {
    title: 'Real-time Management',
    desc: 'Track active, inactive, and role-based employees instantly.',
    img: management
  }
]

const DemoPreview = () => {
  /* =======================
     DEMO STATE (FIXED)
  ======================== */
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
    <>
      {/* =======================
          FEATURED DEMOS
      ======================== */}
      <section className='py-24 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6 space-y-28'>
          {demos.map((item, index) => (
            <div
              key={item.title}
              className={`grid md:grid-cols-2 gap-12 items-center`}
            >
              {/* TEXT */}
              <div className={index % 2 !== 0 ? 'md:order-2' : ''}>
                <h3 className='text-3xl font-bold text-gray-900'>
                  {item.title}
                </h3>
                <p className='mt-4 text-gray-600 text-lg'>{item.desc}</p>
              </div>

              {/* IMAGE */}
              <div
                className={`rounded-2xl overflow-hidden shadow-lg bg-white ${
                  index % 2 !== 0 ? 'md:order-1' : ''
                }`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default DemoPreview
