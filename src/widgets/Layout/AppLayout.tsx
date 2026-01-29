// ------------------------------
// Импорты
// ------------------------------

// React Router
import { Outlet, useSearchParams } from "react-router-dom";

// Компоненты
import Header from "../Header/Header";

// Контекст
import { TracksPageContext } from "../../pages/TracksPage/TracksPageContext";

// Глобальные стили
import "../../styles/layout.css";

// ------------------------------
// Типы
// ------------------------------

interface AppLayoutProps {
  showFullHeader?: boolean;
}

// ------------------------------
// Компонент
// ------------------------------

function AppLayout({ showFullHeader = true }: AppLayoutProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const setQuery = (value: string) => {
    setSearchParams((prev) => {
      prev.set("q", value);
      prev.set("page", "1");
      return prev;
    });
  };

  return (
    <TracksPageContext.Provider value={{ query, setQuery }}>
      <div className="layout-root">
        <div className="layout">
          <Header showFullHeader={showFullHeader} />

          <main className="layout__content">
            <Outlet />
          </main>
        </div>
      </div>
    </TracksPageContext.Provider>
  );
}

export default AppLayout;
