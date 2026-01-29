// ------------------------------
// Импорты
// ------------------------------

import React, { createContext, useContext } from "react";

// Хуки
import { useAuth } from "../../features/auth/useAuth";

// ------------------------------
// Типы
// ------------------------------

type AuthContextType = ReturnType<typeof useAuth>;

// ------------------------------
// Контекст
// ------------------------------

const AuthContext = createContext<AuthContextType | null>(null);

// ------------------------------
// Провайдер
// ------------------------------

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// ------------------------------
// Хук для использования контекста
// ------------------------------

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
}
