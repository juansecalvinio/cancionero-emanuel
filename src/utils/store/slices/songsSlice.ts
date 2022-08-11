import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "utils/store"

interface SongsState {
  songs: any,
}

const initialState: SongsState = {
  songs: [],
} 

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fillSongs: (state, action: PayloadAction<any>) => {
      state.songs = action.payload
    },
    clearSongs: (state) => {
      state.songs = []
    },
  }
})

export const { clearSongs, fillSongs } = songsSlice.actions

export const selectSongs = (state: RootState) => state.songs.songs

export default songsSlice.reducer