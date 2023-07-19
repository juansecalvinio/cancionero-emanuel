export class Song {
  id: string;
  title: string;
  artist: string;
  tone: string;
  url_youtube: string;
  url_spotify: string;
  style: string;

  constructor(
    id: string,
    title: string,
    artist: string,
    tone: string,
    url_youtube: string,
    url_spotify: string,
    style: string
  ) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.tone = tone;
    this.url_youtube = url_youtube;
    this.url_spotify = url_spotify;
    this.style = style;
  }
}
