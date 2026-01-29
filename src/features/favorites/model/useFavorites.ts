// ------------------------------
// Импорты
// ------------------------------
import { useContext } from "react";

// Контекст
import { FavoritesContext } from "./FavoritesContext";

// ------------------------------
// Хук
// ------------------------------

//Хук для работы с избранным
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
