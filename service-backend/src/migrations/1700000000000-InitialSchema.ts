import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  name = 'InitialSchema1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX "IDX_SET_MATCH" ON "set" ("matchId")`);
    await queryRunner.query(`CREATE INDEX "IDX_NOTIFICATION_USER" ON "notification" ("userId")`);
    await queryRunner.query(`CREATE INDEX "IDX_TEAM_TOURNAMENT" ON "team" ("tournamentId")`);
    await queryRunner.query(`CREATE INDEX "IDX_TOURNAMENT_STATUS_DELETED" ON "tournament" ("status", "isDeleted")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_SET_MATCH"`);
    await queryRunner.query(`DROP INDEX "IDX_NOTIFICATION_USER"`);
    await queryRunner.query(`DROP INDEX "IDX_TEAM_TOURNAMENT"`);
    await queryRunner.query(`DROP INDEX "IDX_TOURNAMENT_STATUS_DELETED"`);
  }
}
