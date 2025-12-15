import banner from '../images/team.jpg'

const Hero = () => {
  return (
    <section className='min-h-[90vh] flex items-center bg-white'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        {/* LEFT */}
        <div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 leading-tight'>
            Employee Management <br />
            <span className='text-indigo-600'>Without Noise</span>
          </h1>

          <p className='mt-6 text-lg text-gray-600'>
            Infinity helps teams manage employees, roles, and access — only what
            your role allows, nothing more.
          </p>

          <div className='mt-8 flex gap-4'>
            <button className='bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition'>
              Get Started
            </button>

            <button className='border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition'>
              Admin Login
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className='flex justify-center'>
          <img
            src={banner}
            alt='Team collaboration'
            className='w-full max-w-md'
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
