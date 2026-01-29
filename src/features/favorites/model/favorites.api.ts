// ------------------------------
// Импорты
// ------------------------------
import { api } from "../../../shared/api/api";

// Типы
import type { Track } from "../../../entities/track/model/types";

// ------------------------------
// API избранного
// ------------------------------

export const favoritesApi = {
  // Получить все избранные треки
  getAll(): Promise<Track[]> {
    return api.get("/favorites");
  },

  // Добавить трек в избранное
  add(trackId: number): Promise<void> {
    return api.post("/favorites", { trackId });
  },

  //Удалить трек из избранного
  remove(trackId: number): Promise<void> {
    return api.delete("/favorites", { trackId });
  },
};
