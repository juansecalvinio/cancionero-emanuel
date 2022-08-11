import React from 'react'
import {
  Badge,
  Box,
  Button,
  IconButton,
  Center,
  Link,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { FaSpotify, FaYoutube } from "react-icons/fa"


const Card = ({ data }: any) => {
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={"0 12px 20px 6px rgb(104 112 118 / 0.08)"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {data['Nombre']}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {data['Intérprete']}
        </Text>
        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            fontWeight={'400'}
            colorScheme={data['Estilo'] === "Rápida" ? "green" : "red"}
          >
            <strong>{data['Estilo']}</strong>
          </Badge>
          <Badge
            px={2}
            py={1}
            fontWeight={'400'}
          >
            TONALIDAD: <strong>{data['Tono']}</strong>
          </Badge>
        </Stack>
        <Stack mt={8} direction={'row'} align={'center'} justify={'center'}  spacing={4}>
          <Link
            href={data['Versión YouTube']}
            display={data['Versión YouTube'].length < 2 ? "none" : ""}
            isExternal
          >
            <IconButton
              disabled={data['Versión YouTube'].length < 2}
              aria-label='youtube-link'
              flex={1}
              fontSize={'lg'}
              size="lg"
              rounded={'full'}
              colorScheme="gray"
              icon={<FaYoutube />}
            />
          </Link>
          <Link
            href={data['Versión Spotify']}
            display={data['Versión YouTube'].length < 2 ? "none" : ""}
            isExternal
          >
            <IconButton
              disabled={data['Versión Spotify'].length < 2}
              aria-label='spotify-link'
              flex={1}
              fontSize={'lg'}
              size="lg"
              rounded={'full'}
              colorScheme="teal"
              icon={<FaSpotify />}
            />
          </Link>
        </Stack>
      </Box>
    </Center>
  )
}

export default Card