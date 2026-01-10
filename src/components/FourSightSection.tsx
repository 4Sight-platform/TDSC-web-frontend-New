import { Target, Rocket, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: Target,
        title: 'Strategy',
        description: 'Strategic workbench for diagnostic health checks and goal-oriented planning.',
    },
    {
        icon: Rocket,
        title: 'Implementation',
        description: 'AI-enabled toolset to generate artifacts like Blogs, FAQs, and Meta Tags.',
    },
    {
        icon: ShieldCheck,
        title: 'Governance',
        description: 'Real-time 24x7 monitoring with alerts for performance degradation.',
    },
    {
        icon: TrendingUp,
        title: 'Optimization',
        description: 'Strategic insights for ecosystem, competition, and keyword universe optimization.',
    },
];


const FourSightSection = () => {
    return (
        <section id="4sight" className="section-padding relative overflow-hidden">
            {/* Dark background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-violet/5 to-slate-100 dark:from-dark-900 dark:via-violet/10 dark:to-dark-900 transition-colors duration-300" />

            {/* Decorative orbs */}
            <div className="orb orb-violet w-80 h-80 -top-20 left-1/4 opacity-15 dark:opacity-30" />
            <div className="orb orb-coral w-64 h-64 bottom-0 right-1/4 opacity-10 dark:opacity-20" />
            <div className="orb orb-cyan w-48 h-48 top-1/2 right-[5%] opacity-10 dark:opacity-20" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="accent-line mb-6" />
                        <p className="text-sm text-coral uppercase tracking-widest mb-4 font-medium">
                            Introducing
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-800 dark:text-white leading-tight mb-6">
                            4Sight{' '}
                            <span className="gradient-text">by TDSC</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-white/70 mb-8 leading-relaxed">
                            Next-gen automation platform for scaling businesses with AI-powered insights. Everything you need to transform your operations.
                        </p>

                        <a
                            href="https://4sight-two.vercel.app/community/seo-maturity-grader"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full bg-coral text-white font-semibold flex items-center gap-2 hover:bg-coral/90 hover:shadow-lg transition-all hover:-translate-y-1 group"
                        >
                            Explore 4Sight
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>

                    {/* Right - Feature Cards */}
                    <div className="space-y-5">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card glass-card-hover p-6 group cursor-pointer"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="icon-container group-hover:scale-110 transition-transform">
                                        <feature.icon className="w-7 h-7 text-violet group-hover:text-white transition-colors" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1 group-hover:text-coral transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-white/60 group-hover:text-slate-700 dark:group-hover:text-white/80 transition-colors">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default FourSightSection;
