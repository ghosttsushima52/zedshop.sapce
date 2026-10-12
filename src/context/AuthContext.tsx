'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (usernameOrEmail: string, password?: string) => { success: boolean; message?: string };
  register: (name: string, username: string, email: string, phone: string, password?: string) => { success: boolean; message?: string };
  logout: () => void;
  isAdmin: boolean;
  usersList: User[];
}

const AUTH_STORAGE_KEY = 'volta_current_user_v1';
const USERS_LIST_KEY = 'volta_registered_users_v1';

// Default Admin gglegend
const DEFAULT_SUPERADMIN: User = {
  id: 'admin-gglegend',
  name: 'GG Legend (Yönetici)',
  username: 'gglegend',
  email: 'admin@volta.com.tr',
  phone: '05550000000',
  isAdmin: true,
  createdAt: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([DEFAULT_SUPERADMIN]);

  // Load user and users list from localStorage on mount
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(USERS_LIST_KEY);
      if (storedUsers) {
        const parsed = JSON.parse(storedUsers);
        // Ensure gglegend always exists with admin rights
        if (!parsed.some((u: User) => u.username.toLowerCase() === 'gglegend')) {
          parsed.unshift(DEFAULT_SUPERADMIN);
        }
        setUsersList(parsed);
      } else {
        localStorage.setItem(USERS_LIST_KEY, JSON.stringify([DEFAULT_SUPERADMIN]));
      }

      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        const current = JSON.parse(storedUser);
        // Guarantee admin status for gglegend
        if (current.username.toLowerCase() === 'gglegend') {
          current.isAdmin = true;
        }
        setUser(current);
      }
    } catch (e) {
      console.error('Failed to load auth state:', e);
    }
  }, []);

  const login = (usernameOrEmail: string, password?: string) => {
    const cleanIdentifier = usernameOrEmail.trim().toLowerCase();

    // Check if it is the special gglegend superadmin
    if (cleanIdentifier === 'gglegend') {
      const adminUser: User = {
        ...DEFAULT_SUPERADMIN,
        name: 'GG Legend (Yönetici)',
        isAdmin: true,
      };
      setUser(adminUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
      return { success: true, message: 'GG Legend Yönetici girişi başarılı!' };
    }

    // Search in registered users
    const found = usersList.find(
      (u) =>
        u.username.toLowerCase() === cleanIdentifier ||
        u.email.toLowerCase() === cleanIdentifier
    );

    if (found) {
      const loggedUser = {
        ...found,
        isAdmin: found.username.toLowerCase() === 'gglegend',
      };
      setUser(loggedUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedUser));
      return { success: true, message: `Hoş geldiniz, ${loggedUser.name}` };
    }

    // If user does not exist yet and isn't gglegend, auto-create a standard user profile for convenience
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: cleanIdentifier.split('@')[0],
      username: cleanIdentifier,
      email: cleanIdentifier.includes('@') ? cleanIdentifier : `${cleanIdentifier}@musteri.com`,
      phone: '05550000000',
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };

    const updatedList = [...usersList, newUser];
    setUsersList(updatedList);
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(updatedList));

    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    return { success: true, message: `Giriş yapıldı, hoş geldiniz ${newUser.name}` };
  };

  const register = (name: string, username: string, email: string, phone: string, password?: string) => {
    const cleanUsername = username.trim().toLowerCase();

    if (!cleanUsername) {
      return { success: false, message: 'Kullanıcı adı boş bırakılamaz.' };
    }

    if (usersList.some((u) => u.username.toLowerCase() === cleanUsername)) {
      return { success: false, message: 'Bu kullanıcı adı zaten kayıtlı.' };
    }

    const isSuperAdmin = cleanUsername === 'gglegend';

    const newUser: User = {
      id: 'user-' + Date.now(),
      name: name.trim() || cleanUsername,
      username: cleanUsername,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
      isAdmin: isSuperAdmin,
      createdAt: new Date().toISOString(),
    };

    const updatedList = [...usersList, newUser];
    setUsersList(updatedList);
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(updatedList));

    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));

    return {
      success: true,
      message: isSuperAdmin 
        ? 'GG Legend Yönetici hesabı oluşturuldu ve oturum açıldı!' 
        : 'Kayıt işlemi başarıyla tamamlandı!',
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const isAdmin = !!user && (user.isAdmin || user.username.toLowerCase() === 'gglegend');

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, usersList }}>
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
