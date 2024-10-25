import React from "react";
import { UsersContainer } from "./UsersCardStyle";
import Card from "../../../../../components/card/Card";
import {
  black,
  darkGreen,
  pastelGreen,
  white,
} from "../../../../../utils/colors";

import UsersButton from "../../../../../components/buttons/UsersButton/UsersButton";
import { UserDTO } from "../../../../../entities/dtos/UserDTO";
import UserCircleIcon from "../../../../../icons/UserCircleIcon/UserCircleIcon";
import BouncingCircles from "../../../../../components/spinner/spinner";

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
      {error && <p style={{ color: black }}>{error}</p>}

      {filteredUsers.length === 0 && <BouncingCircles text="nuevos Usuarios" />}
    </Card>
  );
};

export default UsersCard;
