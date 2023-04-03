export type StyleSong = "Rápida" | "Lenta" | "Intermedia";
export interface SongData {
  id: number;
  title: string;
  artist: string;
  tone: string;
  style: StyleSong;
  url_youtube: string;
  url_spotify: string;
}

export type UpsertSongData = Omit<SongData, "id">;
