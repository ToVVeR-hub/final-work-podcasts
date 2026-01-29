// ------------------------------
// Импорты
// ------------------------------

// Хуки
import { usePlayer } from "../../entities/player/model/usePlayer";

// Компоненты плеера
import PlayerControls from "./PlayerControls";
import PlayerFavorite from "./PlayerFavorite";
import PlayerProgress from "./PlayerProgress";
import VolumeControl from "./VolumeControl";

// Стили
import "./Player.css";

// ------------------------------
// Компонент
// ------------------------------

function Player() {
  const { currentTrack } = usePlayer();

  // Если нет текущего трека — плеер не отображается
  if (!currentTrack) {
    return null;
  }

  const cover = currentTrack.coverUrl ?? "img/cover-placeholder.png";

  return (
    <footer className="player" role="region" aria-label="Плеер">
      <div className="player__container">
        {/* Информация о треке */}
        <div className="player__info">
          <img
            className="player__cover"
            src={cover}
            alt={`Обложка трека ${currentTrack.title}`}
          />

          <div className="player__meta">
            <div className="player__title-row">
              <span className="player__title" title={currentTrack.title}>
                {currentTrack.title}
              </span>
              <PlayerFavorite />
            </div>
            <span className="player__artist" title={currentTrack.artist}>
              {currentTrack.artist}
            </span>
          </div>
        </div>

        {/* Управление воспроизведением */}
        <div className="player__controls">
          <PlayerControls />
        </div>

        {/* Прогресс */}
        <div className="player__progress">
          <PlayerProgress />
        </div>

        {/* Громкость */}
        <div className="player__volume">
          <VolumeControl />
        </div>
      </div>
    </footer>
  );
}

export default Player;
