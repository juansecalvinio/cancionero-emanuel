export interface Song {
  id: string;
  title: string;
  artist: string;
  tone: string;
  url_youtube: string;
  url_spotify: string;
  style: string;
  lyrics: string;
}

export interface SongRepository {
  getAllSongs(): Promise<Song[]>;
  getSongById(id: string): Promise<Song>;
  createSong(song: Song): Promise<void>;
  updateSong(song: Song): Promise<void>;
  deleteSong(id: string): Promise<void>;
}
