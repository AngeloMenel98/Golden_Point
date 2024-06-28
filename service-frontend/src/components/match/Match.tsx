import React from "react";
import {
  Container,
  Column,
  Column2x,
  Box,
  MatchText,
  HorizontalLine,
  Column4,
  Column4Text,
  VerticalLine,
  Box2,
  Wrapper,
  ButtonWrapper,
} from "./MatchStyle";
import { black, pastelGreen } from "../../utils/colors";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import EditIcon from "../../icons/EditIcon/EditIcon";
import { MatchDTO } from "../../entities/dtos/MatchDTO";
import { formatDateTime } from "../../utils/transformDate";

interface MatchProps {
  match: MatchDTO;
  onClick?: () => void;
}

interface MatchBoxProps {
  teamName: string;
}

const MatchBox: React.FC<MatchBoxProps> = ({ teamName }) => {
  const [var1, var2] = teamName.split("-");

  return (
    <Box>
      <MatchText>{var1}</MatchText>
      <MatchText>{var2}</MatchText>
    </Box>
  );
};

const Match: React.FC<MatchProps> = ({ match, onClick }) => {
  return (
    <Wrapper>
      <Container mWidth={40} mHeight={10}>
        <Column>
          <MatchText>1</MatchText>
        </Column>
        <Column2x>
          {match.TeamsName != null && match.TeamsName.length >= 2 && (
            <>
              <MatchBox teamName={match.TeamsName[0]} />
              <HorizontalLine thickness="0.1rem" color={black} />
              <MatchBox teamName={match.TeamsName[1]} />
            </>
          )}
        </Column2x>
        <Column2x>
          <Box2>
            <MatchText>5</MatchText>
            <MatchText>6</MatchText>
            <MatchText>1</MatchText>
          </Box2>
          <Box2>
            <HorizontalLine
              thickness="0.1rem"
              length="1.5rem"
              color={black}
              margin="0.5rem 0"
            />
            <HorizontalLine
              thickness="0.1rem"
              length="1.5rem"
              color={black}
              margin="0.5rem 0"
            />
            <HorizontalLine
              thickness="0.1rem"
              length="1.5rem"
              color={black}
              margin="0.5rem 0"
            />
          </Box2>
          <Box2>
            <MatchText>6</MatchText>
            <MatchText>4</MatchText>
            <MatchText>6</MatchText>
          </Box2>
        </Column2x>
        <Column4>
          <Column4Text>Date: {formatDateTime(match.MatchDate)}</Column4Text>
          <VerticalLine
            thickness="1px"
            length="1px"
            color="transparent"
            margin="5px 0"
          />
          <Column4Text>Club: {match.ClubName}</Column4Text>
          <VerticalLine
            thickness="1px"
            length="1px"
            color="transparent"
            margin="5px 0"
          />
          <Column4Text>Court: {match.Court}</Column4Text>
        </Column4>
      </Container>
      <ButtonWrapper>
        <SecondaryButton
          icon={
            <EditIcon
              width={17}
              height={17}
              color={pastelGreen}
              onClick={onClick}
            />
          }
          onClick={onClick}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Match;
