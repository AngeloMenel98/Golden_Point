import styled from "styled-components";
import { black } from "../../../utils/colors";

export const H2 = styled.h2`
  color: ${black};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const InputContainer = styled.div`
  margin-bottom: 1rem;
  margin-right: 1rem;
`;
