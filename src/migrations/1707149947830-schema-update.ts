import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1707149947830 implements MigrationInterface {
    name = 'SchemaUpdate1707149947830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "response" ADD "test" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "response" DROP COLUMN "test"`);
    }

}
