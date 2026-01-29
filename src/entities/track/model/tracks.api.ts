// ------------------------------
// Импорты
// ------------------------------
import { api } from "../../../shared/api/api";

// Типы
import type { Track } from "./types";

// ------------------------------
// API-запросы
// ------------------------------

//Получение списка всех треков
export async function fetchTracks(): Promise<Track[]> {
  return api.get<Track[]>("/tracks");
}
