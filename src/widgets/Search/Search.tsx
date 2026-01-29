// ------------------------------
// Импорты
// ------------------------------

// React
import { useContext, useRef } from "react";

// Контекст
import { TracksPageContext } from "../../pages/TracksPage/TracksPageContext";

// Иконки
import { SearchIcon } from "../../shared/icons/SearchIcon";

// Стили
import "./Search.css";

// ------------------------------
// Компонент
// ------------------------------

export const Search = () => {
  const context = useContext(TracksPageContext);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!context) {
    return null;
  }

  const { query, setQuery } = context;

  return (
    <div
      className="search"
      onClick={() => inputRef.current?.focus()}
      role="search"
      aria-label="Поиск треков"
    >
      <SearchIcon className="search__icon" />

      <input
        ref={inputRef}
        className="search__input"
        type="search"
        placeholder="ЧТО БУДЕМ ИСКАТЬ?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Поиск по названию, артисту или альбому"
      />
    </div>
  );
};
