import styled from "styled-components";
import { black, darkGreen, mint, white } from "../../../utils/colors";

export const InputContainer = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: ${darkGreen};
`;

export const InputField = styled.input`
  width: 100%;
  padding: 8px;
  border: 2px solid ${darkGreen};
  border-radius: 4px;
  font-size: 1r em;
  color: ${black};
  background-color: ${white};
  transition: box-shadow 0.3s ease; /* Transición para el sombreado */

  &:hover {
    box-shadow: 0 0 20px ${darkGreen}; /* Sombreado al pasar el ratón */
  }

  &:focus {
    outline: none; /* Eliminar el contorno al enfocar */
  }
`;
