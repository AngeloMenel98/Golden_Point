import { Club } from "../../entity/Club";

export type ClubResponse = {
  id: string;
  clubName: string;
  location: string;
};

export type ClubCreateRequest = Pick<Club, "clubName" | "location">;
