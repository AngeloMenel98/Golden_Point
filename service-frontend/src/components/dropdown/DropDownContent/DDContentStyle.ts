import styled from "styled-components";
import { darkGreen, white } from "../../../utils/colors";

export const ContentContainer = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;

  padding: 0.5rem;
  margin-top: 0.5rem;
  background-color: ${white};
  border-radius: 0.5rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  max-width: 100%;
  max-height: 40vh;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  z-index: 1000;

  opacity: ${(props) => (props.open ? 1 : 0)};
`;

export const Text = styled.span`
  color: ${darkGreen};
`;
