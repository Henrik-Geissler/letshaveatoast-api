/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { MigrationInterface, QueryRunner } from 'typeorm'

export class ToastMessage1597626060119 implements MigrationInterface {
  name = 'ToastMessage1597626060119'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      ALTER TABLE "toast" ADD COLUMN "message" character varying;
      UPDATE "toast" SET "message" = "";
      ALTER TABLE "toast" ALTER COLUMN "message" SET NOT NULL;
`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "toast"`)
  }
}
