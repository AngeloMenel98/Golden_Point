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

  @media screen and (max-width: 900px) {
    height: 8rem;
    justify-content: center;
  }

  @media screen and (max-width: 480px) {
    height: 10rem;
    justify-content: center;
  }
`;

export const MemberData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
  margin-left: 1rem;
`;

export const MemberContainer = styled(MemberData)`
  align-items: flex-start;
`;

export const LeftContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    padding: 0;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    padding: 0rem 1rem;
  }
`;

export const CodeContainer = styled.div`
  color: ${darkGreen};
  font-weight: 900;

  @media screen and (max-width: 900px) {
    padding: 0.5rem 0.5rem;
  }
`;

export const UserContainer = styled.div`
  display: flex;
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
export const CreatedBy = styled.span`
  padding: 0rem 1rem;
  font-weight: 900;
  color: ${darkGreen};

  @media screen and (max-width: 900px) {
    padding: 0;
  }
`;

export const TextSpan = styled.span`
  padding: 0rem 1rem;
  font-weight: 450;
`;

export const StyledLink = `
  color: ${darkGreen};
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  margin-left: 10px;
`;
