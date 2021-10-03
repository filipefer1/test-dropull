import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateNft1633133092933 implements MigrationInterface {
    name = 'CreateNft1633133092933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nft" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "hash" character varying, "assetId" uuid, CONSTRAINT "PK_8f46897c58e23b0e7bf6c8e56b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "nft" ADD CONSTRAINT "FK_19ff74f3fd2c8dc6a9af70a1889" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_19ff74f3fd2c8dc6a9af70a1889"`);
        await queryRunner.query(`DROP TABLE "nft"`);
    }

}
