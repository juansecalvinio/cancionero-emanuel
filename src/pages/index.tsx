import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { Container, Button, Input } from '@chakra-ui/react'
import Card from 'components/Card'
import { FilterContainerStyled, SongsContainerStyled } from 'styles/index.styled'

const SongsPage: NextPage = ({ songsData }: any) => {

  const [songs, setSongs] = useState([])
  const [searchValue, setSearchValue] = useState("")

  const handleChangeSearchValue = (e: any) => {
    let query = e.target.value
    setSearchValue(query)
  }
  
  useEffect(() => {
    setSongs(songsData.sort((a: any, b: any) => {
      if (a['Nombre'] > b['Nombre']) return 1
      if (a['Nombre'] < b['Nombre']) return -1
      return 0
    }))
  }, [songsData])

  useEffect(() => {
    if (searchValue !== "") {
      setSongs(songsData.filter((song: any) => {
        if (song['Nombre'].toLowerCase().includes(searchValue.toLowerCase())) 
          return song
      }))
    } else {
      setSongs(songsData)
    }
  }, [searchValue, songsData])


  return (
    <Container maxW="md" placeContent="center">
      <FilterContainerStyled>
        <Input 
          placeholder='Buscá una canción...'
          value={searchValue}
          onChange={handleChangeSearchValue}
        />
      </FilterContainerStyled>
      <SongsContainerStyled>
      {songs.map((song: any) => (
        <Card key={song.Nombre} data={song} />
      ))}
      </SongsContainerStyled>
    </Container>
  )
}

export default SongsPage

export async function getServerSideProps() {
  const req = await fetch("http://localhost:3000/api/sheet")
  const res = await req.json()
  const { data } = res

  return {
    props: {
      songsData: data
    }
  }
}