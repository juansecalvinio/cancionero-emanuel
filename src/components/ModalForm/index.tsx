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
} from "@chakra-ui/react";
import { supabase } from "utils/supabase";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// TODO: Limpiar los campos cuando se vuelve a abrir el modal

// TODO: Mostrar algún mensaje o Toast luego de ingresar una canción, y lo mismo en caso de Error

export const ModalForm: React.FC<ModalProps> = ({
  isOpen = false,
  onClose,
}) => {
  const [songTitle, setSongTitle] = useState("");
  const [songTitleError, setSongTitleError] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songTone, setSongTone] = useState("");
  const [songStyle, setSongStyle] = useState("");
  const [songYoutube, setSongYoutube] = useState("");
  const [songSpotify, setSongSpotify] = useState("");

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setSongTitle(event.target.value);
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

  useEffect(() => {
    setSongTitle("");
    setSongTitleError("");
    setSongArtist("");
    setSongTone("");
    setSongStyle("");
    setSongYoutube("");
    setSongSpotify("");
  }, []);

  const handleSubmit = async () => {
    let formValue = {
      name: songTitle,
      artist: songArtist,
      tone: songTone,
      style: songStyle,
      url_youtube: songYoutube,
      url_spotify: songSpotify,
    };

    if (formValue.name !== "") {
      try {
        console.log(
          "🚀 ~ file: index.tsx:68 ~ handleSubmit ~ formValue:",
          formValue
        );

        await supabase.from("songs").insert([formValue]);

        onClose();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Hace falta ingresar el nombre de la canción");
    }
  };

  return (
    <Modal
      isCentered
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ingresá la nueva canción</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <Input
              placeholder="Título"
              value={songTitle}
              onChange={handleChangeTitle}
              errorBorderColor={songTitleError}
            />
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="Artista"
              value={songArtist}
              onChange={handleChangeArtist}
            />
          </FormControl>

          <FormControl mt={4}>
            <Select placeholder="Tonalidad" onChange={handleSelectTone}>
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
            <Select placeholder="Estilo" onChange={handleSelectStyle}>
              <option value="lenta">Lenta</option>
              <option value="intermedia">Intermedia</option>
              <option value="rapida">Rápida</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="Link de YouTube"
              value={songYoutube}
              onChange={handleChangeYoutube}
            />
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="Link de Spotify"
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
            Agregar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
