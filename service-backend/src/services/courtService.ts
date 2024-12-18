import { CourtRepository } from "../repository";
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";

export class CourtService {
  constructor() {}

  async findById(courtId: string) {
    const existingCourt = await CourtRepository.findOneBy({
      id: courtId,
    });

    if (!existingCourt) {
      throw new ServiceCodeError(codeErrors.GEN_1("Court"));
    }

    return existingCourt;
  }
}
