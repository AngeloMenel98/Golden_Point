import { AppDataSource } from "../data-source";
import { TourCoin } from "../entity";

export const TourCoinRepository = AppDataSource.getRepository(TourCoin).extend({
  async findByUserId(userId: string): Promise<TourCoin | null> {
    return this.createQueryBuilder("tourCoin")
      .innerJoin("tourCoin.user", "user")
      .where('"userId" = :userId', { userId })
      .getOne();
  },

  async upsertCoins(userId: string, amount: number): Promise<void> {
    await this.createQueryBuilder()
      .update(TourCoin)
      .set({ coins: () => `coins + ${amount}` })
      .where("userId = :userId", { userId })
      .execute();
  },
});
