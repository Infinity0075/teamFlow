import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import WhyInfinity from './sections/WhyInfinity.jsx'
import HowItWorks from './sections/HowItWorks.jsx'
import DemoPreview from './sections/DemoPreview.jsx'
import TryOnboarding from './sections/TryOnboarding.jsx'
import CTA from './sections/CTA.jsx'
import Footer from './sections/footer.jsx'

const Home = () => {
  return (
    <>
      <Navbar />

      <main className='w-full overflow-x-hidden'>
        <section id='home'>
          <Hero />
        </section>

        <section id='features'>
          <WhyInfinity />
        </section>

        <section id='how'>
          <HowItWorks />
        </section>

        <section id='demo'>
          <DemoPreview />
        </section>

        <section id='try'>
          <TryOnboarding />
        </section>

        <section id='cta'>
          <CTA />
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home
