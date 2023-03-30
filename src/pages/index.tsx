import type { NextPage } from "next";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { Button, Container, Input, Spinner, Text } from "@chakra-ui/react";
import Card from "components/Card";
import {
  FilterContainerStyled,
  SongsContainerStyled,
  SpinnerContainerStyled,
} from "styles/index.styled";

import { ModalForm } from "components/ModalForm";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SongsPage: NextPage = () => {
  // const response = useSWR('api/sheet', fetcher)

  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [songs, setSongs] = useState([]);
  const [songsFetched, setSongsFetched] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [refreshSongs, setRefreshSongs] = useState(false);

  const response = useSWR(
    refreshSongs ? "api/songs?refresh=true" : "api/songs",
    fetcher
  );

  const handleChangeSearchValue = (e: any) => {
    let query = e.target.value;
    setSearchValue(query);
  };

  useEffect(() => {
    if (!!response.data) {
      let { data: songs } = response.data;
      songs.sort((a: any, b: any) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      setLoading(false);
      setSongsFetched(songs);
    } else {
      setLoading(true);
    }
  }, [response]);

  useEffect(() => {
    if (modal === false) {
      setRefreshSongs((prevState) => !prevState);
    }
  }, [modal]);

  useEffect(() => {
    if (searchValue !== "") {
      const filteredSongs = songsFetched.filter((song: any) =>
        // song["Nombre"].toLowerCase().includes(searchValue.toLowerCase())
        song["name"].toLowerCase().includes(searchValue.toLowerCase())
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

      {!loading && (
        <SongsContainerStyled>
          {songs.map((song: any) => (
            // <Card key={song.Nombre} data={song} />
            <Card key={song.name} data={song} />
          ))}
        </SongsContainerStyled>
      )}

      <ModalForm onClose={() => setModal(!modal)} isOpen={modal} />
    </Container>
  );
};

export default SongsPage;
