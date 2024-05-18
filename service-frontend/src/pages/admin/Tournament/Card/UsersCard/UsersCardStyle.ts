import styled from "styled-components";
import { white } from "../../../../../utils/colors";

export const UsersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background-color: ${white};
  padding: 10px;
  max-width: 500px;
  overflow-y: auto;
`;
