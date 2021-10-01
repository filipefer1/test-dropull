import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAsset1633042483851 implements MigrationInterface {
    name = 'CreateAsset1633042483851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "asset" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "destination" character varying NOT NULL, "ipfsHash" character varying NOT NULL, "pinSize" integer NOT NULL, "ipfsTimestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "asset"`);
    }

}
