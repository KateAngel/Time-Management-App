import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddedUserEntity1706308384408 implements MigrationInterface {
    name = 'AddedUserEntity1706308384408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`)
    }
}
