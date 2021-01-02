/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1597626060118 implements MigrationInterface {
  name = 'Initial1597626060118'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "toast" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "amount" integer NOT NULL, "category" integer NOT NULL, CONSTRAINT "PK_ee89b986d0d14d9367957c2803f" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "toast"`)
  }
}
