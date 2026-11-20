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
  adminBarCollapsed: boolean;
  setAdminBarCollapsed: (collapsed: boolean) => void;
  login: (user: AdminUser, token: string) => void;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  adminBarCollapsed: false,
  setAdminBarCollapsed: () => {},
  login: () => {},
  logout: () => {},
  refreshSession: async () => {},
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adminBarCollapsed, setAdminBarCollapsed] = useState(false);
  const router = useRouter();

  const verifySession = async () => {
    try {
      const res = await verifyCurrentSession({ data: {} });
      if (res && res.user) {
        setUser(res.user);
        setToken(null);
      } else {
        handleLocalLogout();
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.removeItem("bhtf_admin_token");
    localStorage.removeItem("bhtf_admin_user");
    void verifySession();
  }, []);

  const login = (newUser: AdminUser) => {
    setUser(newUser);
    setToken(null);
    localStorage.removeItem("bhtf_admin_token");
    localStorage.removeItem("bhtf_admin_user");
  };

  const handleLocalLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const logout = () => {
    adminLogout({ data: {} }).catch(() => {});
    handleLocalLogout();
    router.navigate({ to: "/admin/login" });
  };

  const refreshSession = async () => {
    await verifySession();
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        adminBarCollapsed,
        setAdminBarCollapsed,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
