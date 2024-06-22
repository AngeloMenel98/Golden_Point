import React from "react";
import { UsersContainer } from "./TeamCardStyle";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";

import { TeamDTO } from "../../../../../entities/dtos/TeamDTO";
import TeamsButton from "../../../../../components/buttons/TeamsButton/TeamsButton";

interface TeamsCardProps {
  name: string;
  error?: string;
  deletedTeams: (teams: TeamDTO) => void;
  allTeams: TeamDTO[];
  selectedTeams: TeamDTO[];
}

const TeamsCard: React.FC<TeamsCardProps> = ({
  error,
  name,
  deletedTeams,
  allTeams,
  selectedTeams,
}) => {
  const filteredTeams = allTeams.filter((team: TeamDTO) =>
    team.TeamName.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <Card
      backgroundCol={white}
      borderCol={darkGreen}
      boxCol={pastelGreen}
      mWidth={600}
      mHeight={400}
      error={error}
    >
      <UsersContainer>
        {filteredTeams.map((team, index) => (
          <TeamsButton
            key={index}
            team={team}
            text={team.TeamName}
            onClick={deletedTeams}
            isSelected={selectedTeams.includes(team)}
          />
        ))}
      </UsersContainer>
    </Card>
  );
};

export default TeamsCard;
