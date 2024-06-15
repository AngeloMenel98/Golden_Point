import React, { useRef, useState } from "react";
import Card from "../../../../components/card/Card";
import { darkGreen, pastelGreen, white } from "../../../../utils/colors";
import { CardContainer } from "./TournamentCardStyle";
import TournamentRow from "../Row/TournamentRow";
import { TournamentDTO } from "../../../../entities/dtos/TournamentDTO";
import TournamentAPI from "../../../../services/TournamentApi";
import OptsModal from "../Modal/OptionsModal/OptionsModal";
import ManagerModal from "../Modal/ManagerModal/ManagerModal";

interface TournamentCardProps {
  tournaments: TournamentDTO[];
  tournamentTitle: string;
  tournApi: TournamentAPI;
  error: string;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  tournaments,
  tournamentTitle,
  tournApi,
  error,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  const filteredTourns = tournaments.filter((tourn) =>
    tourn.Title.toLowerCase().includes(tournamentTitle.toLowerCase())
  );

  const handleOpenModal = (index: number) => {
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
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenAddTeamModal = () => {
    setIsManagerOpen(true);
  };

  const handleCloseAddTeamModal = () => {
    setIsManagerOpen(false);
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
            tournApi={tournApi}
            onOpen={() => handleOpenModal(index)}
            onClose={handleCloseModal}
          />
        ))}
      </Card>

      {isModalOpen && (
        <OptsModal
          open={isModalOpen}
          width={180}
          onAddTeam={handleOpenAddTeamModal}
          onClose={handleCloseModal}
          position={modalPosition}
        />
      )}

      {isManagerOpen && <ManagerModal onClose={handleCloseAddTeamModal} />}
    </CardContainer>
  );
};

export default TournamentCard;
