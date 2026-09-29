import "reflect-metadata";

import { TourCoinRepository } from "../../src/repository/tourCoin.repository";
import { AppDataSource } from "../../src/data-source";
import { TourCoin } from "../../src/entity";

describe("TourCoinRepository - findByUserId", () => {
  let mockQueryBuilder: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryBuilder = (AppDataSource.getRepository(TourCoin) as any)
      .createQueryBuilder();
  });

  describe("findByUserId", () => {
    it("should find TourCoin by userId when exists", async () => {
      const mockTourCoin = {
        id: "tourcoin-1",
        coins: 100,
        user: { id: "user-123" },
      };

      mockQueryBuilder.getOne = jest.fn().mockResolvedValue(mockTourCoin);

      const result = await TourCoinRepository.findByUserId("user-123");

      expect(result).toEqual(mockTourCoin);
      expect(mockQueryBuilder.innerJoin).toHaveBeenCalled();
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        '"userId" = :userId',
        { userId: "user-123" }
      );
      expect(mockQueryBuilder.getOne).toHaveBeenCalled();
    });

    it("should return null when TourCoin does not exist for user", async () => {
      mockQueryBuilder.getOne = jest.fn().mockResolvedValue(null);

      const result = await TourCoinRepository.findByUserId("nonexistent-user");

      expect(result).toBeNull();
    });

    it("should find TourCoin for different userIds", async () => {
      const mockTourCoin = {
        id: "tourcoin-2",
        coins: 250,
        user: { id: "user-456" },
      };

      mockQueryBuilder.getOne = jest.fn().mockResolvedValue(mockTourCoin);

      const result = await TourCoinRepository.findByUserId("user-456");

      expect(result).toEqual(mockTourCoin);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        '"userId" = :userId',
        { userId: "user-456" }
      );
    });
  });
});
