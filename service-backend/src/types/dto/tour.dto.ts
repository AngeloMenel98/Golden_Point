import { Tour } from "../../entity/Tour";

export type TourResponse = Pick<Tour, "id" | "title" | "tourCode" | "isDeleted">;

export type TourCreateRequest = Pick<Tour, "title"> & {
  clubIds: string[];
};

export type TourJoinRequest = {
  tourCode: string;
};
