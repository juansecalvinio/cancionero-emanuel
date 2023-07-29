import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import {
  Box,
  ChakraProvider,
  Container,
  Heading,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";

import ToggleColor from "components/ToggleColor";

import {
  ContainerStyled,
  FooterStyled,
  HeaderLogoStyled,
  HeaderStyled,
  MainStyled,
} from "styles/app.styled";
import { SpinnerContainerStyled } from "styles/index.styled";

import theme from "theme";
import Link from "next/link";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="md" h="calc(100vh)">
        <Head>
          <title>Cancionero</title>
          <meta name="description" content="Cancionero de Emanuel" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ContainerStyled>
          <HeaderStyled>
            <HeaderLogoStyled>
              <Heading size="md">Cancionero</Heading>
            </HeaderLogoStyled>
            <Box>
              <Link href="/help">
                <IconButton
                  aria-label={"Ayuda"}
                  icon={<QuestionOutlineIcon />}
                  size={"xs"}
                />
              </Link>
              <ToggleColor />
            </Box>
          </HeaderStyled>

          <MainStyled>
            {loading && (
              <SpinnerContainerStyled>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="teal.500"
                  size="xl"
                />
                <Text fontSize={"lg"}>Cargando...</Text>
              </SpinnerContainerStyled>
            )}
            {!loading && <Component {...pageProps} />}
          </MainStyled>

          <FooterStyled>
            <p>
              Powered by{" "}
              <a href="https://github.com/juansecalvinio" target="_blank">
                @juansecalvinio
              </a>
            </p>
          </FooterStyled>
        </ContainerStyled>
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
