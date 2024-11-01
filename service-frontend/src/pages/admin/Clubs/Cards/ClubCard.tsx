import { useEffect, useState } from "react";
import BouncingCircles from "../../../../components/spinner/spinner";
import { ClubDTO } from "../../../../entities/dtos/ClubDTO";
import { CardContainer, ClubContainer } from "./ClubCardStyle";
import ClubInfo from "../../../../components/card/ClubCard/ClubInfoCard";
import EditClub from "../Modals/EditClub";
import ClubAPI, { UpdateClub } from "../../../../services/ClubApi";

interface CardProps {
  clubs: ClubDTO[];
  clubName: string;
  error: string | undefined;
  refetch: () => void;
}

const clubApi = new ClubAPI();

const ClubCard: React.FC<CardProps> = ({
  clubs: initialClubs,
  clubName,
  error,
  refetch,
}) => {
  const [clubs, setClubs] = useState<ClubDTO[]>(initialClubs);
  const [selectedClub, setSelectedClub] = useState<ClubDTO | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = (club: ClubDTO) => {
    setSelectedClub(club);
    setIsModalOpen(true);
  };

  const handleSave = async (club: UpdateClub) => {
    const res = await clubApi.updateClub(club);
    if (!res.fieldErrors) {
      refetch();
    } else {
      alert("Error al actualizar");
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setClubs(initialClubs);
  }, [initialClubs]);

  const filteredClubs = clubs.filter((club) =>
    club.ClubName.toLowerCase().includes(clubName.toLowerCase())
  );

  return (
    <CardContainer>
      {(filteredClubs.length === 0 || error) && (
        <BouncingCircles text="nuevos Clubs" />
      )}
      <ClubContainer>
        <ClubInfo clubsData={filteredClubs} onClick={handleOpen} />
      </ClubContainer>
      {isModalOpen && selectedClub && (
        <EditClub
          club={selectedClub}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </CardContainer>
  );
};

export default ClubCard;
