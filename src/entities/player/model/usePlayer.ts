// ------------------------------
// Импорты
// ------------------------------
import { useContext } from "react";

// Контекст
import { PlayerContext } from "./PlayerContext";

// ------------------------------
// Хук
// ------------------------------

export function usePlayer() {
  const ctx = useContext(PlayerContext);

  if (!ctx) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }

  return ctx;
}
