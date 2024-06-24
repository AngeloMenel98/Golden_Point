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

interface MatchProps {
  teamsName: string[];
  onClick?: () => void;
}

const Match: React.FC<MatchProps> = ({ teamsName, onClick }) => {
  return (
    <Wrapper>
      <Container mWidth={30} mHeight={10}>
        <Column>
          <MatchText>1</MatchText>
        </Column>
        <Column2x>
          <Box>
            <MatchText>s</MatchText>
            <MatchText>ss</MatchText>
          </Box>
          <HorizontalLine thickness="0.1rem" color={black} />
          <Box>
            <MatchText>{teamsName[0].split("-")}</MatchText>
            <MatchText>Piranni</MatchText>
          </Box>
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
          <Column4Text>Date: 01-07-2024 09:00</Column4Text>
          <VerticalLine
            thickness="1px"
            length="1px"
            color="transparent"
            margin="5px 0"
          />
          <Column4Text>Club: Padel Zone</Column4Text>
          <VerticalLine
            thickness="1px"
            length="1px"
            color="transparent"
            margin="5px 0"
          />
          <Column4Text>Court: 1</Column4Text>
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
