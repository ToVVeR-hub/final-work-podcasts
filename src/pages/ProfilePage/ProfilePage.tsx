// ------------------------------
// Импорты
// ------------------------------

// Хуки и контексты
import { useAuthContext } from "../../app/provider/AuthProvider";
import { usePlayer } from "../../entities/player/model/usePlayer";

// Стили
import "./ProfilePage.css";

// ------------------------------
// Компонент
// ------------------------------

function ProfilePage() {
  const { username, logout } = useAuthContext();
  const { reset } = usePlayer();

  const handleLogout = () => {
    reset();
    logout();
  };

  return (
    <div className="profile">
      <h1 className="profile__title">Профиль</h1>

      {/* Аватар */}
      <div className="profile__avatar">
        <img
          className="profile__img"
          src="img/avatar-placeholder2.png"
          alt="Аватар пользователя"
        />
      </div>

      {/* Имя пользователя */}
      <div className="profile__username-label">Имя пользователя</div>
      <div className="profile__username" title={username ?? "Пользователь"}>
        {username ?? "Пользователь"}
      </div>

      {/* Кнопка выхода */}
      <button
        className="profile__logout-button"
        onClick={handleLogout}
        type="button"
        aria-label="Выйти из аккаунта"
      >
        Выйти из аккаунта
      </button>
    </div>
  );
}

export default ProfilePage;
