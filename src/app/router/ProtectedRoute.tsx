// ------------------------------
// Импорты
// ------------------------------

import { Navigate } from "react-router-dom";

// Хуки
import { useAuthContext } from "../provider/AuthProvider";

// ------------------------------
// Компонент
// ------------------------------

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuth } = useAuthContext();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
