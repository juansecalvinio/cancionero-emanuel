import {
  Chord,
  ChordRepository,
} from "../../domain/repositories/ChordRepository";

export class ChordService {
  constructor(private chordRepository: ChordRepository) {}

  async getAllChords(): Promise<Chord[]> {
    return this.chordRepository.getAllChords();
  }

  async getChordsBySongId(song_id: string): Promise<Chord[]> {
    return this.chordRepository.getChordsBySongId(song_id);
  }

  async createChord(chord: Chord): Promise<void> {
    return this.chordRepository.createChord(chord);
  }

  async updateChord(chord: Chord): Promise<void> {
    return this.chordRepository.updateChord(chord);
  }

  async deleteChord(id: string): Promise<void> {
    return this.chordRepository.deleteChord(id);
  }
}
