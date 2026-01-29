// ------------------------------
// Типы сущности Track
// ------------------------------

export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  size_mb: number;
  encoded_audio: string;

  album?: string;
  coverUrl?: string;
  createdAt?: string;
}
