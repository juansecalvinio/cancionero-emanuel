export class Chord {
  id: string;
  song_id: string;
  lyrics: string;
  chords: string;

  constructor(id: string, song_id: string, lyrics: string, chords: string) {
    this.id = id;
    this.song_id = song_id;
    this.lyrics = lyrics;
    this.chords = chords;
  }
}
