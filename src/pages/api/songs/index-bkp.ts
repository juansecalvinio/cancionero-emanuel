import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import middleware from '../../../utils/middleware/database'
import { SongData } from '../../../types'

interface ResponseData {
  data?: SongData[],
  success: boolean
}

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req: any, res: any) => {
  try {
    // const song: SongData = {
    //   _id: {
    //     "$oid": "62eeab795b9a7e8b4298c001"
    //   },
    //   title: "A Jesús seguiré",
    //   author: "Hillsong",
    //   tone: "C",
    //   youtube_link: "https://youtu.be/e7ynpRCzaaQ",
    //   spotify_link: "https://open.spotify.com/track/3b8oTNrMJuKDgR4CSs6ygG?si=acc1e25445394354",
    //   style: "Rápida"
    // }
    const songs = await req.db.collection('song').findOne()
    res.status(200).json({ success: true, data: songs })
  } catch (error) {
    res.status(400).json({ success: false })
  }
})

export default handler