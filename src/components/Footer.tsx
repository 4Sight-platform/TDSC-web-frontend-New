import { useState } from 'react';
import { Send, MapPin, Mail, Phone, Linkedin, Twitter, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import tdscLogo from '../assets/TDSC_LOGO.JPG';

const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
];

const Footer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organisation: '',
        phone: '',
        queryType: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <footer id="contact" className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-dark-900 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-violet/5 dark:from-violet/10 via-transparent to-transparent" />

            {/* Decorative orbs */}
            <div className="orb orb-violet w-72 h-72 top-0 right-[20%] opacity-10 dark:opacity-20" />
            <div className="orb orb-coral w-48 h-48 bottom-20 left-[10%] opacity-10 dark:opacity-20" />

            <div className="relative z-10 section-padding">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left - Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="accent-line mb-6" />
                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 dark:text-white mb-4">
                                Start a <span className="gradient-text">Conversation</span>
                            </h3>
                            <p className="text-slate-600 dark:text-white/60 mb-8">
                                Ready to transform with intelligent automation?
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name & Email */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="input-field"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="input-field"
                                    />
                                </div>

                                {/* Organisation & Phone */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Organisation"
                                        value={formData.organisation}
                                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                                        className="input-field"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="input-field"
                                    />
                                </div>

                                {/* Query Type */}
                                <select
                                    value={formData.queryType}
                                    onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                                    className="input-field cursor-pointer"
                                >
                                    <option value="" disabled>Select Query Type</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="demo">Request a Demo</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="support">Support</option>
                                    <option value="other">Other</option>
                                </select>

                                {/* Message */}
                                <textarea
                                    placeholder="Your message..."
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="input-field resize-none"
                                />

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="px-8 py-3 rounded-full bg-gradient-to-r from-coral to-violet text-white font-semibold flex items-center gap-2 hover:shadow-xl hover:shadow-violet/30 transition-all hover:-translate-y-1"
                                >
                                    Send Message
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </motion.div>

                        {/* Right - Info & Social */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:pl-8"
                        >
                            {/* Logo */}
                            <div className="flex items-center gap-3 mb-6">
                                <img src={tdscLogo} alt="TDSC Logo" className="w-12 h-12 rounded-xl object-contain shadow-lg shadow-violet/20" />
                                <span className="text-2xl font-serif font-semibold text-slate-800 dark:text-white transition-colors">TDSC</span>
                            </div>

                            <p className="text-slate-600 dark:text-white/60 mb-8 max-w-sm leading-relaxed">
                                Intelligent automation for business growth. We help companies transform their operations with AI-powered solutions.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-4 text-slate-600 dark:text-white/60 hover:text-coral transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-coral/20 transition-colors flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <span className="leading-relaxed">Eastern High, Block AG 1, Major Arterial Road, Action Area 1, New Town, North 24 Parganas, West Bengal-700156</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-600 dark:text-white/60 hover:text-coral transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-coral/20 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span>hello@tdsc.com</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-600 dark:text-white/60 hover:text-coral transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-coral/20 transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <span>+91 98300 50939</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="social-link"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5 text-slate-500 dark:text-white/60 group-hover:text-white" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-slate-200 dark:border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500 dark:text-white/40">
                            © 2025 TDSC. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-sm text-slate-500 dark:text-white/40 hover:text-coral transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-slate-500 dark:text-white/40 hover:text-coral transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
