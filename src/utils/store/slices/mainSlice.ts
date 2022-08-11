import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "utils/store"

interface MainState {
  fetching: boolean,
}

const initialState: MainState = {
  fetching: false,
} 

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    fetchingOn: (state) => {
      state.fetching = true
    },
    fetchingOff: (state) => {
      state.fetching = false
    },
  }
})

export const { fetchingOn, fetchingOff } = mainSlice.actions

export const selectFetching = (state: RootState) => state.main.fetching

export default mainSlice.reducer