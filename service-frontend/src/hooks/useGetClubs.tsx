import { useEffect, useState } from "react";
import { ClubDTO } from "../entities/dtos/ClubDTO";
import ClubAPI from "../services/ClubApi";

const clubAPI = new ClubAPI();

export default function useGetClubs() {
  const [allClubs, setAllClubs] = useState<ClubDTO[]>([]);

  const getClubs = async () => {
    const clubArray: ClubDTO[] = [];
    const clubRes = await clubAPI.getClubs();

    clubRes.forEach((c: any) => {
      const club = new ClubDTO();

      club.Id = c.id;
      club.ClubName = c.clubName;
      club.Address = c.address;
      club.CourtCount = c.courtcount;
      club.AvFrom = c.availableFrom;
      club.AvTo = c.availableTo;

      clubArray.push(club);
    });

    setAllClubs(clubArray);
  };

  const addClubToState = (newClub: ClubDTO) => {
    setAllClubs((prevClubs) => [...prevClubs, newClub]);
  };

  useEffect(() => {
    getClubs();
  }, []);

  return { allClubs, addClubToState };
}
