export interface SongData {
  _id: {},
  title: string,
  author: string,
  tone: string,
  youtube_link: string,
  spotify_link: string,
  style: StyleSong
}

export type NewSongData = Omit<SongData, "_id">

export interface UpdateSongData {
  title?: string,
  author?: string,
  tone?: string,
  youtube_link?: string,
  spotify_link?: string,
  style?: StyleSong
}

export type StyleSong = "Rápida" | "Lenta";