import React from "react";
import { UsersContainer } from "./UsersCardStyle";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";

import UsersButton from "../../../../../components/buttons/UsersButton/UsersButton";
import { UserDTO } from "../../../../../entities/dtos/UserDTO";
import UserCircleIcon from "../../../../../icons/UserCircleIcon/UserCircleIcon";
import BouncingCircles from "../../../../../components/spinner/spinner";

interface UsersCardProps {
  users: UserDTO[];
  name: string;
  error: string;
  addPlayers: (player: UserDTO) => void;
  selectedPlayers: UserDTO[];
}

const UsersCard: React.FC<UsersCardProps> = ({
  users,
  error,
  name,
  addPlayers,
  selectedPlayers,
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
      mHeight={300}
    >
      <UsersContainer>
        {filteredUsers.map((user, index) => (
          <UsersButton
            key={index}
            user={user}
            text={user.FirstName + " " + user.LastName}
            icon={<UserCircleIcon width={20} height={20} color={pastelGreen} />}
            onClick={addPlayers}
            isSelected={selectedPlayers.includes(user)}
          />
        ))}
      </UsersContainer>
      {filteredUsers.length === 0 && <BouncingCircles text="nuevos Usuarios" />}
    </Card>
  );
};

export default UsersCard;
