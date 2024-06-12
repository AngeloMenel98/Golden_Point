import styled from "styled-components";
import { black, darkGray, darkGreen, red, white } from "../../../utils/colors";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label<{
  hasError: boolean;
}>`
  font-weight: bold;
  display: block;
  color: ${({ hasError }) => (hasError ? red : darkGreen)};
`;

export const InputFieldWithIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputField = styled.input<{
  hasIconInside: boolean;
  hasError: boolean;
  isSmall: boolean | undefined;
  isBig: boolean | undefined;
}>`
  width: ${({ isSmall, isBig }) =>
    isSmall ? "2rem" : isBig ? "16rem" : "10rem"};
  padding: 0.5rem;
  border: 2px solid ${({ hasError }) => (hasError ? red : darkGreen)};
  border-radius: 6px;
  font-size: 1rem;
  color: ${black};
  background-color: ${white};
  transition: box-shadow 0.3s ease;
  padding-left: ${({ hasIconInside }) => (hasIconInside ? "35px" : "8px")};

  &::placeholder {
    color: ${darkGray};
    opacity: 0.7;
  }

  &:hover {
    box-shadow: 0 0 20px ${({ hasError }) => (hasError ? red : darkGreen)};
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 480px) {
    width: 8rem;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 55%;
  transform: translateY(-50%);
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.01rem;
  margin-bottom: 0.01rem;
`;
