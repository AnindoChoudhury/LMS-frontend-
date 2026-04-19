'use client';

import React, { createContext, useState, useCallback, useEffect } from 'react';
import { mockUsers } from '@/lib/mockData';

export type UserRole = 'STUDENT' | 'INSTRUCTOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('lms_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to restore user from localStorage', error);
        localStorage.removeItem('lms_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock authentication logic
      let authenticatedUser: User | null = null;

      if (email === 'alice@test.com' && role === 'STUDENT') {
        authenticatedUser = mockUsers.student;
      } else if (email === 'bob@test.com' && role === 'INSTRUCTOR') {
        authenticatedUser = mockUsers.instructor;
      } else if (role === 'STUDENT') {
        // Allow any email for student role (mock signup scenario)
        authenticatedUser = {
          id: Date.now().toString(),
          name: email.split('@')[0],
          email,
          role: 'STUDENT',
        };
      } else {
        // Allow any email for instructor role (mock signup scenario)
        authenticatedUser = {
          id: Date.now().toString(),
          name: email.split('@')[0],
          email,
          role: 'INSTRUCTOR',
        };
      }

      setUser(authenticatedUser);
      localStorage.setItem('lms_user', JSON.stringify(authenticatedUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
      };

      setUser(newUser);
      localStorage.setItem('lms_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('lms_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
