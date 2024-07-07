import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720271334513 implements MigrationInterface {
    name = 'Migration1720271334513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(256)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

}
