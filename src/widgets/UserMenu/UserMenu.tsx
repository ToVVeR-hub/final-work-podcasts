// ------------------------------
// Импорты
// ------------------------------

// React
import { useState, useRef, useEffect } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Контексты и хуки
import { useAuthContext } from "../../app/provider/AuthProvider";
import { usePlayer } from "../../entities/player/model/usePlayer";

// Иконки
import { Chevron } from "../../shared/icons/Chevron";

// Стили
import "./UserMenu.css";

// ------------------------------
// Компонент
// ------------------------------

function UserMenu() {
  const navigate = useNavigate();
  const { username, logout } = useAuthContext();
  const { reset } = usePlayer();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Закрытие меню по клику вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="user-menu-wrapper">
      {/* Кнопка пользователя */}
      <button
        className={`user-menu ${open ? "user-menu--open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {/* Аватар */}
        <img
          className="user-menu__avatar"
          src="img/avatar-placeholder.png"
          alt="Аватар пользователя"
        />

        {/* Имя */}
        <span className="user-menu__name" title={username ?? "Пользователь"}>
          {username ?? "Пользователь"}
        </span>

        {/* Стрелка */}
        <Chevron className="user-menu__chevron" />
      </button>

      {/* Выпадающее меню */}
      <div
        className={`user-menu__dropdown ${open ? "user-menu__dropdown--open" : ""}`}
        role="menu"
        aria-hidden={!open}
      >
        <button
          className="user-menu__item"
          onClick={() => {
            navigate("/profile");
            setOpen(false);
          }}
          type="button"
          role="menuitem"
        >
          Профиль
        </button>

        <button
          className="user-menu__item user-menu__item--danger"
          onClick={() => {
            reset();
            logout();
            navigate("/login");
          }}
          type="button"
          role="menuitem"
        >
          Выйти
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
