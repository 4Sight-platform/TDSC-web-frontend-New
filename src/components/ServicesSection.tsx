import { FileSearch, Cpu, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
    {
        icon: FileSearch,
        title: 'Due Diligence',
        description: 'Uncover risks and opportunities in your data journey with comprehensive analysis.',
        features: ['Risk Assessment', 'Data Quality Audit', 'Compliance Check'],
        gradient: 'from-violet to-cyan',
        iconColor: 'text-violet',
    },
    {
        icon: Cpu,
        title: 'AI Assessment',
        description: "Evaluate your organization's AI readiness and create a roadmap for success.",
        features: ['Readiness Score', 'Gap Analysis', 'Implementation Plan'],
        gradient: 'from-coral to-violet',
        iconColor: 'text-coral',
    },
    {
        icon: GraduationCap,
        title: 'AI Training',
        description: 'Equip your team with cutting-edge AI skills and practical knowledge.',
        features: ['Custom Curriculum', 'Hands-on Labs', 'Certification'],
        gradient: 'from-cyan to-emerald',
        iconColor: 'text-cyan',
    },
];

const ServicesSection = () => {
    return (
        <section id="services" className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-white dark:bg-dark-800 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-dark-900 via-transparent to-slate-50 dark:to-dark-900" />

            {/* Decorative */}
            <div className="orb orb-coral w-64 h-64 top-20 right-[15%] opacity-10 dark:opacity-20" />
            <div className="orb orb-violet w-56 h-56 bottom-20 left-[10%] opacity-10 dark:opacity-20" />

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
                        We Also <span className="gradient-text">Provide</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-white/60">
                        Specialized services for your transformation journey
                    </p>
                </motion.div>

                {/* Service Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="group"
                        >
                            <div className="glass-card glass-card-hover shine-effect p-8 h-full flex flex-col transition-all duration-300">
                                {/* Icon */}
                                <div className={`icon-container bg-gradient-to-br ${service.gradient} mb-6`}>
                                    <service.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 dark:text-white/60 mb-6 leading-relaxed flex-grow">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-3 mb-6">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/70">
                                            <CheckCircle className={`w-4 h-4 ${service.iconColor}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-white/60 group-hover:text-coral transition-colors">
                                    Learn more
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
