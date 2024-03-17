import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddedUserEntity1705695616987 implements MigrationInterface {
    name = 'AlterUserAddedColumnName1705695616987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "name" character varying`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`)
    }
}
