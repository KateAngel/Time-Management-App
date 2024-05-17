import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEventEntity1715774112367 implements MigrationInterface {
    name = 'CreateEventEntity1715774112367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_aa081bcf5454a6dfa5533fcea47"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_1fc0476407562dc81a231ed21a0"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_78bee1bfeebb6e746a57981b0c1"`);
        await queryRunner.query(`CREATE TYPE "public"."event_status_enum" AS ENUM('Draft', 'Published', 'Cancelled')`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "allDay" boolean NOT NULL DEFAULT false, "status" "public"."event_status_enum" NOT NULL DEFAULT 'Draft', "isDeleted" boolean NOT NULL DEFAULT false, "isArchived" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "project_id_seq" OWNED BY "project"."id"`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "id" SET DEFAULT nextval('"project_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TYPE "public"."project_title_status_enum" RENAME TO "project_title_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."project_status_enum" AS ENUM('Upcoming', 'In progress', 'On hold', 'Completed', 'Cancelled', 'Reopened')`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "status" TYPE "public"."project_status_enum" USING "status"::"text"::"public"."project_status_enum"`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "status" SET DEFAULT 'Upcoming'`);
        await queryRunner.query(`DROP TYPE "public"."project_title_status_enum_old"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "category_id_seq" OWNED BY "category"."id"`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" SET DEFAULT nextval('"category_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_3caef906211aad45559039f11f9" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_3caef906211aad45559039f11f9"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" SET DEFAULT nextval('project_category_id_seq')`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "category_id_seq"`);
        await queryRunner.query(`CREATE TYPE "public"."project_title_status_enum_old" AS ENUM('Upcoming', 'In progress', 'On hold', 'Completed', 'Cancelled', 'Reopened')`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "status" TYPE "public"."project_title_status_enum_old" USING "status"::"text"::"public"."project_title_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "status" SET DEFAULT 'Upcoming'`);
        await queryRunner.query(`DROP TYPE "public"."project_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."project_title_status_enum_old" RENAME TO "project_title_status_enum"`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "id" SET DEFAULT nextval('project_title_id_seq')`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "project_id_seq"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TYPE "public"."event_status_enum"`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_78bee1bfeebb6e746a57981b0c1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_1fc0476407562dc81a231ed21a0" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_aa081bcf5454a6dfa5533fcea47" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
