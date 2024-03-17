import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserEntity1707847086929 implements MigrationInterface {
    name = 'AlterCategoryAddTimestamp1707847086929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_category" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "project_category" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "project_category" DROP COLUMN "created_at"`);
    }

}
