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
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import { AuthProvider } from './context/AuthContext'

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
        <AuthProvider>
            <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-900 transition-colors duration-300">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/assessment" element={<AssessmentPage />} />
                    <Route path="/publications" element={<PublicationsPage />} />
                    <Route path="/publications/:slug" element={<PublicationDetailPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App
