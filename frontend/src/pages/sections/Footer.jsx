import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10'>
        {/* BRAND */}
        <div>
          <h3 className='text-xl font-bold text-white mb-3'>Infinity</h3>
          <p className='text-sm text-gray-400 leading-relaxed'>
            Infinity is a real-time employee management system built to keep
            teams organized, secure, and productive.
          </p>
        </div>

        {/* PRODUCT */}
        <div>
          <h4 className='text-white font-semibold mb-4'>Product</h4>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link to='/features' className='hover:text-white'>
                Features
              </Link>
            </li>
            <li>
              <Link to='/demo' className='hover:text-white'>
                Demo
              </Link>
            </li>
            <li>
              <Link to='/signup' className='hover:text-white'>
                Get Started
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className='text-white font-semibold mb-4'>Company</h4>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link to='/about' className='hover:text-white'>
                About
              </Link>
            </li>
            <li>
              <Link to='/contact' className='hover:text-white'>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* AUTH */}
        <div>
          <h4 className='text-white font-semibold mb-4'>Account</h4>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link to='/login' className='hover:text-white'>
                Login
              </Link>
            </li>
            <li>
              <Link to='/signup' className='hover:text-white'>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500'>
          <p>© {new Date().getFullYear()} Infinity. All rights reserved.</p>
          <p className='mt-2 md:mt-0'>Built by Anant</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
