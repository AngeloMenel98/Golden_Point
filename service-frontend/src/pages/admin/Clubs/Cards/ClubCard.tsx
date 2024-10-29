import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxSlices/store";
import BouncingCircles from "../../../../components/spinner/spinner";
import { ClubDTO } from "../../../../entities/dtos/ClubDTO";
import { CardContainer, ClubContainer } from "./ClubCardStyle";
import ClubInfo from "../../../../components/card/ClubCard/ClubInfoCard";

interface CardProps {
  clubs: ClubDTO[];
  clubName: string;
  error: string | undefined;
  refetch: () => void;
}

const ClubCard: React.FC<CardProps> = ({
  clubs: initialClubs,
  clubName,
  error,
  refetch,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [clubs, setClubs] = useState<ClubDTO[]>(initialClubs);

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
        <ClubInfo clubsData={filteredClubs} />
      </ClubContainer>
    </CardContainer>
  );
};

export default ClubCard;
