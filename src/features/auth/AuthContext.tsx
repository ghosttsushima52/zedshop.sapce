'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, MASTER_CREDENTIALS, LEGEND_CREDENTIALS } from './types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isMasterAdmin: boolean;
  isLegendClient: boolean;
  isGateOpen: boolean;
  login: (username: string, password: string) => { success: boolean; message?: string; role?: string };
  logout: () => void;
  openGate: () => void;
}

const STORAGE_KEY = 'zedshop_auth_user_v2';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // Fallback
    }
  }, []);

  const login = (username: string, password: string) => {
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (trimmedUser === MASTER_CREDENTIALS.username && trimmedPass === MASTER_CREDENTIALS.password) {
      const authUser: AuthUser = {
        username: MASTER_CREDENTIALS.username,
        name: MASTER_CREDENTIALS.name,
        role: 'master_admin',
        accessibleSites: ['*'],
      };
      setUser(authUser);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      } catch {}
      return { success: true, role: 'master_admin' };
    }

    if (trimmedUser === LEGEND_CREDENTIALS.username && trimmedPass === LEGEND_CREDENTIALS.password) {
      const authUser: AuthUser = {
        username: LEGEND_CREDENTIALS.username,
        name: LEGEND_CREDENTIALS.name,
        role: 'legend_client',
        accessibleSites: ['legendgame'],
      };
      setUser(authUser);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      } catch {}
      return { success: true, role: 'legend_client' };
    }

    return { success: false, message: 'Hatalı kullanıcı adı veya şifre. Erişim engellendi.' };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  // If user is not authenticated, the gate is strictly OPEN (cannot be closed without logging in)
  const isGateOpen = mounted && !user;

  const openGate = () => {
    // If authenticated user wants to switch account, they logout
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isMasterAdmin: user?.role === 'master_admin',
        isLegendClient: user?.role === 'legend_client',
        isGateOpen,
        login,
        logout,
        openGate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
