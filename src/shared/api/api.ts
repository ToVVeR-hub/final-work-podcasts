// ------------------------------
// Константы
// ------------------------------
const BASE_URL = "http://localhost:8000/api";

// ------------------------------
// Основная функция запроса
// ------------------------------
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API error");
  }

  return response.json() as Promise<T>;
}

// ------------------------------
// Экспортируемый API-клиент
// ------------------------------
export const api = {
  // GET-запрос
  get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint);
  },

  // POST-запрос
  post<T>(endpoint: string, body?: unknown): Promise<T> {
    return request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  // DELETE-запрос
  delete<T>(endpoint: string, body?: unknown): Promise<T> {
    return request<T>(endpoint, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : undefined,
    });
  },
};
