import { Box } from "@chakra-ui/react";
import styled from "styled-components";

export const ContainerWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const LinksWrapper = styled.div`
  gap: 0.5rem;
`;

export const ActionsWrapper = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  place-content: center;
  padding: 0.5rem 1rem;
`;

export const ChangeToneWrapper = styled.div`
  max-width: 100%;
`;
