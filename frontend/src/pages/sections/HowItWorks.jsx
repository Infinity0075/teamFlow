const steps = [
  {
    step: '01',
    title: 'Admin sets up the system',
    desc: 'Create the organization and define how your team will work.'
  },
  {
    step: '02',
    title: 'Define roles & permissions',
    desc: 'Control what each role can view or manage inside the system.'
  },
  {
    step: '03',
    title: 'Employees onboard themselves',
    desc: 'Users complete onboarding and access only what’s allowed.'
  },
  {
    step: '04',
    title: 'Manage everything in real time',
    desc: 'Track employees, status, and structure — all in one place.'
  }
]

const HowItWorks = () => {
  return (
    <section id='how' className='py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* HEADER */}
        <div className='text-center max-w-3xl mx-auto'>
          <h2 className='text-4xl font-bold text-gray-900'>
            How <span className='text-indigo-600'>Infinity</span> works
          </h2>
          <p className='mt-4 text-gray-600'>
            A simple flow designed to keep control where it belongs.
          </p>
        </div>

        {/* STEPS */}
        <div className='mt-16 grid grid-cols-1 md:grid-cols-4 gap-8'>
          {steps.map(item => (
            <div
              key={item.step}
              className='border rounded-xl p-6 text-center hover:shadow-md transition'
            >
              <div className='text-indigo-600 font-bold text-xl'>
                {item.step}
              </div>
              <h3 className='mt-4 font-semibold text-lg'>{item.title}</h3>
              <p className='mt-2 text-sm text-gray-600'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
