import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from '.';
import type { User } from '@/types';

const API_URL = import.meta.env.VITE_EVENTS_API_URL;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tryToLoginUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_URL}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get profile');
          }
          const profile = (await response.json()) as User;
          console.log({ profile });
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(profile));
          setUser(profile);
        } catch {
          setToken(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    tryToLoginUser();
  }, [token]);

  const login = (token: string) => {
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = Boolean(token && user);

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
