// ------------------------------
// Импорты
// ------------------------------

// React
import { useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Контекст авторизации
import { useAuthContext } from "../../app/provider/AuthProvider";

// Стили
import "../../styles/auth-form.css";

// ------------------------------
// Компонент
// ------------------------------

function LoginPage() {
  const { login, loading, error } = useAuthContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (cleanUsername.length < 3) {
      setFormError("Имя пользователя должно быть не короче 3 символов");
      return;
    }

    if (cleanPassword.length < 6) {
      setFormError("Пароль должен быть не короче 6 символов");
      return;
    }

    setFormError(null);
    login(cleanUsername, cleanPassword);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h1 className="auth-form__title">Вход</h1>

      <input
        className="auth-form__input"
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setFormError(null);
        }}
        autoComplete="username"
        required
        minLength={3}
        aria-label="Имя пользователя"
      />

      <input
        className="auth-form__input"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setFormError(null);
        }}
        autoComplete="current-password"
        required
        minLength={6}
        aria-label="Пароль"
      />

      <button
        className="auth-form__button"
        type="submit"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Вход..." : "Войти"}
      </button>

      <button
        className="auth-form__link"
        type="button"
        onClick={() => navigate("/register")}
      >
        Зарегистрироваться
      </button>

      {formError && (
        <p className="auth-form__error" role="alert">
          {formError}
        </p>
      )}

      {error && (
        <p className="auth-form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default LoginPage;
