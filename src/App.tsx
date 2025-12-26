import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import DifferentiatorSection from './components/DifferentiatorSection'
import FourSightSection from './components/FourSightSection'
import ServicesSection from './components/ServicesSection'
import PublicationSection from './components/PublicationSection'
import Footer from './components/Footer'

function App() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
            <Navbar />
            <main>
                <HeroSection />
                <DifferentiatorSection />
                <FourSightSection />
                <ServicesSection />
                <PublicationSection />
            </main>
            <Footer />
        </div>
    )
}

export default App
