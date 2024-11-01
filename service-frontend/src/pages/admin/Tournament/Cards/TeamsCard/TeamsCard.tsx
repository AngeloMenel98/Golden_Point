import React from "react";
import { UsersContainer } from "./TeamsCardStyle";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";

import { TeamDTO } from "../../../../../entities/dtos/TeamDTO";
import TeamsButton from "../../../../../components/buttons/TeamsButton/TeamsButton";
import BouncingCircles from "../../../../../components/spinner/spinner";

interface TeamsCardProps {
  name: string;
  error?: string;
  deletedTeams: (teams: TeamDTO) => void;
  allTeams: TeamDTO[];
  selectedTeams: TeamDTO[];
}

const TeamsCard: React.FC<TeamsCardProps> = ({
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
      {filteredTeams.length === 0 && (
        <BouncingCircles text="que se agregue el equipo" />
      )}
    </Card>
  );
};

export default TeamsCard;
