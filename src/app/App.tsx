// ------------------------------
// Импорты
// ------------------------------
// React Router
import { Routes, Route, Navigate } from "react-router-dom";

// Контексты и провайдеры
import { useAuthContext } from "./provider/AuthProvider";
import { PlayerProvider } from "../entities/player/model/PlayerProvider";
import { FavoritesProvider } from "../features/favorites/model/FavoritesProvider";

// Защита маршрутов
import { ProtectedRoute } from "./router/ProtectedRoute";

// Страницы
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import TracksPage from "../pages/TracksPage/TracksPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

// Виджеты и лейаут
import Player from "../widgets/Player/Player";
import AppLayout from "../widgets/Layout/AppLayout";

// ------------------------------
// Компонент
// ------------------------------
function App() {
  const { isAuth } = useAuthContext();

  return (
    <FavoritesProvider>
      <PlayerProvider>
        <Routes>
          {/* Редиректы */}
          <Route path="/" element={<Navigate to="/tracks" replace />} />

          {/* Публичные страницы */}
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/tracks" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={
              isAuth ? <Navigate to="/tracks" replace /> : <RegisterPage />
            }
          />

          {/* Защищённые страницы с общим лейаутом */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout showFullHeader />
              </ProtectedRoute>
            }
          >
            <Route path="/tracks" element={<TracksPage />} />
          </Route>

          {/* Защищённые страницы без сайдбара */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout showFullHeader={false} />
              </ProtectedRoute>
            }
          >
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>

        {/* Глобальный плеер */}
        <Player />
      </PlayerProvider>
    </FavoritesProvider>
  );
}

export default App;
