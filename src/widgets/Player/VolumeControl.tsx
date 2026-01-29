// ------------------------------
// Импорты
// ------------------------------

import { useRef } from "react";

// Хуки
import { usePlayer } from "../../entities/player/model/usePlayer";

// Иконки
import { SpeakerIcon } from "../../shared/icons/SpeakerIcon";

// Стили
import "./VolumeControl.css";

// ------------------------------
// Компонент
// ------------------------------

function VolumeControl() {
  const { volume, setVolume } = usePlayer();
  const lastVolumeRef = useRef(volume || 1);

  const isMuted = volume === 0;
  const volumePercent = Math.round(volume * 100);

  const toggleMute = () => {
    if (isMuted) {
      setVolume(lastVolumeRef.current || 1);
    } else {
      lastVolumeRef.current = volume;
      setVolume(0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) / 100;
    setVolume(value);

    if (value > 0) {
      lastVolumeRef.current = value;
    }
  };

  return (
    <div className="volume-control">
      {/* Кнопка mute/unmute */}
      <button
        className={`volume-control__btn ${isMuted ? "volume-control__btn--muted" : ""}`}
        onClick={toggleMute}
        type="button"
        aria-label={isMuted ? "Включить звук" : "Выключить звук"}
        aria-pressed={isMuted}
      >
        <SpeakerIcon />
      </button>

      {/* Слайдер громкости */}
      <input
        type="range"
        min={0}
        max={100}
        value={volumePercent}
        step="any"
        onChange={handleChange}
        className="volume-control__slider"
        style={{ "--progress": `${volumePercent}%` } as React.CSSProperties}
        aria-label="Громкость"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={volumePercent}
        aria-valuetext={`${volumePercent}%`}
      />
    </div>
  );
}

export default VolumeControl;
