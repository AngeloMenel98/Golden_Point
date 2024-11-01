import styled from "styled-components";
import { darkGreen, mint } from "../../utils/colors";
import { Link } from "react-router-dom";
export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Espacio entre tarjetas */
  justify-content: center; /* Alineación centrada */
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const CardTitle = styled.h3`
  color: ${darkGreen};
  font-weight: bold;
  margin: 0;
`;

export const CardCategory = styled.span`
  color: ${darkGreen};
  font-weight: 450;
  margin-left: 10px;
`;

export const CardText = styled.p`
  color: ${darkGreen};
  margin: 4px 0;
  text-align: center;
`;

export const StyledLink = styled(Link)`
  color: ${darkGreen};
  font-weight: 750;
  text-decoration: none;

  &:hover {
    color: ${mint};
    text-decoration: underline;
  }
`;

export const VsText = styled.span`
  display: block;
  font-weight: bold;
  margin: 4px 0;
`;
