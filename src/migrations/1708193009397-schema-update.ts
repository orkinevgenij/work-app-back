import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1708193009397 implements MigrationInterface {
    name = 'SchemaUpdate1708193009397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ADD "time" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "time"`);
    }

}
