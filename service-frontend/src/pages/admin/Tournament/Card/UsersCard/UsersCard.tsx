import React from "react";
import { UsersContainer } from "./UsersCardStyle";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";

import UsersButton from "../../../../../components/buttons/UsersButton/UsersButton";
import { UserDTO } from "../../../../../entities/dtos/UserDTO";
import UserCircleIcon from "../../../../../icons/UserCircleIcon/UserCircleIcon";

interface UsersCardProps {
  users: UserDTO[];
  name: string;
  error: string;
}

const UsersCard: React.FC<UsersCardProps> = ({ users, error, name }) => {
  const filteredUsers = users.filter(
    (user) =>
      user.LastName.toLowerCase().includes(name.toLowerCase()) ||
      user.FirstName.toLowerCase().includes(name.toLowerCase())
  );
  return (
    <Card
      bgColor={white}
      borderColor={darkGreen}
      boxColor={pastelGreen}
      width={600}
      maxHeight={350}
      error={error}
    >
      <UsersContainer>
        {filteredUsers.map((user, index) => (
          <UsersButton
            key={index}
            user={user}
            text={user.FirstName + " " + user.LastName}
            icon={<UserCircleIcon width={20} height={20} color={pastelGreen} />}
          />
        ))}
      </UsersContainer>
    </Card>
  );
};

export default UsersCard;
