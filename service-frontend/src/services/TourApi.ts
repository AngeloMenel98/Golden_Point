import GeneralAPI from "./GeneralApi";

export interface DeletedTour {
  tourId?: string;
  userId?: string;
}

export interface TourCredentials {
  userId?: string;
  clubsId: string[];
  title: string;
}

export interface JoinCredentials {
  userId?: string;
  tourCode: string;
}

interface TourData {
  id: string;
  title: string;
  tourCode: string;
}

class TourAPI extends GeneralAPI {
  async addTour(_newTour: TourCredentials): Promise<void> {
    await this.api.post("/tour/create", _newTour);
  }

  async getTours(_userId: string): Promise<unknown[]> {
    const res = await this.api.get(`/tours/${_userId}`);
    return res as unknown as unknown[];
  }

  async deleteTour(_deletedTour: DeletedTour): Promise<{ id: string }> {
    const res = await this.api.post("/tour/delete", _deletedTour);
    return res as unknown as { id: string };
  }

  async joinUser(joinCredentials: JoinCredentials): Promise<TourData> {
    const res = await this.api.post("/tour/join", joinCredentials);
    return res as unknown as TourData;
  }
}

export default TourAPI;
