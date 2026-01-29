// ------------------------------
// Кэш для URL аудио-файлов
// ------------------------------
const audioCache = new Map<number, string>();

// ------------------------------
// Декодирование base64 → Blob URL
// ------------------------------
export function decodeAudioToUrl(
  trackId: number,
  encodedAudio: string,
): string {
  const cached = audioCache.get(trackId);
  if (cached) return cached;

  // Декодируем base64 → binary string
  const binary = atob(encodedAudio);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  // Создаём Blob и URL
  const blob = new Blob([bytes], { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);

  // Кэшируем
  audioCache.set(trackId, url);

  return url;
}
