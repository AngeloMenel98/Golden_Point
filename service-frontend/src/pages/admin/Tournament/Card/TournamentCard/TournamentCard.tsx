import React, { useRef, useState } from "react";
import Card from "../../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../../utils/colors";
import TournamentRow from "../../Row/TournamentRow";
import { TournamentDTO } from "../../../../../entities/dtos/TournamentDTO";
import OptsModal from "../../Modal/OptionsModal/OptionsModal";
import ManagerModal from "../../Modal/ManagerModal/ManagerModal";
import DeleteTeam from "../../Modal/DeleteTeam/DeleteTeam";
import { CardContainer } from "./TournamentCardStyle";

interface TournamentCardProps {
  tournaments: TournamentDTO[];
  tournamentTitle: string;
  error: string;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  tournaments,
  tournamentTitle,
  error,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [tournSelected, setTournSelected] = useState<TournamentDTO>(
    new TournamentDTO()
  );

  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  const filteredTourns = tournaments.filter((tourn) =>
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

  return (
    <CardContainer>
      <Card
        backgroundCol={white}
        borderCol={darkGreen}
        boxCol={pastelGreen}
        mWidth={1200}
        mHeight={1000}
        error={error}
      >
        {filteredTourns.map((tourn, index) => (
          <TournamentRow
            key={index}
            ref={(el) => (rowRefs.current[index] = el)}
            tournData={tourn}
            onOpen={() => handleOpenModal(index, tourn)}
          />
        ))}
      </Card>

      {isModalOpen && (
        <OptsModal
          open={isModalOpen}
          width={180}
          onAddTeam={managerModalOpen}
          onDeleteTeam={deleteTeamOpen}
          onClose={handleCloseModal}
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
        <DeleteTeam onClose={deleteTeamClose} tournamentId={tournSelected.Id} />
      )}
    </CardContainer>
  );
};

export default TournamentCard;
