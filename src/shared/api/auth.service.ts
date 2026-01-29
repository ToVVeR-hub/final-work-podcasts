// ------------------------------
// Импорты
// ------------------------------
import { api } from "./api";

// Типы
type AuthResponse = {
  message: string;
  token: string;
};

// ------------------------------
// Сервис авторизации
// ------------------------------

// Авторизация
export async function login(
  username: string,
  password: string,
): Promise<AuthResponse> {
  return api.post<AuthResponse>("/login", {
    username,
    password,
  });
}

// Регистрация
export async function register(
  username: string,
  password: string,
): Promise<AuthResponse> {
  return api.post<AuthResponse>("/register", {
    username,
    password,
  });
}
