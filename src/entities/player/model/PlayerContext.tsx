// ------------------------------
// Импорты
// ------------------------------
import { createContext } from "react";

// Типы
import type { PlayerState, PlayerApi } from "./types";

// ------------------------------
// Контекст
// ------------------------------

export type PlayerContextValue = PlayerState & PlayerApi;

export const PlayerContext = createContext<PlayerContextValue | null>(null);
