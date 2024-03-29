import { NextApiRequest, NextApiResponse } from "next";
import { SupabaseSongRepository } from "infrastructure/db/SupabaseSongRepository";
import { SongService } from "application/services/SongService";

const songRepository = new SupabaseSongRepository();
const songService = new SongService(songRepository);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const songs = await songService.getAllSongs();
      return res.status(200).json(songs);
    }

    if (req.method === "POST") {
      const song = await songService.createSong(req.body);
      return res.status(201).json(song);
    }

    return res
      .setHeader("Allow", ["GET", "POST"])
      .status(405)
      .end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error?.message || "An error occurred" });
  }
}
