import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1707942236856 implements MigrationInterface {
    name = 'SchemaUpdate1707942236856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ADD "age" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "age"`);
    }

}
