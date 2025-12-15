import thinking from '../images/thinking.jpg'
import developer from '../images/developer.jpg'
import reports from '../images/report.jpg'
import time from '../images/time.jpg'

const WhyInfinity = () => {
  return (
    <section id='features' className='py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-6 space-y-32'>
        {/* SECTION TITLE */}
        <div className='text-center max-w-3xl mx-auto'>
          <h2 className='text-4xl font-bold text-gray-900'>
            Why <span className='text-indigo-600'>Infinity</span> works
          </h2>
          <p className='mt-4 text-gray-600'>
            Because managing people should feel clear, not complicated.
          </p>
        </div>

        {/* 1. CONFUSION */}
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <img
            src={thinking}
            alt='Confusion'
            className='rounded-2xl overflow-hidden shadow-lg bg-white'
          />

          <div>
            <h3 className='text-2xl font-semibold mb-4'>
              Teams get messy without structure
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              As teams grow, roles blur. Access becomes unclear. Important
              decisions get buried under confusion. Infinity brings structure
              from day one.
            </p>
          </div>
        </div>

        {/* 2. ADMIN CONTROL */}
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <h3 className='text-2xl font-semibold mb-4'>
              Admin stays in control
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              Admins define roles, permissions, and access rules. Everyone sees
              only what they are allowed to see. No accidental changes. No
              chaos.
            </p>
          </div>

          <img
            src={developer}
            alt='Admin Control'
            className='rounded-2xl overflow-hidden shadow-lg bg-white'
          />
        </div>

        {/* 3. VISIBILITY */}
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <img
            src={reports}
            alt='Clarity'
            className='rounded-2xl overflow-hidden shadow-lg bg-white'
          />

          <div>
            <h3 className='text-2xl font-semibold mb-4'>
              Everything is visible at a glance
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              Know who is active, who reports to whom, and how your organization
              is structured — without opening ten different tools.
            </p>
          </div>
        </div>

        {/* 4. TIME */}
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <h3 className='text-2xl font-semibold mb-4'>
              Save time. Focus on work.
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              Infinity removes repetitive tasks and manual tracking. What
              changes updates instantly — so your team focuses on real work.
            </p>
          </div>

          <img
            src={time}
            alt='Save Time'
            className='rounded-2xl overflow-hidden shadow-lg bg-white'
          />
        </div>
      </div>
    </section>
  )
}

export default WhyInfinity
