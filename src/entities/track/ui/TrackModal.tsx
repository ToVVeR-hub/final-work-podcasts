// ------------------------------
// Импорты
// ------------------------------

// React
import { useEffect, useRef, useState, useCallback } from "react";

// Иконки Lucide
import { XCircle } from "lucide-react";

// Компоненты
import { TrackInfoCard } from "./TrackInfoCard";

// Типы
import type { Track } from "../model/types";

// Стили
import "./TrackModal.css";

// ------------------------------
// Компонент
// ------------------------------

interface TrackModalProps {
  track: Track;
  onClose: () => void;
}

export function TrackModal({ track, onClose }: TrackModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  // Показ модалки после монтирования
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  // Закрытие по Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  // Блокировка скролла + компенсация скроллбара
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  // Фокус на первом элементе + возврат фокуса при закрытии
  useEffect(() => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;

    const firstFocusable = contentRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    firstFocusable?.focus();

    return () => {
      lastFocusedElementRef.current?.focus();
    };
  }, []);

  // Фокус-трап (циклический фокус внутри модалки)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !contentRef.current) return;

      const focusables = Array.from(
        contentRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`modal ${isVisible ? "modal--visible" : ""}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal__content"
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          className="modal__close"
          onClick={handleClose}
          type="button"
          aria-label="Закрыть модальное окно"
        >
          <XCircle />
        </button>

        {/* Содержимое */}
        <TrackInfoCard track={track} />
      </div>
    </div>
  );
}
