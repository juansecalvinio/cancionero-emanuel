import styled from "styled-components";

export const ContainerStyled = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 100px;
  height: 100%;
  padding: 1rem;
`;

export const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLogoStyled = styled.div`
  display: flex;
`;

export const MainStyled = styled.main`
  padding: 2rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const FooterStyled = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  justify-content: center;
  align-items: center;
`;
