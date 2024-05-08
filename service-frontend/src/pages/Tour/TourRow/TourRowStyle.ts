import styled from "styled-components";
import { black, white } from "../../../utils/colors";

export const MemberData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
`;

export const MemberContainer = styled(MemberData)`
  margin-left: 20px;
  align-items: flex-start;
`;
export const CodeContainer = styled.div`
  height: 20px;
  padding: 20px 0px;
  color: ${black};
`;

export const LeftContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const FullRightContainer = styled.div`
  display: flex;
  color: ${black}
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`;

export const TourRowContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${white};
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const TourName = styled.h4`
  color: ${black};
  cursor: default;
  line-height: 16px;
  margin: 5px 0px 0px 0px;
`;
