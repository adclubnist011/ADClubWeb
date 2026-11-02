import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import Events from '../components/Events'
import Gallery from '../components/Gallery'
import Team from '../components/Team'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='bg-black transition-colors duration-500'>
        <Header />
        <HeroSection />
        <AboutSection />
        <Events />
        <Gallery />
        <Team />
        <ContactSection />
        <Footer />
    </div>
  )
}

export default Home