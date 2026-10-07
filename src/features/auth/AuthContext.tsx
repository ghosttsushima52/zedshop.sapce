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
  closeGate: () => void;
}

const STORAGE_KEY = 'zedshop_auth_user_v2';
const GATE_VISITED_KEY = 'zedshop_gate_visited_v2';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // If not logged in, trigger gate animation on first visit
        const visited = sessionStorage.getItem(GATE_VISITED_KEY);
        if (!visited) {
          setIsGateOpen(true);
          sessionStorage.setItem(GATE_VISITED_KEY, 'true');
        }
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      setIsGateOpen(false);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      setIsGateOpen(false);
      return { success: true, role: 'legend_client' };
    }

    return { success: false, message: 'Geçersiz kullanıcı adı veya şifre!' };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setIsGateOpen(true);
  };

  const openGate = () => setIsGateOpen(true);
  const closeGate = () => setIsGateOpen(false);

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
        closeGate,
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
