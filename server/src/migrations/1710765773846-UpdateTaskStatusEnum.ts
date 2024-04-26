import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTaskStatusEnum1710765773846 implements MigrationInterface {
    name = 'UpdateTaskStatusEnum1710765773846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('Upcoming', 'In progress', 'On hold', 'Completed', 'Cancelled', 'Reopened')`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" "public"."task_status_enum" NOT NULL DEFAULT 'Upcoming'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" character varying NOT NULL DEFAULT 'OPEN'`);
    }

}
