import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
    { label: 'Explore 4Sight', href: '#4sight' },
    { label: 'Services', href: '#services' },
    { label: 'Publication', href: '#publication' },
    { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scrolling to section after navigation
    useEffect(() => {
        if (location.hash) {
            // Small delay to ensure DOM is ready after navigation
            setTimeout(() => {
                const id = location.hash.slice(1); // Remove the # prefix
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    // Helper to escape CSS selector for IDs that start with a number
    const escapeSelector = (selector: string) => {
        if (selector.startsWith('#')) {
            const id = selector.slice(1);
            // If ID starts with a digit, escape it for CSS selector
            if (/^\d/.test(id)) {
                return '#\\3' + id.charAt(0) + ' ' + id.slice(1);
            }
        }
        return selector;
    };

    const scrollToSection = (href: string) => {
        setIsOpen(false);

        // If not on home page, navigate to home first with the section hash
        if (location.pathname !== '/') {
            navigate('/' + href);
            return;
        }

        // If already on home page, just scroll to the section
        // Use getElementById for IDs starting with numbers (more reliable)
        const id = href.startsWith('#') ? href.slice(1) : href;
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral via-violet to-cyan flex items-center justify-center shadow-lg shadow-violet/20 group-hover:shadow-violet/40 transition-shadow">
                            <span className="text-white font-serif font-bold text-xl">T</span>
                        </div>
                        <span className="text-xl font-serif font-semibold text-slate-800 dark:text-white transition-colors">TDSC</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => scrollToSection(link.href)}
                                className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coral group-hover:w-full transition-all duration-300" />
                            </button>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-amber-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-violet" />
                            )}
                        </button>

                        <button
                            onClick={() => scrollToSection('#contact')}
                            className="px-5 py-2.5 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral/90 hover:shadow-lg transition-all hover:-translate-y-0.5"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        {/* Theme Toggle Mobile */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-white/10"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-amber-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-violet" />
                            )}
                        </button>
                        <button
                            className="p-2 text-slate-700 dark:text-white"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/5">
                    <div className="px-6 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => scrollToSection(link.href)}
                                className="block w-full text-left text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white py-2 text-sm font-medium transition-colors"
                            >
                                {link.label}
                            </button>
                        ))}
                        <button
                            onClick={() => scrollToSection('#contact')}
                            className="w-full px-5 py-2.5 rounded-full bg-coral text-white text-sm font-medium"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
