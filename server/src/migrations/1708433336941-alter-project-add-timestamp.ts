import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddedUserEntity1708433336941 implements MigrationInterface {
    name = 'AlterProjectAddTimestamp1708433336941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "project" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
        )
        await queryRunner.query(
            `ALTER TABLE "project" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "project" DROP COLUMN "updated_at"`
        )
        await queryRunner.query(
            `ALTER TABLE "project" DROP COLUMN "created_at"`
        )
    }
}
