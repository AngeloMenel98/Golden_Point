import styled from "styled-components";
import { black } from "../../utils/colors";

interface LineProps {
  color?: string;
  thickness?: string;
  length?: string;
  margin?: string;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  padding: 0.5rem;
`;

export const Container = styled.div<{ mWidth: number; mHeight: number }>`
  display: flex;
  border: 2px solid black;
  border-radius: 1rem;
  overflow: hidden;
  max-width: ${({ mWidth }) => `${mWidth}rem`};
  max-height: ${({ mHeight }) => `${mHeight}rem`};
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid black;
  width: 3rem;
`;

export const Column2x = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-right: 2px solid black;
  width: 15rem;
  padding: 0.5rem;
`;

export const Column4 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 15rem;
  padding: 0.5rem;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const Box2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 100%;
`;

export const MatchText = styled.div`
  text-align: center;
  margin: 5px 0;
  color: ${black};
`;

export const Column4Text = styled.div`
  color: ${black};
  margin: 5px 0;
`;

export const VerticalLine = styled.div<LineProps>`
  width: ${(props) => props.thickness || "1px"};
  height: ${(props) => props.length || "100%"};
  background-color: ${(props) => props.color || "black"};
  margin: ${(props) => props.margin || "0"};
`;

export const HorizontalLine = styled.div<LineProps>`
  height: ${(props) => props.thickness || "1px"};
  width: ${(props) => props.length || "100%"};
  background-color: ${(props) => props.color || "black"};
  margin: ${(props) => props.margin || "0"};
`;
