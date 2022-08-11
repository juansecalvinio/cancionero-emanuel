import mongoose, { Schema, model, models } from "mongoose"

const songSchema = new Schema({
  title: { type: String },
  author: { type: String },
  tone: { type: String },
  youtube_link: { type: String },
  spotify_link: { type: String },
  style: { type: String },
}, {
  timestamps: true,
  versionKey: false
})

export const Song = models.Song || model("Song", songSchema)