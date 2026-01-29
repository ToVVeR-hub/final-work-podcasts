// ------------------------------
// Импорты
// ------------------------------

// React
import { useState } from "react";

// Компоненты
import { FavoriteButton } from "../../../features/favorites/ui/FavoriteButton";
import { TrackModal } from "./TrackModal";

// Иконки
import { PauseIcon } from "../../../shared/icons/PauseIcon";
import { PlayIcon } from "../../../shared/icons/PlayIcon";
import { MoreIcon } from "../../../shared/icons/MoreIcon";

// Хуки
import { usePlayer } from "../../../entities/player/model/usePlayer";

// Типы
import type { Track } from "../model/types";

// Стили
import "./TrackCard.css";

// ------------------------------
// Компонент
// ------------------------------

interface TrackCardProps {
  track: Track;
  isFavorite: boolean;
  onToggleFavorite: (track: Track) => void;
  onPlay: (track: Track) => void;
}

function TrackCard({
  track,
  isFavorite,
  onToggleFavorite,
  onPlay,
}: TrackCardProps) {
  const { currentTrack, isPlaying, toggle } = usePlayer();
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isCurrent = currentTrack?.id === track.id;
  const showOverlay = isActive || isCurrent;
  const cover = track.coverUrl ?? "img/cover-placeholder.png";

  return (
    <div
      className={`track-card ${isCurrent ? "track-card--active" : ""}`}
      role="article"
    >
      {/* Обложка с оверлеем */}
      <button
        className="track-card__cover"
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
            : `Воспроизвести ${track.title}`
        }
      >
        <img src={cover} alt={`Обложка трека ${track.title}`} />

        {showOverlay && (
          <div className="track-card__cover-overlay">
            {isCurrent && isPlaying ? (
              <PauseIcon className="track-card__icon" />
            ) : (
              <PlayIcon className="track-card__icon track-card__icon--size-plus" />
            )}
          </div>
        )}
      </button>

      {/* Название и артист */}
      <div className="track-card__text">
        <div className="track-card__title" title={track.title}>
          {track.title}
        </div>
        <div className="track-card__artist" title={track.artist}>
          {track.artist}
        </div>
      </div>

      {/* Кнопки */}
      <div className="track-card__buttons">
        <FavoriteButton
          track={track}
          isFavorite={isFavorite}
          onToggle={onToggleFavorite}
        />

        <button
          className="track-card__menu"
          aria-label="Открыть меню трека"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <MoreIcon className="track-card__menu-icon" />
        </button>
      </div>

      {isOpen && <TrackModal track={track} onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default TrackCard;
