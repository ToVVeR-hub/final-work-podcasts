// ------------------------------
// Импорты
// ------------------------------

// Иконки
import { DecorPlayIcon } from "../../shared/icons/DecorPlayIcon";

// Стили
import "./ModeSwitcher.css";

// ------------------------------
// Типы
// ------------------------------

export type ModeSwitcherMode = "all" | "favorites";

interface ModeSwitcherProps {
  mode: ModeSwitcherMode;
  onChangeMode: (mode: ModeSwitcherMode) => void;
}

// ------------------------------
// Компонент
// ------------------------------

function ModeSwitcher({ mode, onChangeMode }: ModeSwitcherProps) {
  return (
    <div
      className="mode-switcher"
      role="tablist"
      aria-label="Переключение режимов отображения"
    >
      {/* Все треки */}
      <button
        type="button"
        className={`mode-switcher__button ${
          mode === "all" ? "mode-switcher__button--active" : ""
        }`}
        onClick={() => onChangeMode("all")}
        role="tab"
        aria-selected={mode === "all"}
        aria-controls="tracks-all"
      >
        <DecorPlayIcon className="mode-switcher__icon" />
        <span>Аудиокомпозиции</span>
      </button>

      {/* Избранное */}
      <button
        type="button"
        className={`mode-switcher__button ${
          mode === "favorites" ? "mode-switcher__button--active" : ""
        }`}
        onClick={() => onChangeMode("favorites")}
        role="tab"
        aria-selected={mode === "favorites"}
        aria-controls="tracks-favorites"
      >
        <span>Избранное</span>
      </button>
    </div>
  );
}

export default ModeSwitcher;
