import {MigrationInterface, QueryRunner} from "typeorm";

export class Stats1608655452501 implements MigrationInterface {
    name = 'Stats1608655452501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stats" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name1" character varying NOT NULL, "name2" character varying NOT NULL, "name3" character varying NOT NULL, "name4" character varying NOT NULL, "name5" character varying NOT NULL, "name6" character varying NOT NULL, "name7" character varying NOT NULL, "name8" character varying NOT NULL, "name9" character varying NOT NULL, "name10" character varying NOT NULL, "nameSum1" integer NOT NULL, "nameSum2" integer NOT NULL, "nameSum3" integer NOT NULL, "nameSum4" integer NOT NULL, "nameSum5" integer NOT NULL, "nameSum6" integer NOT NULL, "nameSum7" integer NOT NULL, "nameSum8" integer NOT NULL, "nameSum9" integer NOT NULL, "nameSum10" integer NOT NULL, "category1" integer NOT NULL, "category2" integer NOT NULL, "category3" integer NOT NULL, "category4" integer NOT NULL, "category5" integer NOT NULL, "category6" integer NOT NULL, "category7" integer NOT NULL, "category8" integer NOT NULL, "category9" integer NOT NULL, "categorySum1" integer NOT NULL, "categorySum2" integer NOT NULL, "categorySum3" integer NOT NULL, "categorySum4" integer NOT NULL, "categorySum5" integer NOT NULL, "categorySum6" integer NOT NULL, "categorySum7" integer NOT NULL, "categorySum8" integer NOT NULL, "categorySum9" integer NOT NULL, CONSTRAINT "PK_c76e93dfef28ba9b6942f578ab1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stats"`);
    }

}
