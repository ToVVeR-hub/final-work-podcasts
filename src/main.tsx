// ------------------------------
// Импорты
// ------------------------------
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Компоненты и провайдеры
import App from "./app/App";
import { AuthProvider } from "./app/provider/AuthProvider";

// Глобальные стили
import "./styles/base.css";

// ------------------------------
// Рендеринг приложения
// ------------------------------
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
