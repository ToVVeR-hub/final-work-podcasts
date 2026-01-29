// ------------------------------
// Импорты
// ------------------------------

// Иконки Lucide
import { ChevronLeft, ChevronRight } from "lucide-react";

// Стили
import "./Pagination.css";

// ------------------------------
// Типы
// ------------------------------

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// ------------------------------
// Утилита для видимых страниц
// ------------------------------

function getVisiblePages(current: number, total: number): number[] {
  const MAX_VISIBLE = 5;
  const half = Math.floor(MAX_VISIBLE / 2);

  let start = Math.max(1, current - half);
  const end = Math.min(total, start + MAX_VISIBLE - 1);
  start = Math.max(1, end - MAX_VISIBLE + 1);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// ------------------------------
// Компонент
// ------------------------------

function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <nav className="pagination" aria-label="Навигация по страницам">
      {/* Предыдущая страница */}
      <button
        className="pagination__button pagination__button--nav"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Предыдущая страница"
        aria-disabled={page === 1}
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      {/* Страницы */}
      {visiblePages.map((p) => (
        <button
          key={p}
          className={`pagination__button ${
            p === page ? "pagination__button--active" : ""
          }`}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          aria-label={`Страница ${p}`}
        >
          {p}
        </button>
      ))}

      {/* Следующая страница */}
      <button
        className="pagination__button pagination__button--nav"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Следующая страница"
        aria-disabled={page === totalPages}
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>
    </nav>
  );
}

export default Pagination;
