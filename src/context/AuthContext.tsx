import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../services/api';

interface User {
    id: number;
    username: string;
    email: string;
    created_at: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                try {
                    const userData = await authApi.getMe();
                    setUser(userData);
                } catch {
                    localStorage.removeItem('auth_token');
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authApi.signin(email, password);
        localStorage.setItem('auth_token', response.access_token);
        setUser(response.user);
    };

    const signup = async (username: string, email: string, password: string) => {
        const response = await authApi.signup(username, email, password);
        localStorage.setItem('auth_token', response.access_token);
        setUser(response.user);
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    const refreshUser = async () => {
        try {
            const userData = await authApi.getMe();
            setUser(userData);
        } catch {
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, signup, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
