import styled from "styled-components";
import { darkGreen, red } from "../../../../utils/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
`;

export const ButtonContainer = styled.div`
  width: 100%;
`;

export const ContentContainer = styled.div`
  width: 100%;
`;

export const Label = styled.span<{ error: boolean }>`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: ${(props) => (props.error ? red : darkGreen)};
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.01rem;
  margin-bottom: 0.01rem;
`;
