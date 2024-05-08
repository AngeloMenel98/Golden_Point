import styled from "styled-components";
import { black, darkGreen, mint, pastelGreen } from "../../../utils/colors";
import { Link } from "react-router-dom";

export const TourRowContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${pastelGreen};
  margin-bottom: 5px;
  box-sizing: border-box;
  border-radius: 6px;

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px ${black};
  }
`;

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

export const CodeContainer = styled.div`
  height: 20px;
  padding: 20px 15px;
  color: ${darkGreen};
  font-weight: 900;
`;

export const UserContainer = styled.div`
  height: 20px;
  padding: 20px 20px;
  color: ${darkGreen};
  font-weight: 900;

  display: flex;
  align-items: center;
`;
export const TournamentContainer = styled.div`
  display: flex;
  align-items: center;

  height: 20px;
  padding: 20px 0px;
  color: ${darkGreen};
  font-weight: 900;
`;

export const TourName = styled(Link)`
  color: ${darkGreen};
  cursor: pointer;
  line-height: 16px;
  font-weight: 900;
  transition: 0.3s ease;

  &:hover {
    color: ${mint};
  }
`;

export const TextSpan = styled.span`
  padding: 0rem 1rem;
  font-weight: 350;
`;

export const StyledLink = `
  color: ${darkGreen};
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  margin-left: 10px;
`;
