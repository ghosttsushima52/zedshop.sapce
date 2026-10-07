'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, MASTER_CREDENTIALS, LEGEND_CREDENTIALS } from './types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isMasterAdmin: boolean;
  isLegendClient: boolean;
  isGateOpen: boolean;
  checkCredentials: (username: string, password: string) => { valid: boolean; role?: 'master_admin' | 'legend_client'; user?: AuthUser };
  login: (username: string, password: string) => { success: boolean; message?: string; role?: string };
  logout: () => void;
  openGate: () => void;
}

const SESSION_KEY = 'zedshop_auth_session_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Eski kalıntıları temizle, yalnızca bu aktif sekmedeki sessionStorage oturumunu tanı
    try {
      localStorage.removeItem('zedshop_auth_user_v2');
      localStorage.removeItem('zedshop_auth_user');
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const checkCredentials = (username: string, password: string) => {
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (trimmedUser === MASTER_CREDENTIALS.username && trimmedPass === MASTER_CREDENTIALS.password) {
      return {
        valid: true,
        role: 'master_admin' as const,
        user: {
          username: MASTER_CREDENTIALS.username,
          name: MASTER_CREDENTIALS.name,
          role: 'master_admin' as const,
          accessibleSites: ['*'],
        },
      };
    }

    if (
      trimmedUser === LEGEND_CREDENTIALS.username &&
      (trimmedPass === LEGEND_CREDENTIALS.password ||
        trimmedPass === 'ggLegendGamer3339itemsatis' ||
        trimmedPass.toLowerCase() === 'gglegendgamer3339itemsatıs' ||
        trimmedPass.toLowerCase() === 'gglegendgamer3339itemsatis')
    ) {
      return {
        valid: true,
        role: 'legend_client' as const,
        user: {
          username: LEGEND_CREDENTIALS.username,
          name: LEGEND_CREDENTIALS.name,
          role: 'legend_client' as const,
          accessibleSites: ['legendgame'],
        },
      };
    }

    return { valid: false };
  };

  const login = (username: string, password: string) => {
    const check = checkCredentials(username, password);

    if (check.valid && check.user) {
      setUser(check.user);
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(check.user));
      } catch {}
      return { success: true, role: check.role };
    }

    return { success: false, message: 'Hatalı kullanıcı adı veya şifre. Erişim engellendi.' };
  };

  const logout = () => {
    setUser(null);
    try {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
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
        checkCredentials,
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

export function GateProtector({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        display: mounted && !isAuthenticated ? 'none' : 'block',
        visibility: mounted && !isAuthenticated ? 'hidden' : 'visible',
      }}
    >
      {children}
    </div>
  );
}
