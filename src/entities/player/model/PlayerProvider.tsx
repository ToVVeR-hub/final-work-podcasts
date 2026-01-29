// ------------------------------
// Импорты
// ------------------------------
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Контекст
import { PlayerContext } from "./PlayerContext";

// Типы
import type { PlayerState } from "./types";
import type { Track } from "../../track/model/types";

//! Сервер не возвращает данные треков. Используем локальный файл для теста плеера
/* import { decodeAudioToUrl } from "./lib/audio"; */

// ------------------------------
// Утилиты
// ------------------------------
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ------------------------------
// Провайдер
// ------------------------------
type PlayerProviderProps = {
  children: React.ReactNode;
};

export function PlayerProvider({ children }: PlayerProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stateRef = useRef<PlayerState | null>(null);

  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.5,

    queue: [],
    originalQueue: [],
    currentIndex: -1,

    isShuffle: false,
    repeatMode: "off",
  });

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // ------------------------------
  // Инициализация аудио
  // ------------------------------
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.volume = state.volume;

    const onTimeUpdate = () => {
      setState((s) => ({ ...s, currentTime: audio.currentTime }));
    };

    const onLoadedMetadata = () => {
      setState((s) => ({ ...s, duration: audio.duration }));
    };

    const onEnded = () => {
      const audio = audioRef.current;
      const s = stateRef.current;

      if (!audio || !s || !s.currentTrack) return;

      // Повтор одного трека
      if (s.repeatMode === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }

      let nextIndex = s.currentIndex + 1;

      // Повтор всего плейлиста
      if (nextIndex >= s.queue.length) {
        if (s.repeatMode === "all") {
          nextIndex = 0;
        } else {
          setState((prev) => ({ ...prev, isPlaying: false }));
          return;
        }
      }

      const nextTrack = s.queue[nextIndex];
      if (!nextTrack) return;

      // const url = decodeAudioToUrl(nextTrack.id, nextTrack.encoded_audio);
      audio.src = "/audio/yellow-submarine.mp3"; // тест
      audio.currentTime = 0;
      audio.play().catch(() => {});

      setState((prev) => ({
        ...prev,
        currentTrack: nextTrack,
        currentIndex: nextIndex,
        isPlaying: true,
      }));
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // ------------------------------
  // Управление воспроизведением
  // ------------------------------
  const play = useCallback((track: Track, queue?: Track[]) => {
    console.log(atob(track.encoded_audio)); // Тест считывания данных сервера

    const audio = audioRef.current;
    if (!audio) return;

    setState((prev) => {
      const isSameTrack = prev.currentTrack?.id === track.id;

      let nextQueue = prev.queue;
      let nextIndex = prev.currentIndex;

      if (queue) {
        nextQueue = queue;
        nextIndex = queue.findIndex((t) => t.id === track.id);
      }

      if (!isSameTrack) {
        audio.pause();
        // const url = decodeAudioToUrl(nextTrack.id, nextTrack.encoded_audio);
        audio.src = "/audio/yellow-submarine.mp3"; // тест
        audio.currentTime = 0;
        audio.load();
        audio.play().catch(() => {});
      } else if (!prev.isPlaying) {
        audio.play().catch(() => {});
      }

      return {
        ...prev,
        currentTrack: track,
        isPlaying: true,
        queue: nextQueue,
        currentIndex: nextIndex,
      };
    });
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setState((s) => {
      if (!s.currentTrack) return s;

      if (s.isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }

      return { ...s, isPlaying: !s.isPlaying };
    });
  }, []);

  const toggleRepeat = useCallback(() => {
    setState((prev) => {
      const next =
        prev.repeatMode === "off"
          ? "all"
          : prev.repeatMode === "all"
            ? "one"
            : "off";

      return { ...prev, repeatMode: next };
    });
  }, []);

  const next = useCallback(() => {
    setState((prev) => {
      const audio = audioRef.current;
      if (!audio || !prev.queue.length) return prev;

      let nextIndex = prev.currentIndex + 1;

      if (nextIndex >= prev.queue.length) {
        if (prev.repeatMode === "all") {
          nextIndex = 0;
        } else {
          return prev;
        }
      }

      const nextTrack = prev.queue[nextIndex];
      if (!nextTrack) return prev;

      // const url = decodeAudioToUrl(nextTrack.id, nextTrack.encoded_audio);
      audio.src = "/audio/yellow-submarine.mp3"; // тест
      audio.currentTime = 0;
      audio.play().catch(() => {});

      return {
        ...prev,
        currentTrack: nextTrack,
        currentIndex: nextIndex,
        isPlaying: true,
      };
    });
  }, []);

  const prev = useCallback(() => {
    setState((prev) => {
      const prevIndex = prev.currentIndex - 1;
      if (!prev.queue[prevIndex]) return prev;

      const prevTrack = prev.queue[prevIndex];
      const audio = audioRef.current;
      if (!audio) return prev;

      // const url = decodeAudioToUrl(nextTrack.id, nextTrack.encoded_audio);
      const url = "/audio/yellow-submarine.mp3"; // тест
      audio.src = url;
      audio.currentTime = 0;
      audio.play();

      return {
        ...prev,
        currentTrack: prevTrack,
        currentIndex: prevIndex,
        isPlaying: true,
      };
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    setState((prev) => {
      if (!prev.queue.length || !prev.currentTrack) return prev;

      if (!prev.isShuffle) {
        const rest = prev.queue.filter((t) => t.id !== prev.currentTrack!.id);

        const shuffled = shuffleArray(rest);

        return {
          ...prev,
          isShuffle: true,
          originalQueue: prev.queue,
          queue: [prev.currentTrack, ...shuffled],
          currentIndex: 0,
        };
      }

      const index = prev.originalQueue.findIndex(
        (t) => t.id === prev.currentTrack!.id,
      );

      return {
        ...prev,
        isShuffle: false,
        queue: prev.originalQueue,
        originalQueue: [],
        currentIndex: index,
      };
    });
  }, []);

  const setVolume = useCallback((value: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = value;
    setState((s) => ({ ...s, volume: value }));
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setState((s) => ({ ...s, currentTime: time }));
  }, []);

  const reset = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = "";
    }

    setState({
      currentTrack: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 0.5,
      queue: [],
      originalQueue: [],
      currentIndex: -1,
      isShuffle: false,
      repeatMode: "off",
    });
  }, []);

  // ------------------------------
  // Глобальные горячие клавиши
  // ------------------------------

  const SEEK_STEP = 10;
  const VOLUME_STEP = 0.05;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const audio = audioRef.current;
      if (!audio) return;

      // Игнорируем, если фокус на инпуте/текстовом поле
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          toggle();
          break;

        case "ArrowRight":
          seek(
            Math.min(audio.currentTime + SEEK_STEP, audio.duration || Infinity),
          );
          break;

        case "ArrowLeft":
          seek(Math.max(audio.currentTime - SEEK_STEP, 0));
          break;

        case "ArrowUp":
          e.preventDefault();
          setVolume(Math.min(state.volume + VOLUME_STEP, 1));
          break;

        case "ArrowDown":
          e.preventDefault();
          setVolume(Math.max(state.volume - VOLUME_STEP, 0));
          break;

        case "KeyN":
          next();
          break;

        case "KeyP":
          prev();
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle, seek, next, prev, setVolume, state.volume]);

  // ------------------------------
  // Значение для контекста
  // ------------------------------
  const value = useMemo(
    () => ({
      ...state,
      play,
      pause,
      toggle,
      next,
      prev,
      toggleShuffle,
      toggleRepeat,
      seek,
      setVolume,
      reset,
    }),
    [
      state,
      play,
      pause,
      toggle,
      next,
      prev,
      toggleShuffle,
      toggleRepeat,
      seek,
      setVolume,
      reset,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}
