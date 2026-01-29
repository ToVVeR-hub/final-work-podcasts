// ------------------------------
// Импорты
// ------------------------------

// React Router
import { Link } from "react-router-dom";

// Компоненты
import { Search } from "../Search/Search";
import UserMenu from "../UserMenu/UserMenu";

// Стили
import "./Header.css";

// ------------------------------
// Типы
// ------------------------------

interface HeaderProps {
  /** Показывать поиск и меню пользователя */
  showFullHeader?: boolean;
}

// ------------------------------
// Компонент
// ------------------------------

function Header({ showFullHeader = true }: HeaderProps) {
  return (
    <header className="header">
      {/* Логотип */}
      <div className="header__logo">
        <Link to="/tracks" aria-label="На главную страницу">
          <picture>
            <source srcSet="img/logo-mobile.png" media="(max-width: 768px)" />
            <img src="img/logo.png" alt="VibeCast Studio" />
          </picture>
        </Link>
      </div>

      {/* Поиск */}
      {showFullHeader && (
        <div className="header__search-wrapper">
          <Search />
        </div>
      )}

      {/* Меню пользователя */}
      {showFullHeader && (
        <div className="header__user">
          <UserMenu />
        </div>
      )}
    </header>
  );
}

export default Header;
