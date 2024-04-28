import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateProjectStatusEnum1708962333350
    implements MigrationInterface
{
    name = 'UpdateProjectStatusEnum1708962333350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TYPE "public"."project_status_enum" RENAME TO "project_status_enum_old"`
        )
        await queryRunner.query(
            `CREATE TYPE "public"."project_status_enum" AS ENUM('Upcoming', 'In progress', 'On hold', 'Completed', 'Cancelled', 'Reopened')`
        )
        await queryRunner.query(
            `ALTER TABLE "project" ALTER COLUMN "status" DROP DEFAULT`
        )
        await queryRunner.query(
            `ALTER TABLE "project" ALTER COLUMN "status" TYPE "public"."project_status_enum" USING "status"::"text"::"public"."project_status_enum"`
        )
        await queryRunner.query(
            `ALTER TABLE "project" ALTER COLUMN "status" SET DEFAULT 'Upcoming'`
        )
        await queryRunner.query(`DROP TYPE "public"."project_status_enum_old"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."project_status_enum_old" AS ENUM('In progress', 'Completed', 'Upcoming')`
        )
        await queryRunner.query(
            `ALTER TABLE "project" ALTER COLUMN "status" DROP DEFAULT`
        )
        await queryRunner.query(
            `ALTER TABLE "project" ALTER COLUMN "status" TYPE "public"."project_status_enum_old" USING "status"::"text"::"public"."project_status_enum_old"`
        )
        await queryRunner.query(
            `ALTER TABLE "project" ALTER COLUMN "status" SET DEFAULT 'Upcoming'`
        )
        await queryRunner.query(`DROP TYPE "public"."project_status_enum"`)
        await queryRunner.query(
            `ALTER TYPE "public"."project_status_enum_old" RENAME TO "project_status_enum"`
        )
    }
}
