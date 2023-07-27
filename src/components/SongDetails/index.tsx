import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Heading,
  IconButton,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import { SongService } from "application/services/SongService";
import { Song } from "domain/entities/Song";
import { SupabaseSongRepository } from "infrastructure/db/SupabaseSongRepository";
import { parseLyricsToSave, parseLyricsToView } from "utils/parseLyrics";
import { transposeChord, transposeSong } from "utils/transposer";
import {
  ActionsWrapper,
  ChangeToneWrapper,
  HeaderWrapper,
  LinksWrapper,
  TitleWrapper,
} from "./styled";
import { toast } from "react-toastify";

const songRepository = new SupabaseSongRepository();
const songService = new SongService(songRepository);

interface SongDetailsProps {
  song: Song;
}

export const SongDetails = ({ song }: SongDetailsProps) => {
  const [semitones, setSemitones] = useState<number>(0);
  const [tone, setTone] = useState<string>(song.tone);
  const [lyrics, setLyrics] = useState(
    parseLyricsToView(song.lyrics ? song.lyrics : "")
  );

  const [spinnerButton, setSpinnerButton] = useState<boolean>(false);

  const handleDownSemitone = () => {
    setSemitones((prevState) => prevState - 1);
    setTone(transposeChord({ chord: tone, semitones: -1 }));

    const trasposedChords = transposeSong({
      lyrics,
      semitones: -1,
    });
    setLyrics(trasposedChords);
  };

  const handleUpSemitone = () => {
    setSemitones((prevState) => prevState + 1);
    setTone(transposeChord({ chord: tone, semitones: +1 }));

    const trasposedChords = transposeSong({
      lyrics,
      semitones: 1,
    });
    setLyrics(trasposedChords);
  };

  const handleSaveTransposedSong = async () => {
    setSpinnerButton(true);
    const transposedLyrics = parseLyricsToSave(lyrics);
    const transposedTone = transposeChord({ chord: song.tone, semitones });
    try {
      await songService.updateSong({
        ...song,
        tone: transposedTone,
        lyrics: transposedLyrics,
      });
      setSpinnerButton(false);
      toast.success(`Se cambió la tonalidad de la canción a: ${tone}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      setSpinnerButton(false);
      console.error(error);
      toast.error("Ocurrió un error, intentá de nuevo en unos minutos", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <Container
      maxW="md"
      placeContent="flex-start"
      h="100%"
      padding={"0"}
      display={"flex"}
      flexDirection={"column"}
      gap={"1rem"}
    >
      <Link href="/">
        <Button
          colorScheme="teal"
          variant="link"
          size="xs"
          leftIcon={<ArrowBackIcon />}
        >
          Volver
        </Button>
      </Link>
      <HeaderWrapper>
        <TitleWrapper>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {song.title}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            {song.artist}
          </Text>
          <Text fontSize={"0.85rem"}>
            Tonalidad de la canción: <strong>{tone}</strong>
          </Text>
        </TitleWrapper>
        <LinksWrapper>
          <Link
            href={song.url_youtube}
            display={song.url_youtube.length < 2 ? "none" : ""}
            isExternal
          >
            <IconButton
              disabled={song.url_youtube.length < 2}
              aria-label="youtube-link"
              flex={1}
              fontSize={"lg"}
              size="sm"
              rounded={"full"}
              bgColor={useColorModeValue("#EDF2F7", "red")}
              icon={<FaYoutube color={useColorModeValue("red", "white")} />}
              mr={"0.5rem"}
            />
          </Link>
          <Link
            href={song.url_spotify}
            display={song.url_spotify.length < 2 ? "none" : ""}
            isExternal
          >
            <IconButton
              disabled={song.url_spotify.length < 2}
              aria-label="spotify-link"
              flex={1}
              fontSize={"lg"}
              size="sm"
              rounded={"full"}
              colorScheme="teal"
              bgColor={useColorModeValue("#68D391", "teal")}
              icon={<FaSpotify color={useColorModeValue("black", "white")} />}
            />
          </Link>
        </LinksWrapper>
      </HeaderWrapper>
      <Divider />
      <ActionsWrapper>
        <ChangeToneWrapper>
          <Text fontSize={"0.85rem"} mb={1.5}>
            Cambiar tonalidad:
          </Text>
          <Button size={"sm"} onClick={handleDownSemitone} mr={"1rem"}>
            -1
          </Button>
          <Button size={"sm"} onClick={handleUpSemitone}>
            +1
          </Button>
        </ChangeToneWrapper>
        <Button
          colorScheme="teal"
          size={"sm"}
          onClick={handleSaveTransposedSong}
          isLoading={spinnerButton}
        >
          Guardar
        </Button>
      </ActionsWrapper>
      <div>
        {lyrics.map((line: any, i: any) => (
          <div
            key={i}
            style={{ marginBottom: line.lyrics === "" ? "3em" : "1em" }}
          >
            <pre style={{ fontFamily: "monospace", fontWeight: "bold" }}>
              {line.chords.map((chord: any, j: any) => (
                <span
                  key={j}
                  style={{
                    position: "relative",
                    left: chord.position * 0.6 + "ch",
                    fontSize: "1.25em",
                  }}
                >
                  {chord.chord}
                </span>
              ))}
            </pre>
            <p>{line.lyrics}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};
