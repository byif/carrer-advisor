import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    // Check local storage for existing session
    const user = localStorage.getItem('user');
    if (user) {
      setAuth({
        user: JSON.parse(user),
        isAuthenticated: true,
        loading: false,
      });
    } else {
      setAuth(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const user: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({
      user,
      isAuthenticated: true,
      loading: false,
    });
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulate API call
    const user: User = {
      id: '1',
      email,
      name,
    };
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({
      user,
      isAuthenticated: true,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuth({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};