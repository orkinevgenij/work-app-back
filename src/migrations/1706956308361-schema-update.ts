import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1706956308361 implements MigrationInterface {
    name = 'SchemaUpdate1706956308361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" DROP NOT NULL`);
    }

}
