import React from "react";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Code,
  Container,
  Divider,
  Heading,
  Kbd,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

export const HelpPage = () => {
  const router = useRouter();

  return (
    <Container
      maxW="md"
      position={"relative"}
      placeContent="flex-start"
      h="100%"
      padding={"0 0 3rem 0"}
      display={"flex"}
      flexDirection={"column"}
      gap={"1rem"}
    >
      <Button
        colorScheme="teal"
        variant="link"
        size="sm"
        leftIcon={<ArrowBackIcon />}
        onClick={() => router.push("/")}
        mr={"auto"}
        mb={"0.5rem"}
      >
        Volver
      </Button>
      <Box as="header">
        <Heading fontSize={"2xl"} fontFamily={"body"} mb={"1rem"}>
          ¿Cómo agregar acordes a las canciones?
        </Heading>
        <Divider mb={"1rem"} />
        <Text mb={"0.5rem"}>
          Los acordes se agregan escribiéndolos directamente con las letras
          junto a cada palabra en donde quisiéramos que se ubique el acorde.
        </Text>
        <Text mb={"1.5rem"}>
          Para que se puedan visualizar correctamente deben tener el siguiente
          formato:
        </Text>
        <Stack mb={"1.5rem"}>
          <Code>Solo[LA] un momento en tu pres[MI]encia</Code>
        </Stack>
        <Text mb={"1.5rem"}>Y esto se vería de la siguiente manera:</Text>
        <Stack
          mb={"1.5rem"}
          border={"1px solid"}
          borderColor={"gray.600"}
          borderRadius={"6px"}
          p={"0.25rem 1rem"}
          bgColor={useColorModeValue("yellow.100", "transparent")}
        >
          <pre
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
          >
            <div
              style={{
                display: "inline-block",
                marginLeft: "2rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                }}
              >
                LA
              </span>
            </div>
            <div
              style={{
                display: "inline-block",
                marginLeft: "10rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                }}
              >
                MI
              </span>
            </div>
          </pre>
          <Text as="cite" mt={"0 !important"}>
            Solo un momento en tu presencia
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};

export default HelpPage;
