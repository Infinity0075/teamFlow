import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const AdminNavbar = ({ children }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-indigo-600 font-semibold'
      : 'text-gray-600 hover:text-indigo-600'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {/* TOP NAVBAR */}
      <header className='bg-white border-b sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <button className='md:hidden' onClick={() => setOpen(true)}>
              <Menu />
            </button>
            <span className='text-lg font-bold'>Infinity Admin</span>
          </div>

          <button
            onClick={handleLogout}
            className='text-sm text-red-600 hover:underline'
          >
            Logout
          </button>
        </div>
      </header>

      {/* LAYOUT */}
      <div className='flex min-h-[calc(100vh-64px)]'>
        {/* SIDEBAR */}
        <aside
          className={`fixed md:static z-40 bg-white border-r w-64 p-6 transition-transform
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          <div className='flex justify-between items-center mb-6 md:hidden'>
            <span className='font-bold'>Menu</span>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <nav className='flex flex-col gap-4 text-sm'>
            <NavLink to='/admin/dashboard' className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to='/employees' className={linkClass}>
              Employees
            </NavLink>
            <NavLink to='/' className='text-gray-600 hover:text-indigo-600'>
              Home
            </NavLink>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className='flex-1 p-6 bg-gray-50'>{children}</main>
      </div>
    </>
  )
}

export default AdminNavbar
