import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTaskStatusEnum1710764499517 implements MigrationInterface {
    name = 'UpdateTaskStatusEnum1710764499517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'Upcoming'`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'OPEN'`
        )
    }
}
