/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1597626060119 implements MigrationInterface {
  name = 'Initial1597626060119'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      ALTER TABLE "toast" ADD COLUMN "name" character varying;
      UPDATE "toast" SET "name" = "firstname";
      ALTER TABLE "toast" DROP COLUMN "lastname";
      ALTER TABLE "toast" DROP COLUMN "firstname";
      ALTER TABLE "toast" ALTER COLUMN "name" SET NOT NULL;
`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "toast"`)
  }
}
