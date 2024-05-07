import { useState } from "react";
import styled from "styled-components";
import { black, darkGray, white } from "../../../utils/colors";
import SearchIcon from "../../../icons/SearchIcon/SearchIcon";

const MemberData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
`;

const MemberContainer = styled(MemberData)`
  margin-left: 20px;
  align-items: flex-start;
`;
const BeneficiaryNumber = styled.div`
  height: 20px;
  padding: 20px 0px;
  color: ${black};
`;

const LeftContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const FullRightContainer = styled.div`
  display: flex;
  color: ${black}
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`;

const TourRow = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${white};
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Groups = styled.h3`
  color: ${black};
  cursor: default;
  line-height: 16px;
  margin: 5px 0px 0px 0px;
`;

/*interface RowPatientProps {
  patientData: Patient;
}*/

export default () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <TourRow
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <LeftContainer>
        <MemberContainer>
          <Groups>All Tours</Groups>
        </MemberContainer>
        <BeneficiaryNumber>esto que eso?</BeneficiaryNumber>
      </LeftContainer>
      <FullRightContainer>
        <SearchIcon width={50} height={50} />
      </FullRightContainer>
    </TourRow>
  );
};
