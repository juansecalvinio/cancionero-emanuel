import type { NextPage } from "next";
import { useState, useEffect } from "react";
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
import { supabase } from "utils/supabase";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SongsPage: NextPage = () => {
  // const response = useSWR('api/sheet', fetcher)

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertSuccessMessage, setAlertSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [songs, setSongs] = useState([]);
  const [songsFetched, setSongsFetched] = useState([]);
  const [songToDelete, setSongToDelete] = useState(0);
  const [refreshSongs, setRefreshSongs] = useState(false);

  const response = useSWR(
    refreshSongs ? "api/songs?refresh=true" : "api/songs",
    fetcher
  );

  const handleChangeSearchValue = (e: any) => {
    let query = e.target.value;
    setSearchValue(query);
  };

  const onModalClose = () => {
    setModal(!modal);
  };

  const onModalSuccess = () => {
    onModalClose();
    setAlertSuccessMessage("Agregaste una nueva canción!");
    setAlertSuccess(true);
    setTimeout(() => {
      setAlertSuccess(false);
    }, 3000);
  };

  const onModalDeleteClose = () => {
    setModalDelete(!modalDelete);
  };

  const onModalDeleteSuccess = async () => {
    /** Lógica de elimiar  */
    try {
      const { data, error } = await supabase
        .from("songs")
        .delete()
        .eq("id", songToDelete);
      onModalDeleteClose();
      setAlertSuccessMessage("Se eliminó la canción correctamente");
      setAlertSuccess(true);
      setTimeout(() => {
        setAlertSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDelete = (id: number) => {
    console.log("🚀 ~ file: index.tsx:78 ~ onClickDelete ~ id:", id);
    setSongToDelete(id);
    setModalDelete(true);
  };

  const onClickEdit = () => {
    console.log("click edit");
  };

  useEffect(() => {
    if (!!response.data) {
      let { data: songs } = response.data;
      setLoading(false);
      setSongsFetched(songs);
    } else {
      setLoading(true);
    }
  }, [response]);

  useEffect(() => {
    if (modal === false || modalDelete === false) {
      setRefreshSongs((prevState) => !prevState);
    }
  }, [modal, modalDelete]);

  useEffect(() => {
    if (searchValue !== "") {
      const filteredSongs = songsFetched.filter((song: any) =>
        // song["Nombre"].toLowerCase().includes(searchValue.toLowerCase())
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
        {alertSuccess && (
          <Alert status="success">
            <AlertIcon />
            {alertSuccessMessage}
          </Alert>
        )}
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

      {!loading && (
        <SongsContainerStyled>
          {songs.map((song: any) => (
            // <Card key={song.Nombre} data={song} />
            <Card
              key={song.id}
              data={song}
              onEdit={onClickEdit}
              onDelete={onClickDelete}
            />
          ))}
        </SongsContainerStyled>
      )}

      <ModalForm
        onClose={onModalClose}
        onSuccess={onModalSuccess}
        // dataToEdit={}
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
