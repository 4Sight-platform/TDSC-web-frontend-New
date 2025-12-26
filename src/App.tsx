import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import DifferentiatorSection from './components/DifferentiatorSection'
import FourSightSection from './components/FourSightSection'
import ServicesSection from './components/ServicesSection'
import PublicationSection from './components/PublicationSection'
import Footer from './components/Footer'
import AssessmentPage from './pages/AssessmentPage'
import PublicationsPage from './pages/PublicationsPage'
import PublicationDetailPage from './pages/PublicationDetailPage'

// Home page component
const HomePage = () => (
    <>
        <Navbar />
        <main>
            <HeroSection />
            <DifferentiatorSection />
            <FourSightSection />
            <ServicesSection />
            <PublicationSection />
        </main>
        <Footer />
    </>
)

function App() {
    return (
        <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-900 transition-colors duration-300">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/assessment" element={<AssessmentPage />} />
                <Route path="/publications" element={<PublicationsPage />} />
                <Route path="/publications/:slug" element={<PublicationDetailPage />} />
            </Routes>
        </div>
    )
}

export default App
