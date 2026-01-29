// ------------------------------
// Импорты
// ------------------------------

// Хуки
import { usePlayer } from "../../entities/player/model/usePlayer";

// Иконки
import { PauseIcon } from "../../shared/icons/PauseIcon";
import { PlayIcon } from "../../shared/icons/PlayIcon";
import { RepeatIcon } from "../../shared/icons/RepeatIcon";
import { ShuffleIcon } from "../../shared/icons/ShuffleIcon";
import { SkipBackIcon } from "../../shared/icons/SkipBackIcon";
import { SkipForwardIcon } from "../../shared/icons/SkipForwardIcon";

// Стили
import "./PlayerControls.css";

// ------------------------------
// Компонент
// ------------------------------

function PlayerControls() {
  const {
    isPlaying,
    toggle,
    next,
    prev,
    isShuffle,
    toggleShuffle,
    repeatMode,
    toggleRepeat,
  } = usePlayer();

  return (
    <div
      className="player-controls"
      role="toolbar"
      aria-label="Управление воспроизведением"
    >
      {/* Перемешивание */}
      <button
        className={`player-controls__btn ${isShuffle ? "player-controls__btn--active" : ""}`}
        onClick={toggleShuffle}
        type="button"
        aria-label="Перемешивание треков"
        aria-pressed={isShuffle}
      >
        <ShuffleIcon />
      </button>

      {/* Предыдущий трек */}
      <button
        className="player-controls__btn"
        onClick={prev}
        type="button"
        aria-label="Предыдущий трек"
      >
        <SkipBackIcon />
      </button>

      {/* Play / Pause */}
      <button
        className={`
          player-controls__btn 
          player-controls__btn--play 
          ${isPlaying ? "player-controls__btn--playing" : ""}
        `}
        onClick={toggle}
        type="button"
        aria-label={isPlaying ? "Пауза" : "Воспроизведение"}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Следующий трек */}
      <button
        className="player-controls__btn"
        onClick={next}
        type="button"
        aria-label="Следующий трек"
      >
        <SkipForwardIcon />
      </button>

      {/* Повтор */}
      <button
        className={`
          player-controls__btn 
          player-controls__btn--repeat 
          ${repeatMode !== "off" ? "player-controls__btn--active" : ""}
          ${repeatMode === "one" ? "player-controls__btn--repeat-one" : ""}
        `}
        onClick={toggleRepeat}
        type="button"
        aria-label={`Режим повтора: ${repeatMode === "off" ? "выключен" : repeatMode === "all" ? "все треки" : "один трек"}`}
        aria-pressed={repeatMode !== "off"}
      >
        <RepeatIcon />
      </button>
    </div>
  );
}

export default PlayerControls;
