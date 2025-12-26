import { Brain, Rocket, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const differentiators = [
    {
        icon: Brain,
        title: 'Data-Driven Intelligence',
        description: 'Transform raw data into actionable insights with AI-powered analytics that uncover hidden opportunities.',
        gradient: 'from-violet to-cyan',
        iconBg: 'bg-violet/20',
        iconColor: 'text-violet',
    },
    {
        icon: Wrench,
        title: 'DIY',
        description: 'Self-service tools that empower you to take control of your growth without technical complexity.',
        gradient: 'from-coral to-violet',
        iconBg: 'bg-coral/20',
        iconColor: 'text-coral',
    },
    {
        icon: Rocket,
        title: 'Accelerated Growth',
        description: 'Scale faster with automated workflows and intelligent optimization that work 24/7.',
        gradient: 'from-cyan to-emerald',
        iconBg: 'bg-cyan/20',
        iconColor: 'text-cyan',
    },
];

const DifferentiatorSection = () => {
    return (
        <section id="about" className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-white dark:bg-dark-800 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 dark:from-dark-900 via-transparent to-slate-50 dark:to-dark-900" />

            {/* Decorative elements */}
            <div className="orb orb-violet w-72 h-72 top-0 right-[20%] opacity-10 dark:opacity-20" />
            <div className="orb orb-coral w-48 h-48 bottom-20 left-[10%] opacity-10 dark:opacity-20" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <div className="accent-line mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-800 dark:text-white mb-4">
                        Automation, <span className="gradient-text-warm">Redefined</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-white/60">
                        Three pillars of intelligent business transformation
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {differentiators.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="group"
                        >
                            <div className="glass-card glass-card-hover shine-effect p-8 h-full transition-all duration-300 cursor-pointer">
                                {/* Icon */}
                                <div className={`icon-container ${item.iconBg} mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`w-7 h-7 ${item.iconColor} group-hover:text-white transition-colors`} strokeWidth={1.5} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 group-hover:text-coral transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 dark:text-white/60 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-white/80 transition-colors">
                                    {item.description}
                                </p>

                                {/* Accent line */}
                                <div className={`mt-6 h-1 w-0 rounded-full bg-gradient-to-r ${item.gradient} group-hover:w-full transition-all duration-500`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DifferentiatorSection;
