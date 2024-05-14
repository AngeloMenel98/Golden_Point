import styled from "styled-components";
import { black, lightGray } from "../../../utils/colors";

export const Container = styled.div`
  padding: 0.5rem;
  margin: 0.1rem;
  width: 100%;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${lightGray};
  }
`;
