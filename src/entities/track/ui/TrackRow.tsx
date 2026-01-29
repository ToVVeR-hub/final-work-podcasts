// ------------------------------
// Импорты
// ------------------------------

// React
import { useState } from "react";

// Компоненты
import { FavoriteButton } from "../../../features/favorites/ui/FavoriteButton";
import { TrackModal } from "./TrackModal";

// Хуки
import { usePlayer } from "../../../entities/player/model/usePlayer";

// Иконки
import { PauseIcon } from "../../../shared/icons/PauseIcon";
import { PlayIcon } from "../../../shared/icons/PlayIcon";
import { MoreIcon } from "../../../shared/icons/MoreIcon";

// Типы
import type { Track } from "../model/types";

// Стили
import "./TrackRow.css";
import "../../../styles/trackGrid.css";

// ------------------------------
// Утилиты
// ------------------------------

function formatDuration(durationInMinutes: number): string {
  const totalSeconds = Math.floor(durationInMinutes * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatDate(date?: string): string {
  if (!date) return "-";

  const days = Math.floor(
    (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24),
  );

  return `${days} ${days === 1 ? "день" : "дней"} назад`;
}

// ------------------------------
// Компонент
// ------------------------------

type TrackRowProps = {
  track: Track;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (track: Track) => void;
  onPlay: (track: Track) => void;
};

function TrackRow({
  track,
  index,
  isFavorite,
  onToggleFavorite,
  onPlay,
}: TrackRowProps) {
  const { currentTrack, isPlaying, toggle } = usePlayer();
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isCurrent = currentTrack?.id === track.id;
  const showOverlay = isActive || isCurrent;

  const cover = track.coverUrl ?? "img/cover-placeholder.png";

  return (
    <div
      className={`track-row track-grid ${isCurrent ? "track-row--active" : ""}`}
      role="row"
    >
      {/* № */}
      <div className="track-row__index">{index + 1}</div>

      {/* Основная часть: обложка + название + артист */}
      <div className="track-row__main">
        {/* Обложка с оверлеем */}
        <button
          className="track-row__cover"
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          onClick={() => (isCurrent ? toggle() : onPlay(track))}
          type="button"
          aria-label={
            isCurrent
              ? isPlaying
                ? "Пауза"
                : "Воспроизвести"
              : "Воспроизвести трек"
          }
        >
          <img src={cover} alt={`Обложка ${track.title}`} />

          {showOverlay && (
            <div className="track-row__cover-overlay">
              {isCurrent && isPlaying ? (
                <PauseIcon className="track-row__icon" />
              ) : (
                <PlayIcon className="track-row__icon track-row__icon--size-plus" />
              )}
            </div>
          )}
        </button>

        {/* Название и артист */}
        <div className="track-row__text">
          <div className="track-row__title" title={track.title}>
            {track.title}
          </div>
          <small className="track-row__artist" title={track.artist}>
            {track.artist}
          </small>
        </div>
      </div>

      {/* Альбом */}
      <div className="track-row__album" title={track.album ?? "-"}>
        {track.album ?? "-"}
      </div>

      {/* Дата + Избранное */}
      <div className="track-row__date">
        <span className="track-row__date-text" title={track.createdAt}>
          {formatDate(track.createdAt)}
        </span>

        <FavoriteButton
          track={track}
          isFavorite={isFavorite}
          onToggle={onToggleFavorite}
        />
      </div>

      {/* Длительность + Меню */}
      <div className="track-row__controls">
        <span className="track-row__duration">
          {formatDuration(track.duration)}
        </span>

        <button
          className="track-row__menu"
          aria-label="Открыть меню трека"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <MoreIcon className="track-row__icon" />
        </button>
      </div>

      {isOpen && <TrackModal track={track} onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default TrackRow;
