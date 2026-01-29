// ------------------------------
// Импорты
// ------------------------------

import type { CSSProperties } from "react";

// Хуки
import { usePlayer } from "../../entities/player/model/usePlayer";

// Стили
import "./PlayerProgress.css";

// ------------------------------
// Утилиты
// ------------------------------

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

// ------------------------------
// Компонент
// ------------------------------

function PlayerProgress() {
  const { currentTime, duration, seek } = usePlayer();

  // Прогресс в процентах
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Стиль для кастомного прогресс-бара через CSS-переменную
  const sliderStyle: CSSProperties & { "--progress": string } = {
    "--progress": `${progress}%`,
  };

  return (
    <div className="player-progress">
      {/* Текущее время */}
      <span className="player-progress__time">{formatTime(currentTime)}</span>

      {/* Слайдер прогресса */}
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        step="any" // позволяет точное перемещение
        onChange={(e) => seek(Number(e.target.value))}
        className="player-progress__slider"
        style={sliderStyle}
        aria-label="Прогресс воспроизведения"
        aria-valuemin={0}
        aria-valuemax={duration || 0}
        aria-valuenow={currentTime}
        aria-valuetext={`${formatTime(currentTime)} из ${formatTime(duration)}`}
      />

      {/* Общая длительность */}
      <span className="player-progress__time">{formatTime(duration)}</span>
    </div>
  );
}

export default PlayerProgress;
