import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserEntity1705856762353 implements MigrationInterface {
    name = 'AddedUserEntity1705856762353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "verificationCode" text`);
        await queryRunner.query(`CREATE INDEX "verificationCode_index" ON "users" ("verificationCode") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."verificationCode_index"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verificationCode"`);
    }

}
