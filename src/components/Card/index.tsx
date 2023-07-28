import React, { useState } from "react";
import LinkNext from "next/link";
import {
  Badge,
  Box,
  IconButton,
  Center,
  Link,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import { Song } from "domain/entities/Song";

type CardProps = {
  data: Song;
  onEdit: (data: Song) => void;
  onDelete: (id: string) => void;
};

const Card: React.FC<CardProps> = ({ data, onDelete, onEdit }) => {
  const [isYouTubeHovered, setIsYouTubeHovered] = useState<boolean>(false);
  const [isSpotifyHovered, setIsSpotifyHovered] = useState<boolean>(false);

  const getColorBadge = (songStyle: string) => {
    if (!songStyle || typeof songStyle === "undefined") return "";
    if (songStyle.toLowerCase() === "rápida") return "green";
    if (songStyle.toLowerCase() === "intermedia") return "yellow";
    if (songStyle.toLowerCase() === "lenta") return "red";
  };

  return (
    <Center py={3}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        borderColor={"borderColor"}
        borderWidth={"1px"}
        boxShadow={"0 12px 20px 6px rgb(104 112 118 / 0.08)"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <LinkNext href={`/song/${data.id}`}>
          <a>
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {data.title}
            </Heading>
          </a>
        </LinkNext>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {data.artist}
        </Text>
        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            fontWeight={"400"}
            colorScheme={getColorBadge(data.style)}
          >
            <strong>{data.style}</strong>
          </Badge>
          <Badge px={2} py={1} fontWeight={"400"}>
            TONALIDAD: <strong>{data.tone}</strong>
          </Badge>
        </Stack>
        <Stack
          mt={8}
          direction={"row"}
          align={"center"}
          justify={"center"}
          spacing={4}
        >
          <IconButton
            icon={<EditIcon />}
            onClick={() => onEdit(data)}
            aria-label="editar"
          />
          <Link
            href={data.url_youtube}
            display={data.url_youtube.length < 2 ? "none" : ""}
            isExternal
          >
            <IconButton
              disabled={data.url_youtube.length < 2}
              aria-label="youtube-link"
              flex={1}
              fontSize={"lg"}
              size="lg"
              rounded={"full"}
              colorScheme="red"
              bgColor={isYouTubeHovered ? "red.200" : "red.500"}
              icon={<FaYoutube color={"#EDF2F7"} />}
              onMouseEnter={() => setIsYouTubeHovered(true)}
              onMouseLeave={() => setIsYouTubeHovered(false)}
            />
          </Link>
          <Link
            href={data.url_spotify}
            display={data.url_spotify.length < 2 ? "none" : ""}
            isExternal
          >
            <IconButton
              disabled={data.url_spotify.length < 2}
              aria-label="spotify-link"
              flex={1}
              fontSize={"lg"}
              size="lg"
              rounded={"full"}
              colorScheme="teal"
              bgColor={useColorModeValue("#68D391", "teal")}
              icon={
                <FaSpotify
                  color={
                    isSpotifyHovered
                      ? "#EDF2F7"
                      : useColorModeValue("black", "#EDF2F7")
                  }
                />
              }
              onMouseEnter={() => setIsSpotifyHovered(true)}
              onMouseLeave={() => setIsSpotifyHovered(false)}
            />
          </Link>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => onDelete(data.id)}
            aria-label="eliminar"
          />
        </Stack>
      </Box>
    </Center>
  );
};

export default Card;
