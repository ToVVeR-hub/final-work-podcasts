// ------------------------------
// Импорты
// ------------------------------

// React & Router
import { useSearchParams } from "react-router-dom";

// Иконки Lucide
import { Loader2, AlertCircle, Music, SearchX, HeartCrack } from "lucide-react";

// Хуки и модели
import { useTracks } from "../../entities/track/model/useTracks";
import { useFavorites } from "../../features/favorites/model/useFavorites";
import { usePlayer } from "../../entities/player/model/usePlayer";
import { useIsMobile } from "./useIsMobile";

// Компоненты
import Sidebar from "../../widgets/Sidebar/Sidebar";
import TrackTable from "../../entities/track/ui/TrackTable";
import TrackCardList from "../../entities/track/ui/TrackCardList";
import Pagination from "../../shared/ui/Pagination";
import ModeSwitcher from "../../widgets/ModeSwitcher/ModeSwitcher";

// Типы
import type { Track } from "../../entities/track/model/types";

// Стили
import "./TracksPage.css";

// ------------------------------
// Константы
// ------------------------------
const PAGE_SIZE = 8;

type TrackViewMode = "all" | "favorites";

// ------------------------------
// Компонент
// ------------------------------
function TracksPage() {
  // ------------------------------
  // Параметры URL и режим отображения
  // ------------------------------
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get("mode") === "favorites" ? "favorites" : "all";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const query = searchParams.get("q") ?? "";

  const isMobile = useIsMobile(768);

  // ------------------------------
  // Данные с сервера и избранное
  // ------------------------------
  const { tracks, loading: tracksLoading, error: tracksError } = useTracks();

  const {
    favorites,
    loading: favoritesLoading,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  } = useFavorites();

  const { play, currentTrack } = usePlayer();

  // ------------------------------
  // Вычисляемые значения
  // ------------------------------
  const isLoading = tracksLoading || (mode === "favorites" && favoritesLoading);

  const sourceTracks = mode === "favorites" ? favorites : tracks;

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTracks = normalizedQuery
    ? sourceTracks.filter(
        (track) =>
          track.title.toLowerCase().includes(normalizedQuery) ||
          track.artist.toLowerCase().includes(normalizedQuery) ||
          (track.album?.toLowerCase().includes(normalizedQuery) ?? false),
      )
    : sourceTracks;

  const totalPages = Math.ceil(filteredTracks.length / PAGE_SIZE);

  const pagedTracks = filteredTracks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const startIndex = (page - 1) * PAGE_SIZE;

  const title = mode === "favorites" ? "Избранное" : "Аудиофайлы и треки";

  const isEmpty = !isLoading && !tracksError && filteredTracks.length === 0;

  // ------------------------------
  // Обработчики
  // ------------------------------
  const handlePlay = (track: Track) => {
    play(track, filteredTracks);
  };

  const toggleFavorite = (track: Track) => {
    if (isFavorite(track.id)) {
      removeFromFavorites(track.id);
    } else {
      addToFavorites(track);
    }
  };

  const setMode = (nextMode: TrackViewMode) => {
    setSearchParams({ mode: nextMode, page: "1" });
  };

  const setPage = (nextPage: number) => {
    setSearchParams({ mode, page: String(nextPage) });
  };

  // ------------------------------
  // Рендеринг
  // ------------------------------
  return (
    <div
      className={`tracks-page ${currentTrack ? "tracks-page--player-active" : ""}`}
    >
      <div className="tracks-page__body">
        <Sidebar mode={mode} onChangeMode={setMode} />

        <div className="tracks-page__content">
          <ModeSwitcher mode={mode} onChangeMode={setMode} />

          <h1 className="tracks-page__title">{title}</h1>

          {isLoading ? (
            <div className="tracks-page__state">
              <Loader2
                className="tracks-page__state-icon tracks-page__animate-spin"
                size={64}
              />
              <p className="tracks-page__state-text">Загрузка треков…</p>
            </div>
          ) : tracksError ? (
            <div className="tracks-page__state">
              <AlertCircle
                className="tracks-page__state-icon tracks-page__state-icon--error"
                size={64}
              />
              <p className="tracks-page__state-text tracks-page__state-text--error">
                {tracksError}
              </p>
            </div>
          ) : isEmpty ? (
            <div className="tracks-page__state">
              {query ? (
                <>
                  <SearchX className="tracks-page__state-icon" size={64} />
                  <p className="tracks-page__state-text">
                    Ничего не найдено по вашему запросу
                  </p>
                </>
              ) : mode === "favorites" ? (
                <>
                  <HeartCrack className="tracks-page__state-icon" size={64} />
                  <p className="tracks-page__state-text">
                    В избранном пока нет треков
                  </p>
                </>
              ) : (
                <>
                  <Music className="tracks-page__state-icon" size={64} />
                  <p className="tracks-page__state-text">Список треков пуст</p>
                </>
              )}
            </div>
          ) : (
            <>
              {isMobile ? (
                <TrackCardList
                  tracks={filteredTracks}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  onPlay={handlePlay}
                  mode={mode}
                />
              ) : (
                <>
                  <TrackTable
                    tracks={pagedTracks}
                    startIndex={startIndex}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                    onPlay={handlePlay}
                  />
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChange={setPage}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TracksPage;
