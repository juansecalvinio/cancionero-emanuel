import React, { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  useToast,
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
import { ModalChangeTone } from "components/ModalChangeTone";

const songRepository = new SupabaseSongRepository();
const songService = new SongService(songRepository);

interface SongDetailsProps {
  song: Song;
}

export const SongDetails = ({ song }: SongDetailsProps) => {
  const toast = useToast();
  const router = useRouter();

  const [spinnerButton, setSpinnerButton] = useState<boolean>(false);
  const [isModalChangeTone, setIsModalChangeTone] = useState<boolean>(false);
  const [semitones, setSemitones] = useState<number>(0);
  const [tone, setTone] = useState<string>(song.tone);
  const [typeChords, setTypeChords] = useState<"american" | "spain">("spain");
  const [lyrics, setLyrics] = useState(
    parseLyricsToView(song.lyrics ? song.lyrics : "")
  );

  const handleOnBack = (e: MouseEvent<HTMLButtonElement>) => {
    if (song.tone !== tone) {
      e.preventDefault();
      setIsModalChangeTone(true);
    } else {
      router.push("/");
    }
  };

  const switchTypeChords = () => {
    setTypeChords((prevState) =>
      prevState === "american" ? "spain" : "american"
    );
  };

  const handleDownSemitone = () => {
    setSemitones((prevState) => prevState - 1);
    setTone(transposeChord({ chord: tone, semitones: -1, typeChords }));

    const trasposedChords = transposeSong({
      lyrics,
      semitones: -1,
      typeChords,
    });
    setLyrics(trasposedChords);
  };

  const handleUpSemitone = () => {
    setSemitones((prevState) => prevState + 1);
    setTone(transposeChord({ chord: tone, semitones: +1, typeChords }));

    const trasposedChords = transposeSong({
      lyrics,
      semitones: 1,
      typeChords,
    });
    setLyrics(trasposedChords);
  };

  const handleSaveTransposedSong = async () => {
    setSpinnerButton(true);
    const transposedLyrics = parseLyricsToSave(lyrics);
    const transposedTone = transposeChord({
      chord: song.tone,
      semitones,
      typeChords,
    });
    try {
      await songService.updateSong({
        ...song,
        tone: transposedTone,
        lyrics: transposedLyrics,
      });
      setSpinnerButton(false);
      setIsModalChangeTone(false);
      toast({
        title: `Se cambió la tonalidad de la canción a: ${tone}`,
        position: "bottom",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/");
    } catch (error) {
      setSpinnerButton(false);
      console.error(error);
      toast({
        title: `Ocurrió un error, intentá de nuevo en unos minutos`,
        position: "bottom",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const lyricsWithNewTypeChords = transposeSong({
      lyrics,
      semitones: 0,
      typeChords,
    });
    setLyrics(lyricsWithNewTypeChords);
  }, [typeChords]);

  return (
    <Container
      maxW="md"
      position={"relative"}
      placeContent="flex-start"
      h="100%"
      padding={"0 0 3rem 0"}
      display={"flex"}
      flexDirection={"column"}
      gap={"1rem"}
    >
      <Button
        colorScheme="teal"
        variant="link"
        size="sm"
        leftIcon={<ArrowBackIcon />}
        onClick={handleOnBack}
        mr={"auto"}
        mb={"0.5rem"}
      >
        Volver
      </Button>
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
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={100}
        >
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
          {/* <Button size={"xs"} onClick={switchTypeChords}>
            Cifrado
          </Button> */}
        </Box>
      </HeaderWrapper>
      <Divider />
      <ActionsWrapper
        bgColor={useColorModeValue("white", "gray.800")}
        borderTop={"2px solid"}
        borderTopColor={useColorModeValue("gray.200", "gray.600")}
        zIndex={10}
        px={4}
      >
        <Box
          maxW="md"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <ChangeToneWrapper>
            <Text fontSize={"0.85rem"} mb={1.5} fontWeight={"bold"}>
              Cambiar tonalidad:
            </Text>
            <Button
              colorScheme={"yellow"}
              size={"sm"}
              onClick={handleDownSemitone}
              mr={"1rem"}
            >
              -1
            </Button>
            <Button
              colorScheme={"yellow"}
              size={"sm"}
              onClick={handleUpSemitone}
            >
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
        </Box>
      </ActionsWrapper>
      <Box>
        {lyrics.map((line: any, i: any) => (
          <div
            key={i}
            style={{ marginBottom: line.lyrics === "" ? "2rem" : "0.25rem" }}
          >
            <pre
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontFamily: "monospace",
                fontWeight: "bold",
              }}
            >
              {line.chords.map((chord: any, j: any) => {
                const position = chord.position * 0.9;
                let marginLeft = position - 10;

                if (j === 0) {
                  marginLeft = position * 7;
                }

                if (j === 1) {
                  marginLeft = position * 4;
                }

                return (
                  <div
                    key={j}
                    style={{
                      display: "inline-block",
                      marginLeft: marginLeft + "px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.85rem",
                      }}
                    >
                      {chord.chord}
                    </span>
                  </div>
                );
              })}
            </pre>
            <p>{line.lyrics}</p>
          </div>
        ))}
      </Box>

      <ModalChangeTone
        isOpen={isModalChangeTone}
        isLoading={spinnerButton}
        tone={tone}
        onClose={() => router.push("/")}
        onSuccess={handleSaveTransposedSong}
      />
    </Container>
  );
};
