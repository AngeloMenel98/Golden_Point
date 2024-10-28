import styled from "styled-components";

interface LineProps {
  color?: string;
  thickness?: string;
  length?: string;
  margin?: string;
}

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 1.5rem;
`;

export const MatchContainer = styled.div`
  padding: 0.5rem;
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
export const Container = styled.div<{ mWidth: number; mHeight: number }>`
  display: flex;
  overflow: hidden;
  max-width: ${({ mWidth }) => `${mWidth}rem`};
  max-height: ${({ mHeight }) => `${mHeight}rem`};
`;

export const Column2x = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-right: 2px solid black;
  width: 15rem;
  padding: 0.5rem;
`;

export const Box2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 100%;
`;
