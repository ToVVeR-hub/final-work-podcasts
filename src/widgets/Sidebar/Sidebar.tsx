// ------------------------------
// Импорты
// ------------------------------

// Иконки
import { MusicNotes } from "../../shared/icons/MusicNotes";

// Стили
import "./Sidebar.css";

// ------------------------------
// Типы
// ------------------------------

type SidebarMode = "all" | "favorites";

interface SidebarProps {
  mode: SidebarMode;
  onChangeMode: (mode: SidebarMode) => void;
}

// ------------------------------
// Компонент
// ------------------------------

function Sidebar({ mode, onChangeMode }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Навигация по режимам">
      {/* Кнопки переключения режима */}
      <div className="sidebar__buttons">
        <button
          className={`sidebar__button ${
            mode === "favorites" ? "sidebar__button--active" : ""
          }`}
          onClick={() => onChangeMode("favorites")}
          type="button"
          aria-pressed={mode === "favorites"}
          aria-label="Перейти в избранное"
        >
          <MusicNotes className="sidebar__icon" />
          <span className="sidebar__text" title="Избранное">
            Избранное
          </span>
        </button>

        <button
          className={`sidebar__button ${
            mode === "all" ? "sidebar__button--active" : ""
          }`}
          onClick={() => onChangeMode("all")}
          type="button"
          aria-pressed={mode === "all"}
          aria-label="Перейти ко всем аудиокомпозициям"
        >
          <MusicNotes className="sidebar__icon" />
          <span className="sidebar__text" title="Аудиокомпозиции">
            Аудиокомпозиции
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
