import styled from "styled-components";
import { white } from "../../../../../utils/colors";

export const ModalWrapper = styled.div<{ open: boolean; width: number }>`
display: flex;
flex-direction: column;
align-items: center;
position: absolute;

padding: 0.5rem;
margin-top: 4rem;
background-color: ${white};
border-radius: 0.5rem;
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
width: ${(props) => props.width}px;
max-height: 30vh;
overflow-y: scroll;
scrollbar-width: none;
-ms-overflow-style: none;
z-index: 1000;

opacity: ${(props) => (props.open ? 1 : 0)};
transform: ${(props) => (props.open ? `translateY(0)` : `translateY(-5%)`)};
transition: transform 150ms ease-in-out;
opacity 100ms ease-in-out;
pointer-events: ${(props) => (props.open ? `all` : `none`)};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
  padding-right: 1rem;
`;
