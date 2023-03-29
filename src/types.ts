export type StyleSong = "Rápida" | "Lenta" | "Intermedia";
export interface SongData {
  id: number;
  title: string;
  artist: string;
  tone: string;
  urlYoutube: string;
  urlSpotify: string;
  style: StyleSong;
}

export type UpsertSongData = Omit<SongData, "id">;
