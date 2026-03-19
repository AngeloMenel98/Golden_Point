import { CourtRepository } from "../repository";
import { notFound } from "../types/error/app-error";

export class CourtService {
  constructor() {}

  async findById(courtId: string) {
    const existingCourt = await CourtRepository.findOneBy({
      id: courtId,
    });

    if (!existingCourt) {
      throw notFound("Court", courtId);
    }

    return existingCourt;
  }
}
