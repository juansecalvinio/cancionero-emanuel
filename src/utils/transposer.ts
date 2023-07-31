type TransposeChordProps = {
  chord: string;
  semitones: number;
  typeChords: "american" | "spain";
};

type TransposeSongProps = {
  lyrics: any[];
  semitones: number;
  typeChords: "american" | "spain";
};

const spainChords = [
  "DO",
  "DO#",
  "RE",
  "RE#",
  "MI",
  "FA",
  "FA#",
  "SOL",
  "SOL#",
  "LA",
  "LA#",
  "SI",
  "DOm",
  "DO#m",
  "REm",
  "RE#m",
  "MIm",
  "FAm",
  "FA#m",
  "SOLm",
  "SOL#m",
  "LAm",
  "LA#m",
  "SIm",
  "DO",
  "DO#",
  "RE",
  "RE#",
  "MI",
  "FA",
  "FA#",
  "SOL",
  "SOL#",
  "LA",
  "LA#",
  "SI",
  "DOm",
  "DO#m",
  "REm",
  "RE#m",
  "MIm",
  "FAm",
  "FA#m",
  "SOLm",
  "SOL#m",
  "LAm",
  "LA#m",
  "SIm",
];

const americanChords = [
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

export function transposeChord({
  chord,
  semitones,
  typeChords,
}: TransposeChordProps) {
  let temporalChord = chord;
  const chords = typeChords === "american" ? americanChords : spainChords;
  let index = chords.indexOf(temporalChord);

  if (!americanChords.includes(temporalChord)) {
    index = spainChords.indexOf(temporalChord);
  }

  if (!spainChords.includes(temporalChord)) {
    index = americanChords.indexOf(temporalChord);
  }

  if (index === -1) {
    throw new Error(`Invalid chord: ${temporalChord}`);
  }

  const newIndex = (index + semitones + chords.length) % chords.length;
  let newChord = chords[newIndex];

  if (
    chord.includes("m") &&
    !newChord.includes("m") &&
    !newChord.includes("#")
  ) {
    newChord += "m";
  }

  if (!chord.includes("m") && newChord.includes("m")) {
    newChord = newChord.replace("m", "");
  }

  return newChord;
}

export function transposeSong({
  lyrics,
  semitones,
  typeChords,
}: TransposeSongProps) {
  return lyrics.map((line: any) => ({
    ...line,
    chords: line.chords.map((chord: any) => ({
      ...chord,
      chord: transposeChord({ chord: chord.chord, semitones, typeChords }),
    })),
  }));
}
