import { ArrowRight, Zap, ClipboardCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import AnimatedBackground from './AnimatedBackground';

// Import theme-specific background images
import bannerDark from '../assets/banner-collage(dark_theme).png';
import bannerLight from '../assets/banner-collage(light_theme).png';



const HeroSection = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (sectionId: string) => {
        // If not on home page, navigate to home first with the section hash
        if (location.pathname !== '/') {
            navigate('/' + sectionId);
            return;
        }

        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background - Warmer cream tone */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5] to-[#f5f3ef] dark:from-dark-900 dark:to-dark-900 transition-colors duration-300" />

            {/* Animated Background */}
            <AnimatedBackground />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet/5 via-transparent to-coral/5 dark:from-violet/20 dark:via-dark-900 dark:to-coral/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] dark:from-dark-900 via-transparent to-transparent" />

            {/* Floating orbs */}
            <div className="orb orb-violet w-96 h-96 -top-20 -left-20 opacity-30 dark:opacity-40" style={{ animationDelay: '0s' }} />
            <div className="orb orb-coral w-80 h-80 top-1/3 right-[10%] opacity-20 dark:opacity-40" style={{ animationDelay: '2s' }} />
            <div className="orb orb-cyan w-64 h-64 bottom-20 left-1/4 opacity-20 dark:opacity-40" style={{ animationDelay: '4s' }} />

            {/* Theme-specific Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img
                    key={theme}
                    src={theme === 'dark' ? bannerDark : bannerLight}
                    alt="Background collage"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover blur-[2px] opacity-40 dark:opacity-30"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5]/80 via-[#faf8f5]/50 to-transparent dark:from-dark-900/80 dark:via-dark-900/50 dark:to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-3xl">


                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight mb-6 tracking-tight"
                    >
                        <span className="text-slate-800 dark:text-white">Transform Your Business with </span>
                        <span className="gradient-text">Intelligent Automation</span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-white/70 mb-10 max-w-xl leading-relaxed"
                    >
                        AI-powered insights and automation that deliver measurable results for modern businesses. Scale faster, work smarter.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap items-center gap-4 mb-12"
                    >
                        <button
                            onClick={() => scrollToSection('#contact')}
                            className="px-8 py-4 rounded-full bg-coral text-white font-semibold flex items-center gap-2 hover:bg-coral/90 hover:shadow-lg transition-all hover:-translate-y-1 group"
                        >
                            Get Started
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a
                            href="https://4sight-two.vercel.app/knowledge"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full border-2 border-slate-300 dark:border-white/20 text-slate-700 dark:text-white font-medium flex items-center gap-2 hover:border-violet/50 hover:bg-violet/5 dark:hover:bg-white/5 transition-all"
                        >
                            Onboard in 4Sight
                            <Zap className="w-5 h-5" />
                        </a>
                        <Link
                            to="/assessment"
                            className="px-6 py-4 rounded-full bg-violet/10 dark:bg-violet/20 text-violet dark:text-violet-300 font-medium flex items-center gap-2 hover:bg-violet/20 dark:hover:bg-violet/30 transition-all border border-violet/20"
                        >
                            <ClipboardCheck className="w-5 h-5" />
                            Data Maturity Audit
                        </Link>
                    </motion.div>


                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-slate-400 dark:text-white/40 text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-white/20 flex items-start justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-2.5 rounded-full bg-slate-400 dark:bg-white/40"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
