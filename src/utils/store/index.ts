import { configureStore } from '@reduxjs/toolkit'
import { mainSlice, songsSlice } from "./slices"

export const store = configureStore({
  reducer: {
    main: mainSlice,
    songs: songsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch