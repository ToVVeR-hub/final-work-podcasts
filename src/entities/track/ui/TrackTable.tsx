// ------------------------------
// Импорты
// ------------------------------

// Компоненты
import TrackRow from "./TrackRow";

// Иконки
import { Calendar } from "../../../shared/icons/Calendar";
import { Clock } from "../../../shared/icons/Clock";

// Типы
import type { Track } from "../model/types";

// Стили
import "./TrackTable.css";
import "../../../styles/trackGrid.css";

// ------------------------------
// Типы пропсов
// ------------------------------

interface TrackTableProps {
  tracks: Track[];
  startIndex: number;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (track: Track) => void;
  onPlay: (track: Track) => void;
}

// ------------------------------
// Компонент
// ------------------------------

function TrackTable({
  tracks,
  startIndex,
  isFavorite,
  onToggleFavorite,
  onPlay,
}: TrackTableProps) {
  return (
    <section className="track-table" aria-label="Таблица треков">
      {/* Заголовок таблицы */}
      <div className="track-grid track-table__header">
        <div className="track-table__cell">№</div>
        <div className="track-table__cell">Название</div>
        <div className="track-table__cell">Альбом</div>
        <div className="track-table__cell">
          <Calendar aria-hidden="true" />
        </div>
        <div className="track-table__cell">
          <Clock aria-hidden="true" />
        </div>
      </div>

      {/* Строки треков */}
      {tracks.map((track, index) => (
        <TrackRow
          key={track.id}
          track={track}
          index={startIndex + index}
          isFavorite={isFavorite(track.id)}
          onToggleFavorite={onToggleFavorite}
          onPlay={onPlay}
        />
      ))}
    </section>
  );
}

export default TrackTable;
