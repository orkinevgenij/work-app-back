import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1708187806306 implements MigrationInterface {
    name = 'SchemaUpdate1708187806306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ADD "last" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "last"`);
    }

}
