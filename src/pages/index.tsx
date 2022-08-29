import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Container, Input, Spinner, Text } from '@chakra-ui/react'
import Card from 'components/Card'
import { FilterContainerStyled, SongsContainerStyled, SpinnerContainerStyled } from 'styles/index.styled'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const SongsPage: NextPage = () => {

  const response = useSWR('api/sheet', fetcher)

  const [loading, setLoading] = useState(true)
  const [songs, setSongs] = useState([])
  const [songsFetched, setSongsFetched] = useState([])
  const [searchValue, setSearchValue] = useState("")

  const handleChangeSearchValue = (e: any) => {
    let query = e.target.value
    setSearchValue(query)
  }
  
  useEffect(() => {
    if (!!response.data) {
      let { data: songs } = response.data
      songs.sort((a: any, b: any) => {
        if (a['Nombre'] > b['Nombre']) return 1
        if (a['Nombre'] < b['Nombre']) return -1
        return 0
      })
      setLoading(false)
      setSongsFetched(songs)
    } else {
      setLoading(true)
    }
  }, [response])

  useEffect(() => {
    if (searchValue !== "") {
      const filteredSongs = songsFetched.filter(
        (song: any) => song['Nombre'].toLowerCase().includes(searchValue.toLowerCase())
      )
      setSongs(filteredSongs)
    } else {
      setSongs(songsFetched)
    }
  }, [searchValue, songsFetched])


  return (
    <Container maxW="md" placeContent="center" h="100%" padding={"0"}>
      <FilterContainerStyled>
        <Input 
          placeholder='Buscá una canción...'
          value={searchValue}
          onChange={handleChangeSearchValue}
        />
      </FilterContainerStyled>

      {loading && 
        <SpinnerContainerStyled>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
          <Text fontSize={"lg"}>Cargando...</Text>
        </SpinnerContainerStyled>
      }
      
      {!loading &&
        <SongsContainerStyled>
          {songs.map((song: any) => (
            <Card key={song.Nombre} data={song} />
          ))}
        </SongsContainerStyled> 
      }
    </Container>
  )
}

export default SongsPage