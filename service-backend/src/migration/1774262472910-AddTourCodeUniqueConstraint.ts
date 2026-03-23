import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTourCodeUniqueConstraint1705426769784
    implements MigrationInterface
{
    name = "AddTourCodeUniqueConstraint1705426769784";

    public async up(queryRunner: QueryRunner): Promise<void> {
        // First, check for and handle any existing duplicate tourCodes
        const duplicates = await queryRunner.query(`
            SELECT "tourCode", COUNT(*) as count
            FROM tour
            WHERE "tourCode" IS NOT NULL
            GROUP BY "tourCode"
            HAVING COUNT(*) > 1
        `);

        if (duplicates.length > 0) {
            // Update duplicates to have unique codes by appending a suffix
            for (const duplicate of duplicates) {
                await queryRunner.query(`
                    UPDATE tour
                    SET "tourCode" = "tourCode" || '-' || "id"::text
                    WHERE "tourCode" = $1
                    AND "id" NOT IN (
                        SELECT MIN(id) FROM tour WHERE "tourCode" = $1
                    )
                `, [duplicate.tourCode]);
            }
        }

        // Add unique constraint
        await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_tour_tourCode" ON tour ("tourCode")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "UQ_tour_tourCode"
        `);
    }
}
