import { Link, NavLink } from 'react-router-dom'

const LandingNavbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-indigo-600 font-semibold'
      : 'text-gray-600 hover:text-indigo-600'

  return (
    <nav className='bg-white border-b'>
      <div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
        {/* LOGO */}
        <Link to='/' className='flex items-center gap-2'>
          <img src='/images/favicon.ico' alt='StaffSync' className='w-8 h-8' />
          <span className='text-xl font-bold'>StaffSync</span>
        </Link>

        {/* LINKS */}
        <div className='flex items-center gap-6 text-sm'>
          <NavLink to='/' className={linkClass}>
            Home
          </NavLink>
          <NavLink to='/about' className={linkClass}>
            About
          </NavLink>
          <NavLink to='/contact' className={linkClass}>
            Contact
          </NavLink>

          <Link
            to='/login'
            className='px-4 py-2 border rounded hover:bg-gray-100'
          >
            Login
          </Link>
          <Link
            to='/signup'
            className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default LandingNavbar
