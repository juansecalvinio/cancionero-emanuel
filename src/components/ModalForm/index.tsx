import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { SupabaseSongRepository } from "infrastructure/db/SupabaseSongRepository";
import { SongService } from "application/services/SongService";
import { Song } from "domain/entities/Song";

const songRepository = new SupabaseSongRepository();
const songService = new SongService(songRepository);

type ModalProps = {
  isOpen: boolean;
  dataToEdit?: Song;
  onClose: () => void;
  onSuccess: (isNewSong: boolean) => void;
};

export const ModalForm: React.FC<ModalProps> = ({
  isOpen = false,
  dataToEdit,
  onClose,
  onSuccess,
}) => {
  const [songUuid, setSongUuid] = useState<string>("");
  const [songTitle, setSongTitle] = useState<string>("");
  const [songTitleError, setSongTitleError] = useState<string>("");
  const [songArtist, setSongArtist] = useState<string>("");
  const [songTone, setSongTone] = useState<string>("");
  const [songStyle, setSongStyle] = useState<string>("");
  const [songYoutube, setSongYoutube] = useState<string>("");
  const [songSpotify, setSongSpotify] = useState<string>("");
  const [songLyrics, setSongLyrics] = useState<string>("");

  const [spinnerButton, setSpinnerButton] = useState<boolean>(false);

  const isEditable = typeof dataToEdit !== "undefined" ? true : false;

  const resetFields = () => {
    setSongUuid(uuidv4());
    setSongTitle("");
    setSongArtist("");
    setSongTone("");
    setSongStyle("");
    setSongYoutube("");
    setSongSpotify("");
    setSongLyrics("");
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setSongTitle(event.target.value);
  };

  const validateSongTitle = (value: string) => {
    if (value === "") {
      setSongTitleError("El título de la canción no puede estar vacío");
      return false;
    } else {
      setSongTitleError("");
      return true;
    }
  };

  const handleBlurTitle = (event: ChangeEvent<HTMLInputElement>) => {
    validateSongTitle(event.target.value);
  };

  const handleChangeArtist = (event: ChangeEvent<HTMLInputElement>) => {
    setSongArtist(event.target.value);
  };

  const handleSelectTone = (event: ChangeEvent<HTMLSelectElement>) => {
    setSongTone(event.target.value.toUpperCase());
  };

  const handleSelectStyle = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSongStyle(value.charAt(0).toUpperCase() + value.slice(1));
  };

  const handleChangeYoutube = (event: ChangeEvent<HTMLInputElement>) => {
    setSongYoutube(event.target.value);
  };

  const handleChangeSpotify = (event: ChangeEvent<HTMLInputElement>) => {
    setSongSpotify(event.target.value);
  };

  const handleChangeLyrics = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setSongLyrics(event.target.value);
  };

  const handleSubmit = async () => {
    let formValues: Song = {
      id: songUuid,
      title: songTitle,
      artist: songArtist,
      tone: songTone,
      style: songStyle,
      url_youtube: songYoutube,
      url_spotify: songSpotify,
      lyrics: songLyrics,
    };

    if (validateSongTitle(formValues.title)) {
      let isNewSong = true;
      setSpinnerButton(true);
      try {
        if (isEditable) {
          isNewSong = false;
          await songService.updateSong(formValues);
        } else {
          await songService.createSong(formValues);
        }
        resetFields();
        setSpinnerButton(false);
        onSuccess(isNewSong);
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
    }
  };

  useEffect(() => {
    if (typeof dataToEdit !== "undefined") {
      setSongUuid(dataToEdit.id);
      setSongTitle(dataToEdit.title);
      setSongArtist(dataToEdit.artist);
      setSongTone(dataToEdit.tone);
      setSongStyle(dataToEdit.style);
      setSongYoutube(dataToEdit.url_youtube);
      setSongSpotify(dataToEdit.url_spotify);
      setSongLyrics(dataToEdit.lyrics);
    } else {
      resetFields();
    }
  }, [dataToEdit]);

  return (
    <Modal
      isCentered
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent m={"16px"}>
        <ModalHeader>
          {isEditable ? "Editar canción" : "Nueva canción"}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <Input
              placeholder="Título"
              _placeholder={{ opacity: 1, color: "gray.400" }}
              value={songTitle}
              onBlur={handleBlurTitle}
              onChange={handleChangeTitle}
              isInvalid={songTitleError !== ""}
              errorBorderColor={"red.300"}
            />
            {songTitleError !== "" && (
              <Text fontSize="sm" textAlign="center" color="red.500">
                {songTitleError}
              </Text>
            )}
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="Artista"
              _placeholder={{ opacity: 1, color: "gray.400" }}
              value={songArtist}
              onChange={handleChangeArtist}
            />
          </FormControl>

          <FormControl mt={4}>
            <Select
              placeholder="Tonalidad"
              color={songTone === "" ? "gray.400" : "fieldtext"}
              onChange={handleSelectTone}
              value={songTone.toLowerCase()}
            >
              <option value="a">A</option>
              <option value="a#">A#</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="c#">C#</option>
              <option value="d">D</option>
              <option value="d#">D#</option>
              <option value="e">E</option>
              <option value="f">F</option>
              <option value="f#">F#</option>
              <option value="g">G</option>
              <option value="g#">G#</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <Select
              placeholder="Estilo"
              color={songStyle === "" ? "gray.400" : "fieldtext"}
              onChange={handleSelectStyle}
              value={songStyle.toLowerCase()}
            >
              <option value="lenta">Lenta</option>
              <option value="intermedia">Intermedia</option>
              <option value="rápida">Rápida</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="Link de YouTube"
              _placeholder={{ opacity: 1, color: "gray.400" }}
              value={songYoutube}
              onChange={handleChangeYoutube}
            />
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="Link de Spotify"
              _placeholder={{ opacity: 1, color: "gray.400" }}
              value={songSpotify}
              onChange={handleChangeSpotify}
            />
          </FormControl>

          <FormControl mt={4}>
            <Textarea
              placeholder="Letras y acordes"
              _placeholder={{ opacity: 1, color: "gray.400" }}
              value={songLyrics}
              onChange={handleChangeLyrics}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            isLoading={spinnerButton}
          >
            {isEditable ? "Editar" : "Agregar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
