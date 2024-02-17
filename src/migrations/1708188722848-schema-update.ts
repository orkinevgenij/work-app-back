import { MigrationInterface, QueryRunner } from 'typeorm'

export class SchemaUpdate1708188722848 implements MigrationInterface {
  name = 'SchemaUpdate1708188722848'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "resume" ADD "last" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "last"`)
  }
}
