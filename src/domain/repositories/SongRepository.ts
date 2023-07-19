export interface Song {
  id: string;
  title: string;
  artist: string;
  tone: string;
  url_youtube: string;
  url_spotify: string;
  style: string;
}

export interface SongRepository {
  getAllSongs(): Promise<Song[]>;
  getSongById(id: string): Promise<Song>;
  createSong(song: Song): Promise<Song>;
  updateSong(song: Song): Promise<Song>;
  deleteSong(id: string): Promise<void>;
}
