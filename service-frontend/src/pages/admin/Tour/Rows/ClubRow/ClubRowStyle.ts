import styled from "styled-components";
import { black, darkGreen, pastelGreen } from "../../../../../utils/colors";

export const ClubRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: ${pastelGreen};
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  border-radius: 6px;

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px ${black};
  }

  @media screen and (max-width: 900px) {
    height: 7rem;
  }
`;

export const MemberData = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: flex-start;

  padding: 0rem 0.5rem;
`;

export const ClubContainer = styled(MemberData)`
  @media screen and (max-width: 900px) {
    padding: 0.5rem;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding-left: 0.5rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: ${black};

  padding-right: 0.5rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const FullRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: ${black};
  padding-right: 0.5rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0rem 0.5rem;

  color: ${darkGreen};
  font-weight: 900;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const HoursContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0rem 0.5rem;

  color: ${darkGreen};
  font-weight: 900;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const CourtsContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 0rem 0.5rem;

  color: ${darkGreen};
  font-weight: 900;
`;

export const ClubName = styled.span`
  color: ${darkGreen};
  line-height: 16px;
  font-weight: 900;
`;

export const TextSpan = styled.span`
  padding: 0rem 0.5rem;
  font-weight: 450;
`;
