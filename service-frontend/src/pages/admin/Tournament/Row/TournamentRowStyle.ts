import styled from "styled-components";
import { black, darkGreen, mint, pastelGreen } from "../../../../utils/colors";

export const TourRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  background: ${pastelGreen};
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  border-radius: 6px;

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px ${black};
  }

  @media screen and (max-width: 480px) {
    height: 5rem;
    justify-content: center;
  }
`;

export const MemberData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MemberContainer = styled(MemberData)`
  align-items: flex-start;
`;

export const LeftContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    padding: 0;
  }
`;

export const FullRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const MasterContainer = styled.div`
  display: flex;
  flex-direction: row;

  color: ${darkGreen};
  font-weight: 900;

  padding: 0.5rem 0.5rem;
`;

export const TeamsContainer = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0.5rem 0.5rem;
  color: ${darkGreen};
  font-weight: 900;
`;

export const StartContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 0.5rem;
  color: ${darkGreen};
  font-weight: 900;
`;

export const TournamentContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 0.5rem 0.5rem;
  color: ${darkGreen};
  font-weight: 900;
`;

export const TourName = styled.button`
  color: ${darkGreen};
  cursor: pointer;
  line-height: 16px;
  font-weight: 900;
  font-size: 16px;
  transition: 0.3s ease;

  background-color: transparent;
  border: none;

  &:hover {
    color: ${mint};
  }
`;

export const TextSpan = styled.span`
  padding: 0rem 1rem;
  font-weight: 450;
`;
