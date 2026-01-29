// ------------------------------
// Импорты
// ------------------------------

import { useState, useRef, useCallback, useEffect } from "react";

// Компоненты
import TrackCard from "./TrackCard";

// Типы
import type { Track } from "../model/types";

// ------------------------------
// Типы пропсов
// ------------------------------

type TrackViewMode = "all" | "favorites";

interface TrackCardListProps {
  tracks: Track[];
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (track: Track) => void;
  onPlay: (track: Track) => void;
  mode: TrackViewMode;
}

// ------------------------------
// Константы
// ------------------------------

const CHUNK_SIZE = 8;

// ------------------------------
// Компонент
// ------------------------------

function TrackCardList({
  tracks,
  isFavorite,
  onToggleFavorite,
  onPlay,
}: TrackCardListProps) {
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + CHUNK_SIZE, tracks.length));
  }, [tracks.length]);

  // Infinite scroll
  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [loadMore]);

  return (
    <div className="track-card-list">
      {tracks.slice(0, visibleCount).map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          isFavorite={isFavorite(track.id)}
          onToggleFavorite={onToggleFavorite}
          onPlay={onPlay}
        />
      ))}

      {/* Триггер для подгрузки */}
      <div ref={loadMoreRef} aria-hidden="true" />
    </div>
  );
}

export default TrackCardList;
