import {
  Chord,
  ChordRepository,
} from "../../domain/repositories/ChordRepository";
import { supabase } from "../../utils/supabase";

export class SupabaseChordRepository implements ChordRepository {
  async getAllChords(): Promise<Chord[]> {
    const { data, error } = await supabase.from("chords").select("*");
    if (error) throw error;
    return data as Chord[];
  }

  async getChordsBySongId(song_id: string): Promise<Chord[]> {
    const { data, error } = await supabase
      .from("chords")
      .select("*")
      .eq("song_id", song_id);
    if (error) throw error;
    return data as Chord[];
  }

  async createChord(chord: Chord): Promise<void> {
    const { error } = await supabase.from("chords").insert(chord);
    if (error) throw error;
  }

  async updateChord(chord: Chord): Promise<void> {
    const { error } = await supabase
      .from("chords")
      .update(chord)
      .eq("id", chord.id);
    if (error) throw error;
  }

  async deleteChord(id: string): Promise<void> {
    const { error } = await supabase.from("chords").delete().eq("id", id);
    if (error) throw error;
  }
}
