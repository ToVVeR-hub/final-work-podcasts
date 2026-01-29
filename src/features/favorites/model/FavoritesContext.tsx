// ------------------------------
// Импорты
// ------------------------------
import { createContext } from "react";

// Типы
import type { Track } from "../../../entities/track/model/types";

// ------------------------------
// Тип значения контекста
// ------------------------------
export interface FavoritesContextValue {
  favorites: Track[];
  loading: boolean;
  isFavorite: (id: number) => boolean;
  addToFavorites: (track: Track) => Promise<void>;
  removeFromFavorites: (id: number) => Promise<void>;
}

// ------------------------------
// Контекст
// ------------------------------
export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);
