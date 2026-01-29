// ------------------------------
// Импорты
// ------------------------------

// Компоненты
import { FavoriteButton } from "../../features/favorites/ui/FavoriteButton";

// Хуки
import { useFavorites } from "../../features/favorites/model/useFavorites";
import { usePlayer } from "../../entities/player/model/usePlayer";

// Типы
import type { Track } from "../../entities/track/model/types";

// ------------------------------
// Компонент
// ------------------------------

export default function PlayerFavorite() {
  const { currentTrack } = usePlayer();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  // Если нет текущего трека — ничего не рендерим
  if (!currentTrack) {
    return null;
  }

  const isTrackFavorite = isFavorite(currentTrack.id);

  const handleToggle = (track: Track) => {
    if (isTrackFavorite) {
      removeFromFavorites(track.id);
    } else {
      addToFavorites(track);
    }
  };

  return (
    <FavoriteButton
      track={currentTrack}
      isFavorite={isTrackFavorite}
      onToggle={handleToggle}
    />
  );
}
