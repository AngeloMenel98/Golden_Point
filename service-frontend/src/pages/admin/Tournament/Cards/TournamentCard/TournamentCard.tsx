import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";
import TournamentRow from "../../Row/TournamentRow";
import { TournamentDTO } from "../../../../../entities/dtos/TournamentDTO";
import OptsModal from "../../Modals/OptionsModal/OptionsModal";
import ManagerModal from "../../Modals/ManagerModal/ManagerModal";
import DeleteTeam from "../../Modals/DeleteTeam/DeleteTeam";
import { CardContainer } from "./TournamentCardStyle";
import TournamentAPI, {
  DeletedTournament,
} from "../../../../../services/TournamentApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxSlices/store";
import BouncingCircles from "../../../../../components/spinner/spinner";

interface TournamentCardProps {
  tournaments: TournamentDTO[];
  tournamentTitle: string;
  error: string | undefined;
  refetch: () => void;
  setShFooter: Dispatch<SetStateAction<boolean>>;
}

const tournamentAPI = new TournamentAPI();

const TournamentCard: React.FC<TournamentCardProps> = ({
  tournaments: initialTourns,
  tournamentTitle,
  error,
  refetch,
  setShFooter,
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [tourns, setTourns] = useState<TournamentDTO[]>(initialTourns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [tournSelected, setTournSelected] = useState<TournamentDTO>(
    new TournamentDTO()
  );

  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });

  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  const filteredTourns = tourns.filter((tourn) =>
    tourn.Title.toLowerCase().includes(tournamentTitle.toLowerCase())
  );

  const handleOpenModal = (index: number, tournament: TournamentDTO) => {
    const rowRef = rowRefs.current[index];
    if (rowRef) {
      const rect = rowRef.getBoundingClientRect();
      rect;
      setModalPosition({
        top: rect.bottom,
        right: rect.left,
      });
      setIsModalOpen(true);
    }
    setTournSelected(tournament);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const managerModalOpen = () => {
    setIsManagerOpen(true);
  };

  const handleCloseAddTeamModal = () => {
    setIsManagerOpen(false);
  };

  const deleteTeamOpen = () => {
    setIsDeleteOpen(true);
  };

  const deleteTeamClose = () => {
    setIsDeleteOpen(false);
  };

  const startTournament = async () => {
    const start: DeletedTournament = {
      tournamentId: tournSelected.Id,
      userId: user?.Id,
    };
    const res = await tournamentAPI.startTournament(start);

    if (!res.fieldErrors) {
      tournSelected.Status = "inProgress";
      setShFooter(true);
    } else {
      alert("Error al iniciar torneo");
    }

    handleCloseModal();
  };

  const onDelete = async (tourn: TournamentDTO) => {
    const deleteTourn: DeletedTournament = {
      tournamentId: tourn.Id,
      userId: user?.Id,
    };
    const res = await tournamentAPI.deleteTournament(deleteTourn);

    if (!res.fieldErrors) {
      setTourns((prevTourns) => prevTourns.filter((t) => t.Id !== tourn.Id));
      refetch();
    } else {
      alert("Error al eliminar torneo");
    }
  };

  return (
    <CardContainer>
      <Card
        backgroundCol={white}
        borderCol={darkGreen}
        boxCol={pastelGreen}
        mWidth={1200}
        mHeight={1000}
      >
        {error && <BouncingCircles text="la creación de un Torneo" />}
        {filteredTourns.map((tourn, index) => (
          <TournamentRow
            key={index}
            ref={(el) => (rowRefs.current[index] = el)}
            tournData={tourn}
            onOpen={() => handleOpenModal(index, tourn)}
            onDelete={() => onDelete(tourn)}
          />
        ))}
        {filteredTourns.length === 0 && (
          <BouncingCircles text="nuevos Torneos" />
        )}
      </Card>

      {isModalOpen && (
        <OptsModal
          open={isModalOpen}
          width={180}
          onAddTeam={managerModalOpen}
          onDeleteTeam={deleteTeamOpen}
          onStartTournament={startTournament}
          onClose={handleCloseModal}
          isActive={tournSelected.Status}
          position={modalPosition}
        />
      )}

      {isManagerOpen && (
        <ManagerModal
          onClose={handleCloseAddTeamModal}
          tournament={tournSelected}
        />
      )}

      {isDeleteOpen && (
        <DeleteTeam onClose={deleteTeamClose} tournament={tournSelected} />
      )}
    </CardContainer>
  );
};

export default TournamentCard;
