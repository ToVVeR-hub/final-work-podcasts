// ------------------------------
// Импорты
// ------------------------------

// Типы
import type { Track } from "../../../entities/track/model/types";

// Иконки
import { HeartIcon } from "../../../shared/icons/HeartIcon";

// Стили
import "./FavoriteButton.css";

// ------------------------------
// Типы пропсов
// ------------------------------

interface FavoriteButtonProps {
  track: Track;
  isFavorite: boolean;
  onToggle: (track: Track) => void;
}

// ------------------------------
// Компонент
// ------------------------------

export function FavoriteButton({
  track,
  isFavorite,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <button
      className={`favorite-button ${isFavorite ? "favorite-button--active" : ""}`}
      type="button"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      onClick={() => onToggle(track)}
    >
      <HeartIcon
        className="favorite-button__icon"
        aria-hidden="true"
      />
    </button>
  );
}
