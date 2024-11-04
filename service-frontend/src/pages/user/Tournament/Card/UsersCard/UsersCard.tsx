import React from "react";
import { UsersContainer } from "./UsersCardStyle";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";

import UsersButton from "../../../../../components/buttons/UsersButton/UsersButton";
import { UserDTO } from "../../../../../entities/dtos/UserDTO";
import UserCircleIcon from "../../../../../icons/UserCircleIcon/UserCircleIcon";
import BouncingCircles from "../../../../../components/spinner/spinner";
import { Note } from "../../../../admin/Tour/Cards/TourCardStyle";

interface UsersCardProps {
  users: UserDTO[];
  name: string;
  error: string;
  addPlayer: (player: UserDTO) => void;
  selectedPlayerId: string;
}

const UsersCard: React.FC<UsersCardProps> = ({
  users,
  name,
  addPlayer,
  error,
  selectedPlayerId,
}) => {
  const filteredUsers = users.filter(
    (user) =>
      user.LastName.toLowerCase().includes(name.toLowerCase()) ||
      user.FirstName.toLowerCase().includes(name.toLowerCase())
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
        {filteredUsers.map((user) => (
          <UsersButton
            key={user.Id}
            user={user}
            text={user.FirstName + " " + user.LastName}
            icon={<UserCircleIcon width={20} height={20} color={pastelGreen} />}
            onClick={addPlayer}
            isSelected={selectedPlayerId == user.Id}
          />
        ))}
      </UsersContainer>
      {error && <Note>{error}</Note>}

      {filteredUsers.length === 0 && <BouncingCircles text="nuevos Usuarios" />}
    </Card>
  );
};

export default UsersCard;
