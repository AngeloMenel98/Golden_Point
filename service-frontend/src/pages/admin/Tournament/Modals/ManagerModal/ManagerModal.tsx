import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxSlices/store";
import UsersModal from "../../../../../components/userModal/UsersModal";
import { useState } from "react";
import AddTeamModal from "../AddTeam/AddTeam";
import { UserDTO } from "../../../../../entities/dtos/UserDTO";
import { TournamentDTO } from "../../../../../entities/dtos/TournamentDTO";

interface ManagerProps {
  tournament: TournamentDTO;
  onClose: () => void;
}

export interface CreationData {
  category: string;
  usersId: string[];
}

const ManagerModal: React.FC<ManagerProps> = ({ tournament, onClose }) => {
  const tour = useSelector((state: RootState) => state.tour.tour);

  const [activeModal, setActiveModal] = useState<number>(0);
  const [players, setPlayers] = useState<UserDTO[]>([]);

  const onNext = () => {
    setActiveModal((prev) => prev + 1);
  };

  const handlePlayersChange = (selectedPlayers: any) => {
    setPlayers(selectedPlayers);
  };

  return (
    <>
      <UsersModal
        tourId={tour?.Id}
        onClose={onClose}
        isAddTeam={true}
        onNext={onNext}
        onPlayersChange={handlePlayersChange}
      />
      {activeModal == 1 && (
        <AddTeamModal
          onClose={onClose}
          players={players}
          tournament={tournament}
        />
      )}
    </>
  );
};

export default ManagerModal;
