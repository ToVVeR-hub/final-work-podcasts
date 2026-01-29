// ------------------------------
// Импорты
// ------------------------------
import { useCallback, useEffect, useState } from "react";

// API
import { favoritesApi } from "./favorites.api";

// Контекст
import { FavoritesContext } from "./FavoritesContext";

// Типы
import type { Track } from "../../../entities/track/model/types";

// ------------------------------
// Провайдер
// ------------------------------
interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка избранного при монтировании
  useEffect(() => {
    let isMounted = true;

    favoritesApi
      .getAll()
      .then((data) => {
        if (isMounted) setFavorites(data);
      })
      .catch((err) => {
        console.error("Не удалось загрузить избранное:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((t) => t.id === id),
    [favorites],
  );

  const addToFavorites = useCallback(async (track: Track) => {
    await favoritesApi.add(track.id);
    setFavorites((prev) => {
      if (prev.some((t) => t.id === track.id)) return prev;
      return [...prev, track];
    });
  }, []);

  const removeFromFavorites = useCallback(async (id: number) => {
    await favoritesApi.remove(id);
    setFavorites((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = {
    favorites,
    loading,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
