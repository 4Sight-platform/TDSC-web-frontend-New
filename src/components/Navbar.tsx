import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, User, LogOut } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import tdscLogo from '../assets/TDSC_LOGO.JPG';

const navLinks = [
    { label: '4Sight', href: '#4sight' },
    { label: 'Services', href: '#services' },
    { label: 'Publication', href: '#publication' },
    { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            setTimeout(() => {
                const id = location.hash.slice(1);
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    useEffect(() => {
        const handleClick = () => setShowUserMenu(false);
        if (showUserMenu) {
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [showUserMenu]);

    const scrollToSection = (href: string) => {
        setIsOpen(false);
        if (location.pathname !== '/') {
            navigate('/' + href);
            return;
        }
        const id = href.startsWith('#') ? href.slice(1) : href;
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={tdscLogo} alt="TDSC Logo" className="w-10 h-10 rounded-xl object-contain shadow-lg shadow-violet/20 group-hover:shadow-violet/40 transition-shadow" />
                        <span className="text-xl font-serif font-semibold text-slate-800 dark:text-white transition-colors">TDSC</span>
                    </Link>

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

                        {isAuthenticated && user ? (
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowUserMenu(!showUserMenu);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                                >
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet to-coral flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-white">
                                        {user.username}
                                    </span>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-slate-200 dark:border-white/10">
                                        <div className="px-4 py-2 border-b border-slate-100 dark:border-white/5">
                                            <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                                                {user.username}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-white/50 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/signin"
                                className="px-5 py-2.5 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral/90 hover:shadow-lg transition-all hover:-translate-y-0.5"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden flex items-center gap-3">
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

                        {isAuthenticated && user ? (
                            <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet to-coral flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800 dark:text-white">
                                            {user.username}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-white/50">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-5 py-2.5 rounded-full bg-red-500 text-white text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/signin"
                                onClick={() => setIsOpen(false)}
                                className="block w-full px-5 py-2.5 rounded-full bg-coral text-white text-sm font-medium text-center"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
