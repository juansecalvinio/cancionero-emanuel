import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ChakraProvider,
  Container,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import ToggleColor from "components/ToggleColor";
import {
  ContainerStyled,
  FooterStyled,
  HeaderLogoStyled,
  HeaderStyled,
  MainStyled,
} from "styles/app.styled";

import theme from "theme";

import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const logoLightSrc =
    "http://drive.google.com/uc?export=view&id=1oD8_BN_Zf-IIBVB28pbs6fKYwpQ21K6f";
  const logoDarkSrc =
    "http://drive.google.com/uc?export=view&id=1zYEQw7XgzW7rovJPLSk3gqwHo-sT4Pg5";
  const logoSrc = useColorModeValue(logoLightSrc, logoDarkSrc);

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="md" h="calc(100vh)">
        <Head>
          <title>Cancionero</title>
          <meta name="description" content="Cancionero de JovEm" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ContainerStyled>
          <HeaderStyled>
            <HeaderLogoStyled>
              <Heading>Cancionero</Heading>
            </HeaderLogoStyled>
            <ToggleColor />
          </HeaderStyled>

          <MainStyled>
            <Component {...pageProps} />
          </MainStyled>

          <FooterStyled>
            <p>
              Powered by{" "}
              <a href="https://github.com/juansecalvinio" target="_blank">
                @juansecalvinio
              </a>
            </p>
          </FooterStyled>

          <ToastContainer />
        </ContainerStyled>
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
