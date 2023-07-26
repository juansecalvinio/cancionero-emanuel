import { NextApiRequest, NextApiResponse } from "next";
import { SupabaseSongRepository } from "infrastructure/db/SupabaseSongRepository";
import { SongService } from "application/services/SongService";

const songRepository = new SupabaseSongRepository();
const songService = new SongService(songRepository);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const song = await songService.getSongById(id as string);
      return res.status(200).json(song);
    }

    if (req.method === "PUT") {
      const song = await songService.updateSong({
        ...req.body,
        id: id as string,
      });
      return res.status(200).json(song);
    }

    if (req.method === "DELETE") {
      await songService.deleteSong(id as string);
      return res.status(204).end();
    }

    return res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error?.message || "An error occurred" });
  }
}
