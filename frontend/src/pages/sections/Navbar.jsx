import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const sections = ['home', 'features', 'how', 'demo', 'try', 'cta']

const Navbar = () => {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  /* ---------------- Scroll shadow ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ---------------- Active section observer ---------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
      }
    )

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  /* ---------------- Smooth scroll ---------------- */
  const handleNavClick = id => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  const linkClass = id =>
    `relative pb-1 ${
      active === id
        ? 'text-indigo-600 font-semibold'
        : 'text-gray-600 hover:text-gray-900'
    }`

  const underline = id => (active === id ? 'after:w-full' : 'after:w-0')

  return (
    <nav
      className={`sticky top-0 z-50 bg-white border-b transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
        {/* LOGO */}
        <button
          onClick={() => handleNavClick('home')}
          className='text-xl font-bold text-gray-900'
        >
          ∞ Infinity
        </button>

        {/* DESKTOP LINKS */}
        <div className='hidden md:flex items-center gap-8'>
          {sections.slice(0, 5).map(id => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`${linkClass(
                id
              )} after:block after:h-[2px] after:bg-indigo-600 after:transition-all ${underline(
                id
              )}`}
              aria-current={active === id ? 'page' : undefined}
            >
              {id === 'how'
                ? 'How it works'
                : id[0].toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className='hidden md:flex items-center gap-3'>
          <Link
            to='/login'
            className='px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100'
          >
            Login
          </Link>

          <Link
            to='/signup'
            className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
          >
            Get Started
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className='md:hidden p-2'
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label='Toggle menu'
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className='md:hidden border-t bg-white px-6 py-4 space-y-4'>
          {sections.slice(0, 5).map(id => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`block w-full text-left ${
                active === id
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-700'
              }`}
              aria-current={active === id ? 'page' : undefined}
            >
              {id === 'how'
                ? 'How it works'
                : id[0].toUpperCase() + id.slice(1)}
            </button>
          ))}

          <div className='pt-4 flex flex-col gap-3'>
            <Link
              to='/login'
              className='px-4 py-2 border rounded-md text-center'
            >
              Login
            </Link>
            <Link
              to='/signup'
              className='px-4 py-2 bg-indigo-600 text-white rounded-md text-center'
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
