import { Song, SongRepository } from "../../domain/repositories/SongRepository";

export class SongService {
  constructor(private songRepository: SongRepository) {}

  async getAllSongs(): Promise<Song[]> {
    return this.songRepository.getAllSongs();
  }

  async getSongById(id: string): Promise<Song> {
    return this.songRepository.getSongById(id);
  }

  async createSong(song: Song): Promise<Song> {
    return this.songRepository.createSong(song);
  }

  async updateSong(song: Song): Promise<Song> {
    return this.songRepository.updateSong(song);
  }

  async deleteSong(id: string): Promise<void> {
    return this.songRepository.deleteSong(id);
  }
}
