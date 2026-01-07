import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setIsLoading(true);
        try {
            await signup(username, email, password);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Sign up failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-900 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-white/70 hover:text-coral mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-white/10">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Create Account</h1>
                    <p className="text-slate-600 dark:text-white/70 mb-6">Join us to engage with our content</p>

                    {error && <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-1">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet/50"
                                placeholder="yourname" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-1">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet/50"
                                placeholder="you@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-1">Password</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
                                    className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet/50"
                                    placeholder="••••••••" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-1">Confirm Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet/50"
                                placeholder="••••••••" />
                        </div>
                        <button type="submit" disabled={isLoading}
                            className="w-full py-3 rounded-xl bg-coral text-white font-medium hover:bg-coral/90 transition-colors disabled:opacity-50">
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-slate-600 dark:text-white/70">
                        Already have an account? <Link to="/signin" className="text-coral hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
