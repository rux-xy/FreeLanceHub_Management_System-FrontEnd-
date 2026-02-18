import React, { useEffect, useState, createContext, useContext } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (
  name: string,
  email: string,
  password: string,
  role: UserRole)
  => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('freelancehub_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth initialization failed', error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await api.auth.login(email, password);
      setUser(user);
      localStorage.setItem('freelancehub_user', JSON.stringify(user));
      return user;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (
  name: string,
  email: string,
  password: string,
  role: UserRole) =>
  {
    setIsLoading(true);
    setError(null);
    try {
      const user = await api.auth.register({
        name,
        email,
        password,
        role
      });
      setUser(user);
      localStorage.setItem('freelancehub_user', JSON.stringify(user));
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('freelancehub_user');
  };
  const clearError = () => setError(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError
      }}>

      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}