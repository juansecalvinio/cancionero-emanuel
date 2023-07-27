type TransposeChordProps = {
  chord: string;
  semitones: number;
};

type TransposeSongProps = {
  lyrics: any[];
  semitones: number;
};

const chordMap = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
  "Cm",
  "C#m",
  "Dm",
  "D#m",
  "Em",
  "Fm",
  "F#m",
  "Gm",
  "G#m",
  "Am",
  "A#m",
  "Bm",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
  "Cm",
  "C#m",
  "Dm",
  "D#m",
  "Em",
  "Fm",
  "F#m",
  "Gm",
  "G#m",
  "Am",
  "A#m",
  "Bm",
];

export function transposeChord({ chord, semitones }: TransposeChordProps) {
  const index = chordMap.indexOf(chord);

  if (index === -1) {
    throw new Error(`Invalid chord: ${chord}`);
  }

  const newIndex = (index + semitones + chordMap.length) % chordMap.length;
  return chordMap[newIndex];
}

export function transposeSong({ lyrics, semitones }: TransposeSongProps) {
  return lyrics.map((line: any) => ({
    ...line,
    chords: line.chords.map((chord: any) => ({
      ...chord,
      chord: transposeChord({ chord: chord.chord, semitones }),
    })),
  }));
}
