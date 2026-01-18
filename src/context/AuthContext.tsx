import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

type AuthUser = { id: string; username: string; email: string };

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LS_TOKEN_KEY = "auth_token";
const LS_USER_KEY = "auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  function clearSession() {
    setToken(null);
    setUser(null);
    localStorage.removeItem(LS_TOKEN_KEY);
    localStorage.removeItem(LS_USER_KEY);
  }

  // Hydrate depuis localStorage au chargement
  useEffect(() => {
    const savedToken = localStorage.getItem(LS_TOKEN_KEY);
    const savedUser = localStorage.getItem(LS_USER_KEY);

    if (savedToken) setToken(savedToken);

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as AuthUser);
      } catch {
        localStorage.removeItem(LS_USER_KEY);
      }
    }
  }, []);

  // Gestion globale des 401 (une seule implémentation)
  useEffect(() => {
    function onUnauthorized() {
      clearSession();
    }

    window.addEventListener("auth:unauthorized", onUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      token,
      isAuthenticated: Boolean(token),

      async login(data) {
        const res = await api.login(data);
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem(LS_TOKEN_KEY, res.token);
        localStorage.setItem(LS_USER_KEY, JSON.stringify(res.user));
      },

      async register(data) {
        // register ne renvoie pas un token -> pas de connexion auto
        await api.register(data);
      },

      async logout() {
        try {
          await api.logout();
        } finally {
          clearSession();
        }
      },
    };
  }, [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
