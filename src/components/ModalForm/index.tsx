import React, { ChangeEvent, useEffect, useState } from "react";

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
} from "@chakra-ui/react";

import { supabase } from "utils/supabase";
import { SongData } from "types";

type ModalProps = {
  isOpen: boolean;
  dataToEdit?: SongData;
  onClose: () => void;
  onSuccess: (isNewSong: boolean) => void;
};

// TODO: Mostrar algún mensaje o Toast luego de ingresar una canción, y lo mismo en caso de Error

export const ModalForm: React.FC<ModalProps> = ({
  isOpen = false,
  dataToEdit,
  onClose,
  onSuccess,
}) => {
  const [songTitle, setSongTitle] = useState("");
  const [songTitleError, setSongTitleError] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songTone, setSongTone] = useState("");
  const [songStyle, setSongStyle] = useState("");
  const [songYoutube, setSongYoutube] = useState("");
  const [songSpotify, setSongSpotify] = useState("");

  const isEditable = typeof dataToEdit !== "undefined" ? true : false;

  const resetFields = () => {
    setSongTitle("");
    setSongArtist("");
    setSongTone("");
    setSongStyle("");
    setSongYoutube("");
    setSongSpotify("");
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

  const handleSubmit = async () => {
    let formValues = {
      title: songTitle,
      artist: songArtist,
      tone: songTone,
      style: songStyle,
      url_youtube: songYoutube,
      url_spotify: songSpotify,
    };

    if (validateSongTitle(formValues.title)) {
      let isNewSong = true;
      try {
        if (isEditable) {
          isNewSong = false;
          await supabase
            .from("songs")
            .update([formValues])
            .eq("id", dataToEdit?.id);
        } else {
          await supabase.from("songs").insert([formValues]);
        }
        resetFields();
        onSuccess(isNewSong);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.tsx:116 ~ useEffect ~ dataToEdit:",
      dataToEdit
    );
    if (typeof dataToEdit !== "undefined") {
      setSongTitle(dataToEdit.title);
      setSongArtist(dataToEdit.artist);
      setSongTone(dataToEdit.tone);
      setSongStyle(dataToEdit.style);
      setSongYoutube(dataToEdit.url_youtube);
      setSongSpotify(dataToEdit.url_spotify);
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
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {isEditable ? "Editar" : "Agregar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
