import styled from "styled-components";
import { black } from "../../../utils/colors";

export const H2 = styled.h2`
  color: ${black};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row; /* Establecer la dirección de flexión a fila */
  align-items: center; /* Alinear los elementos verticalmente */
  justify-content: flex-start;
`;

export const InputContainer = styled.div`
  margin-bottom: 1rem;
  margin-right: 1rem;
`;
