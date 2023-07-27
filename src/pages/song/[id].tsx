import React from "react";
import { GetServerSideProps } from "next";
import { SongService } from "application/services/SongService";
import { SupabaseSongRepository } from "infrastructure/db/SupabaseSongRepository";
import { Song } from "domain/entities/Song";

import { SongDetails } from "components/SongDetails";

const songRepository = new SupabaseSongRepository();
const songService = new SongService(songRepository);

interface SongPageProps {
  song: Song;
}
export default function SongPage({ song }: SongPageProps) {
  return <SongDetails song={song} />;
}

export const getServerSideProps: GetServerSideProps<SongPageProps> = async (
  context
) => {
  const id = context.params?.id as string;
  const song = await songService.getSongById(id);

  return {
    props: {
      song,
    },
  };
};
