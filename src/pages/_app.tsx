import React from "react"
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Image from "next/image"
import { 
  Box,
  chakra,
  ChakraProvider,
  Container,
  Heading,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'

import theme from "theme"

import ToggleColor from 'components/ToggleColor'

import { 
  ContainerStyled, 
  FooterStyled, 
  HeaderLogoStyled, 
  HeaderStyled, 
  MainStyled 
} from "./_app.styled"


const ChakraNextImage = chakra(Image)

function MyApp({ Component, pageProps }: AppProps) {
  
  const logoLightSrc = "http://drive.google.com/uc?export=view&id=1oD8_BN_Zf-IIBVB28pbs6fKYwpQ21K6f"
  const logoDarkSrc = "http://drive.google.com/uc?export=view&id=1zYEQw7XgzW7rovJPLSk3gqwHo-sT4Pg5"
  const logoSrc = useColorModeValue(logoLightSrc, logoDarkSrc)
  
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="md" h='calc(100vh)'>
        <Head>
          <title>Songbook JovEm</title>
          <meta name="description" content="Cancionero de JovEm" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ContainerStyled>
          <HeaderStyled>
            <HeaderLogoStyled>
              {/* <Box w={"100px"} h={"100px"} position={"relative"}>
                <ChakraNextImage 
                  alt="logo"
                  objectFit={"cover"}
                  layout={"fill"}
                  src={logoSrc} 
                />
              </Box> */}
              <Heading>Songbook</Heading>
            </HeaderLogoStyled>
            <ToggleColor />
          </HeaderStyled>

          <MainStyled>
            <Component {...pageProps} />
          </MainStyled>

          <FooterStyled>
            <p>Powered by @juansecalvinio</p>
          </FooterStyled>
        </ContainerStyled>
      </Container>
    </ChakraProvider>
  )
}

export default MyApp
