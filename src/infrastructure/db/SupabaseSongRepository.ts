import { SongRepository, Song } from "../../domain/repositories/SongRepository";
import { supabase } from "../../utils/supabase";

export class SupabaseSongRepository implements SongRepository {
  async getAllSongs(): Promise<Song[]> {
    const { data, error } = await supabase.from("songs").select("*");
    if (error) throw error;
    return data as Song[];
  }

  async getSongById(id: string): Promise<Song> {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("id", id);
    if (error) throw error;
    if (!data) throw "No se encontraron datos";
    return data[0] as Song;
  }

  async createSong(song: Song): Promise<void> {
    const { error } = await supabase.from("songs").insert(song);
    if (error) throw error;
  }

  async updateSong(song: Song): Promise<void> {
    const { error } = await supabase
      .from("songs")
      .update(song)
      .eq("id", song.id);
    if (error) throw error;
  }

  async deleteSong(id: string): Promise<void> {
    const { error } = await supabase.from("songs").delete().eq("id", id);
    if (error) throw error;
  }
}
