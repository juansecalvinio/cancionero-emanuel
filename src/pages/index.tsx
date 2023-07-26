import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Card from "components/Card";
import {
  FilterContainerStyled,
  SongsContainerStyled,
  SpinnerContainerStyled,
} from "styles/index.styled";

import { ModalForm } from "components/ModalForm";
import { ModalDelete } from "components/ModalDelete";

import { SupabaseSongRepository } from "infrastructure/db/SupabaseSongRepository";
import { SongService } from "application/services/SongService";
import { Song } from "domain/entities/Song";

const songRepository = new SupabaseSongRepository();
const songService = new SongService(songRepository);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SongsPage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [songsFetched, setSongsFetched] = useState<Song[]>([]);
  const [songToDelete, setSongToDelete] = useState<string>("");
  const [songToEdit, setSongToEdit] = useState<Song | undefined>(undefined);
  const [refreshSongs, setRefreshSongs] = useState<boolean>(false);

  const response = useSWR(
    refreshSongs ? "api/songs?refresh=true" : "api/songs",
    fetcher
  );

  const handleChangeSearchValue = (e: any) => {
    let query = e.target.value;
    setSearchValue(query);
  };

  const onModalClose = () => {
    setSongToEdit(undefined);
    setModal(false);
  };

  const onModalSuccess = (isNewSong: boolean) => {
    setSongToEdit(undefined);
    setModal(false);

    let toastMessage;

    if (isNewSong) {
      toastMessage = "Agregaste una nueva canción!";
    } else {
      toastMessage = "Se modificaron los datos de la canción";
    }

    toast.success(toastMessage, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onModalDeleteClose = () => {
    setModalDelete(!modalDelete);
  };

  const onModalDeleteSuccess = async () => {
    try {
      await songService.deleteSong(songToDelete);
      onModalDeleteClose();
      toast.success("Se eliminó la canción correctamente", {
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

  const onClickDelete = (id: string) => {
    setSongToDelete(id);
    setModalDelete(!modalDelete);
  };

  const onClickEdit = (data: Song) => {
    setSongToEdit(data);
    setModal(!modal);
  };

  useEffect(() => {
    if (!!response.data) {
      let songs = response.data;
      setLoading(false);
      setSongsFetched(songs);
    } else {
      setLoading(true);
    }
  }, [response.data]);

  useEffect(() => {
    if (modal === false || modalDelete === false) {
      setRefreshSongs((prevState) => !prevState);
    }
  }, [modal, modalDelete]);

  useEffect(() => {
    if (searchValue !== "") {
      const filteredSongs = songsFetched.filter((song: any) =>
        song.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSongs(filteredSongs);
    } else {
      setSongs(songsFetched);
    }
  }, [searchValue, songsFetched]);

  return (
    <Container maxW="md" placeContent="center" h="100%" padding={"0"}>
      <FilterContainerStyled>
        <Button colorScheme="blue" onClick={() => setModal(!modal)}>
          Agregar nueva canción
        </Button>
        <Input
          placeholder="Buscá una canción..."
          value={searchValue}
          onChange={handleChangeSearchValue}
        />
      </FilterContainerStyled>

      {loading && (
        <SpinnerContainerStyled>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text fontSize={"lg"}>Cargando...</Text>
        </SpinnerContainerStyled>
      )}

      {!loading && songs?.length > 0 && (
        <SongsContainerStyled>
          {songs.map((song: any) => (
            <Card
              key={song.id}
              data={song}
              onEdit={onClickEdit}
              onDelete={onClickDelete}
            />
          ))}
        </SongsContainerStyled>
      )}

      {!loading && songs?.length === 0 && (
        <SongsContainerStyled>
          <Alert status="warning">
            <AlertIcon />
            {"No se encontraron canciones"}
          </Alert>
        </SongsContainerStyled>
      )}

      <ModalForm
        onClose={onModalClose}
        onSuccess={onModalSuccess}
        dataToEdit={songToEdit}
        isOpen={modal}
      />

      <ModalDelete
        isOpen={modalDelete}
        onClose={onModalDeleteClose}
        onSuccess={onModalDeleteSuccess}
      />
    </Container>
  );
};

export default SongsPage;
