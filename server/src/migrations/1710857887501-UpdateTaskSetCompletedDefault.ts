import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTaskSetCompletedDefault1710857887501 implements MigrationInterface {
    name = 'UpdateTaskSetCompletedDefault1710857887501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "isCompleted" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "isCompleted" DROP DEFAULT`);
    }

}
