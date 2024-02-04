import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1706957591677 implements MigrationInterface {
    name = 'SchemaUpdate1706957591677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" SET DEFAULT 'Переглянуто'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "status" SET DEFAULT 'Не переглянуто'`);
    }

}
