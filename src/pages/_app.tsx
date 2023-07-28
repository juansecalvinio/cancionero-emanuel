import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import {
  ChakraProvider,
  Container,
  Heading,
  Spinner,
  Text,
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
import { SpinnerContainerStyled } from "styles/index.styled";

import theme from "theme";

import "react-toastify/dist/ReactToastify.css";

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
            <ToggleColor />
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

          <ToastContainer />
        </ContainerStyled>
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
