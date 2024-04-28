import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddedUserEntity1707495993844 implements MigrationInterface {
    name = 'CreateCategoryProjectTask1707495993844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."project_status_enum" AS ENUM('Upcoming', 'In progress', 'Completed')`
        )
        await queryRunner.query(
            `CREATE TABLE "project" ("id" SERIAL NOT NULL, "projectTitle" character varying NOT NULL, "description" character varying, "status" "public"."project_status_enum" NOT NULL DEFAULT 'Upcoming', "dueDate" TIMESTAMP NOT NULL, "userId" uuid, "categoryId" integer, CONSTRAINT "PK_eb62a5643974c033968fd8b5eb2" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "status" character varying NOT NULL DEFAULT 'OPEN', "dueDate" TIMESTAMP NOT NULL, "isCompleted" boolean NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "categoryId" integer, "projectId" integer, "userId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "category" ("id" SERIAL NOT NULL, "projectCategory" character varying NOT NULL, "description" character varying, "userId" uuid, CONSTRAINT "PK_826c5e0f45e35b5983c8379be7b" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `ALTER TABLE "project" ADD CONSTRAINT "FK_aa081bcf5454a6dfa5533fcea47" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "project" ADD CONSTRAINT "FK_1fc0476407562dc81a231ed21a0" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "task" ADD CONSTRAINT "FK_586dfdcae7fab5d9723506049a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "category" ADD CONSTRAINT "FK_78bee1bfeebb6e746a57981b0c1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "category" DROP CONSTRAINT "FK_78bee1bfeebb6e746a57981b0c1"`
        )
        await queryRunner.query(
            `ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`
        )
        await queryRunner.query(
            `ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`
        )
        await queryRunner.query(
            `ALTER TABLE "task" DROP CONSTRAINT "FK_586dfdcae7fab5d9723506049a7"`
        )
        await queryRunner.query(
            `ALTER TABLE "project" DROP CONSTRAINT "FK_1fc0476407562dc81a231ed21a0"`
        )
        await queryRunner.query(
            `ALTER TABLE "project" DROP CONSTRAINT "FK_aa081bcf5454a6dfa5533fcea47"`
        )
        await queryRunner.query(`DROP TABLE "category"`)
        await queryRunner.query(`DROP TABLE "task"`)
        await queryRunner.query(`DROP TABLE "project"`)
        await queryRunner.query(`DROP TYPE "public"."project_status_enum"`)
    }
}
