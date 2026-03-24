export interface Club {
  id: string;
  name: string;
  address: string;
  courtCount: number;
  availableFrom: string;
  availableTo: string;
}

export interface ClubDTO {
  id: string;
  clubName: string;
  address: string;
  courtcount: number;
  availableFrom: string;
  availableTo: string;
}
