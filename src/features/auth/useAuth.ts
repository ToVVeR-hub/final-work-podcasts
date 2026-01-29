// ------------------------------
// Импорты
// ------------------------------
import { useState } from "react";

// Сервисы
import * as authService from "../../shared/api/auth.service";

// ------------------------------
// Хук авторизации
// ------------------------------
export function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean>(
    Boolean(localStorage.getItem("token")),
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username"),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ------------------------------
  // Авторизация
  // ------------------------------
  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await authService.login(username, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);

      setIsAuth(true);
      setUsername(username);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // Регистрация
  // ------------------------------
  const register = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      await authService.register(username, password);
      return true;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // Выход
  // ------------------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuth(false);
  };

  return {
    isAuth,
    loading,
    error,
    login,
    register,
    logout,
    username,
  };
}
