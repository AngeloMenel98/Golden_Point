import styled from "styled-components";
import { white } from "../../../../../utils/colors";

export const UsersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  background-color: ${white};
  padding: 10px;
  max-width: 600px;
  overflow-y: auto;
`;
