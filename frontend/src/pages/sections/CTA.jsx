import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className='w-full bg-gray-50 py-20 px-6'>
      <div className='max-w-4xl mx-auto text-center'>
        {/* Headline */}
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
          Start managing your team the right way.
        </h2>

        {/* Sub text */}
        <p className='text-gray-600 text-lg mb-8'>
          No clutter. No confusion. Only what your role allows.
        </p>

        {/* CTA Button */}
        <Link
          to='/signup'
          className='inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition'
        >
          Get Started with Infinity
        </Link>

        {/* Small helper text */}
        <p className='text-sm text-gray-400 mt-4'>Takes less than 2 minutes</p>
      </div>
    </section>
  )
}

export default CTA
