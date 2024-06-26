import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterProjectAddStatus1708945782041 implements MigrationInterface {
    name = 'AlterProjectAddStatus1708945782041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "project" ADD "status" "public"."project_status_enum" NOT NULL DEFAULT 'Upcoming'`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "status"`)
    }
}
