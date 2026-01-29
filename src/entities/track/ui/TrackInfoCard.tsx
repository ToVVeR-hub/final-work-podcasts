// ------------------------------
// Импорты
// ------------------------------

// Хуки
import { usePlayer } from "../../player/model/usePlayer";
import { useFavorites } from "../../../features/favorites/model/useFavorites";

// Компоненты
import { FavoriteButton } from "../../../features/favorites/ui/FavoriteButton";

// Иконки
import { PlayIcon } from "../../../shared/icons/PlayIcon";
import { PauseIcon } from "../../../shared/icons/PauseIcon";

// Типы
import type { Track } from "../model/types";

// Стили
import "./TrackInfoCard.css";

// ------------------------------
// Утилиты
// ------------------------------

function formatDuration(durationInMinutes: number): string {
  const totalSeconds = Math.floor(durationInMinutes * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// ------------------------------
// Компонент
// ------------------------------

interface TrackInfoCardProps {
  track: Track;
}

export function TrackInfoCard({ track }: TrackInfoCardProps) {
  const { currentTrack, isPlaying, play, toggle } = usePlayer();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const isCurrent = currentTrack?.id === track.id;
  const isTrackFavorite = isFavorite(track.id);

  const handlePlay = () => {
    if (isCurrent) {
      toggle();
    } else {
      play(track);
    }
  };

  const cover = track.coverUrl ?? "img/cover-placeholder-2x.png";

  return (
    <div className="track-info-card">
      {/* Обложка */}
      <img
        className="track-info-card__cover"
        src={cover}
        alt={`Обложка трека ${track.title}`}
      />

      {/* Основная информация */}
      <div className="track-info-card__body">
        <h2 className="track-info-card__title" title={track.title}>
          {track.title}
        </h2>

        <p className="track-info-card__artist" title={track.artist}>
          {track.artist}
        </p>

        <div className="track-info-card__meta">
          Длительность: {formatDuration(track.duration)}
        </div>

        {/* Кнопки управления */}
        <div className="track-info-card__button-wrapper">
          <button
            className="track-info-card__play-button"
            onClick={handlePlay}
            type="button"
            aria-label={isCurrent && isPlaying ? "Пауза" : "Воспроизвести трек"}
          >
            {isCurrent && isPlaying ? (
              <>
                <PauseIcon className="track-info-card__play-icon" />
                <span>Пауза</span>
              </>
            ) : (
              <>
                <PlayIcon className="track-info-card__play-icon" />
                <span>Воспроизвести</span>
              </>
            )}
          </button>

          <FavoriteButton
            track={track}
            isFavorite={isTrackFavorite}
            onToggle={() =>
              isTrackFavorite
                ? removeFromFavorites(track.id)
                : addToFavorites(track)
            }
          />
        </div>
      </div>
    </div>
  );
}
