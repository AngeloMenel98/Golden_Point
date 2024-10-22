import React, { SetStateAction } from "react";
import {
  Container,
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
import { MatchData } from "../../pages/admin/Matches/Cards/MatchCard/MatchCard";
import { TeamDTO } from "../../entities/dtos/TeamDTO";
import { formatGames } from "../../utils/formatGames";

interface MatchProps {
  match: MatchDTO;
  teams: TeamDTO[];
  onEditMatch?: (s: SetStateAction<MatchData>) => void;
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

const Match: React.FC<MatchProps> = ({
  match,
  teams,
  onClick,
  onEditMatch,
}) => {
  const filteredTeams = teams.filter((team) =>
    match.TeamsName.includes(team.TeamName)
  );

  const games = formatGames(match.Games);

  const handleEdit = () => {
    if (onEditMatch && onClick) {
      onEditMatch((prevEditMatch) => ({
        ...prevEditMatch,
        matchId: match.Id,
        teamsId: filteredTeams.map((t) => t.TeamId),
        date: formatDateTime(match.MatchDate),
        teamsName: filteredTeams.map((t) => t.TeamName),
        court: match.Court,
        set11: games[0]?.toString(),
        set21: games[2]?.toString(),
        set31: games[4]?.toString(),
        set12: games[1]?.toString(),
        set22: games[3]?.toString(),
        set32: games[5]?.toString(),
      }));
      onClick();
    }
  };

  return (
    <Wrapper>
      <Container mWidth={40} mHeight={10}>
        <Column2x>
          {match.TeamsName != null && match.TeamsName.length >= 2 && (
            <>
              <MatchBox teamName={filteredTeams[0].TeamName} />
              <HorizontalLine thickness="0.1rem" color={black} />
              <MatchBox teamName={filteredTeams[1].TeamName} />
            </>
          )}
        </Column2x>
        <Column2x>
          <Box2>
            <MatchText>{games[0]?.toString()}</MatchText>
            <MatchText>{games[2]?.toString()}</MatchText>
            <MatchText>{games[4]?.toString()}</MatchText>
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
            <MatchText>{games[1]?.toString()}</MatchText>
            <MatchText>{games[3]?.toString()}</MatchText>
            <MatchText>{games[5]?.toString()}</MatchText>
          </Box2>
        </Column2x>
        <Column4>
          <Column4Text>Fecha: {formatDateTime(match.MatchDate)}</Column4Text>
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
          <Column4Text>Cancha: {match.Court}</Column4Text>
        </Column4>
      </Container>
      {onClick && (
        <>
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
              onClick={handleEdit}
            />
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Match;
