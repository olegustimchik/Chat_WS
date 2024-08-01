import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1722511701431 implements MigrationInterface {
    name = 'Migration1722511701431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "role" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "role" character varying(100) NOT NULL`);
    }

}
