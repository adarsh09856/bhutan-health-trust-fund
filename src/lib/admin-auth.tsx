import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { verifyCurrentSession, adminLogout } from "./api/auth.functions";

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  sessionId?: number;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  login: (user: AdminUser, token: string) => void;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  refreshSession: async () => {},
});

const TOKEN_KEY = "bhtf_admin_token";
const USER_KEY = "bhtf_admin_user";
const COOKIE_NAME = "bhtf_admin_session";

function setSessionCookie(token: string) {
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax; Secure`;
  }
}

function clearSessionCookie() {
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const verifySession = async (existingToken: string) => {
    try {
      const res = await verifyCurrentSession({ data: { token: existingToken } });
      if (res && res.user) {
        setUser(res.user);
        setToken(existingToken);
        setSessionCookie(existingToken);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      } else {
        // Session was revoked in PostgreSQL or account deactivated
        handleLocalLogout();
      }
    } catch {
      // Network error; preserve local cached user temporarily
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedToken && storedUser) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setSessionCookie(storedToken);
        verifySession(storedToken);
      } else {
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  }, []);

  const login = (newUser: AdminUser, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setSessionCookie(newToken);
  };

  const handleLocalLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    clearSessionCookie();
  };

  const logout = () => {
    if (token) {
      adminLogout({ data: { token } }).catch(() => {});
    }
    handleLocalLogout();
    router.navigate({ to: "/admin/login" });
  };

  const refreshSession = async () => {
    if (token) {
      await verifySession(token);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ user, token, isLoading, login, logout, refreshSession }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
