import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1706954842091 implements MigrationInterface {
    name = 'SchemaUpdate1706954842091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."response_status_enum" RENAME TO "response_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."response_status_enum" AS ENUM('Не переглянуто', 'Переглянуто', 'Співбесіда', 'Відмова')`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" TYPE "public"."response_status_enum" USING "status"::"text"::"public"."response_status_enum"`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" SET DEFAULT 'Не переглянуто'`);
        await queryRunner.query(`DROP TYPE "public"."response_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."response_status_enum_old" AS ENUM('Не прочитано', 'Прочитано', 'Співбесіда', 'Відмова')`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" TYPE "public"."response_status_enum_old" USING "status"::"text"::"public"."response_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" SET DEFAULT 'Не прочитано'`);
        await queryRunner.query(`DROP TYPE "public"."response_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."response_status_enum_old" RENAME TO "response_status_enum"`);
    }

}
