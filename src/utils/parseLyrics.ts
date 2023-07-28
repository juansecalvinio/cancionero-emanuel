export function parseLyricsToView(text: string) {
  const lines = text.split("\n");

  const parsedLines = lines.map((line) => {
    if (line.trim() === "") {
      return { lyrics: "", chords: [] };
    }
    const chords: any[] = [];
    const lyrics = line
      .replace(/\[([^\]]+)\]/g, (match, p1, offset) => {
        chords.push({ chord: p1, position: offset });
        return "";
      })
      .trim();
    return { lyrics, chords };
  });
  console.log(
    "🚀 ~ file: parseLyrics.ts:17 ~ parsedLines ~ parsedLines:",
    parsedLines
  );

  return parsedLines;
}

export function parseLyricsToSave(lyrics: any[]): string {
  return lyrics
    .map((line) => {
      let lyrics = line.lyrics.split("");
      line.chords.forEach((chord: any) => {
        lyrics.splice(chord.position, 0, `[${chord.chord}]`);
      });
      return lyrics.join("");
    })
    .join("\n");
}
