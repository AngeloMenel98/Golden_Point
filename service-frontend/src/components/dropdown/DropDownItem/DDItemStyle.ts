import styled from "styled-components";
import { lightGreen } from "../../../utils/colors";

export const Container = styled.div<{ width: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem;
  margin: 0.1rem;
  width: ${(props) => props.width}px;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${lightGreen};
  }
`;

export const Icon = styled.div`
  padding-left: 0.5rem;
`;
