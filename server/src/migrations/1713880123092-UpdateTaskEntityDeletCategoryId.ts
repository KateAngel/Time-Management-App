import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTaskEntityDeletCategoryId1713880123092 implements MigrationInterface {
    name = 'UpdateTaskEntityDeletCategoryId1713880123092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "categoryId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "categoryId" integer NOT NULL`);
    }

}
