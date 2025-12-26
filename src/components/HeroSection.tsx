import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Import theme-specific background images
import bannerDark from '../assets/banner-collage(dark_theme).png';
import bannerLight from '../assets/banner-collage(light_theme).png';

const stats = [
    { value: '200+', label: 'Clients Served' },
    { value: '50+', label: 'Integrations' },
    { value: '99.9%', label: 'Uptime' },
];

const HeroSection = () => {
    const { theme } = useTheme();

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-dark-900 dark:to-dark-900 transition-colors duration-300" />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet/10 via-transparent to-coral/5 dark:from-violet/20 dark:via-dark-900 dark:to-coral/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-dark-900 via-transparent to-transparent" />

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
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50/80 via-slate-50/50 to-transparent dark:from-dark-900/80 dark:via-dark-900/50 dark:to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm mb-8 shadow-sm"
                    >
                        <Sparkles className="w-4 h-4 text-coral" />
                        <span className="text-sm text-slate-700 dark:text-white/80">Intelligent Automation Platform</span>
                    </motion.div>

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
                        <button
                            onClick={() => scrollToSection('#4sight')}
                            className="px-8 py-4 rounded-full border-2 border-slate-300 dark:border-white/20 text-slate-700 dark:text-white font-medium flex items-center gap-2 hover:border-violet/50 hover:bg-violet/5 dark:hover:bg-white/5 transition-all"
                        >
                            Explore 4Sight
                            <Zap className="w-5 h-5" />
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap items-center gap-6"
                    >
                        {stats.map((stat, index) => (
                            <div key={stat.label} className="stat-badge flex items-center gap-3">
                                {index === 0 && <Users className="w-5 h-5 text-coral" />}
                                {index === 1 && <Zap className="w-5 h-5 text-violet" />}
                                {index === 2 && <TrendingUp className="w-5 h-5 text-cyan" />}
                                <div>
                                    <span className="text-xl font-bold text-slate-800 dark:text-white">{stat.value}</span>
                                    <span className="text-sm text-slate-500 dark:text-white/60 ml-2">{stat.label}</span>
                                </div>
                            </div>
                        ))}
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
