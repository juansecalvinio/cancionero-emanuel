import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from "utils/mongoose"
import { SongServices } from 'utils/services'
import { Song } from "models/Song"

dbConnect()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case "POST":
      try {
        const songs = await SongServices.instance.getAll()
        return res.status(200).json({ data: songs })
      } catch (error) {
        return res.status(400).json({ data: [], error })
      }
    default:
      return res.status(400).json({ data: [] })
  }
}