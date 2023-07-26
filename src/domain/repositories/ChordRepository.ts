export interface Chord {
  id: string;
  song_id: string;
  lyrics: string;
  chords: string;
}

export interface ChordRepository {
  getAllChords(): Promise<Chord[]>;
  getChordsBySongId(song_id: string): Promise<Chord[]>;
  createChord(chord: Chord): Promise<void>;
  updateChord(chord: Chord): Promise<void>;
  deleteChord(id: string): Promise<void>;
}
