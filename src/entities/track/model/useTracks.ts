// ------------------------------
// Импорты
// ------------------------------
import { useEffect, useState } from "react";

// API
import { fetchTracks } from "./tracks.api";

// Типы
import type { Track } from "./types";

// ------------------------------
// Хук
// ------------------------------

export function useTracks() {
  const DEBUG_ERROR = false;

  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTracks = async () => {
      try {
        const data = await fetchTracks();
        if (isMounted) setTracks(data);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Неизвестная ошибка");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTracks();

    return () => {
      isMounted = false;
    };
  }, []);

  if (DEBUG_ERROR) {
    return {
      tracks: [],
      loading: false,
      error: "Сервер упал (debug)",
    };
  }

  return { tracks, loading, error };
}
