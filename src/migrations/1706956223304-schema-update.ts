import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1706956223304 implements MigrationInterface {
    name = 'SchemaUpdate1706956223304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" SET NOT NULL`);
    }

}
