import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateCategoryInTaskEntity1713289185300
    implements MigrationInterface
{
    name = 'UpdateCategoryInTaskEntity1713289185300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "task" DROP CONSTRAINT "FK_586dfdcae7fab5d9723506049a7"`
        )
        await queryRunner.query(
            `ALTER TABLE "task" ALTER COLUMN "categoryId" SET NOT NULL`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "task" ALTER COLUMN "categoryId" DROP NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "task" ADD CONSTRAINT "FK_586dfdcae7fab5d9723506049a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
    }
}
