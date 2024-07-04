import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720093509254 implements MigrationInterface {
  name = "Migration1720093509254";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "role" character varying(100) NOT NULL, "userChatID" uuid NOT NULL, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "famousPerson" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "description" character varying(256) NOT NULL, CONSTRAINT "PK_87889b64bd3aa3e6401e8880972" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE INDEX "famous_people_idx" ON "famousPerson" ("name") `);
    await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(320) NOT NULL, "password" character varying(256) NOT NULL, "referralCode" character varying(60) NOT NULL, "questionLeft" integer NOT NULL, "subscribed" boolean NOT NULL, "nextPayment" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_bf0e513b5cd8b4e937fa0702311" UNIQUE ("referralCode"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE INDEX "user_email_idx" ON "user" ("email") `);
    await queryRunner.query(`CREATE INDEX "user_ref_idx" ON "user" ("referralCode") `);
    await queryRunner.query(`CREATE TABLE "userChat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "famousPersonID" integer NOT NULL, "userID" uuid NOT NULL, "chatID" character varying NOT NULL, CONSTRAINT "REL_61dabf71a954c6637ae1d223a3" UNIQUE ("famousPersonID"), CONSTRAINT "PK_e55e6801e120b9747ea6729f024" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE INDEX "user_id_idx" ON "userChat" ("userID") `);
    await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_24306cdd4f5069c6b0101111494" FOREIGN KEY ("userChatID") REFERENCES "userChat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "userChat" ADD CONSTRAINT "FK_3f93542cce1270d645be17eceea" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "userChat" ADD CONSTRAINT "FK_61dabf71a954c6637ae1d223a3a" FOREIGN KEY ("famousPersonID") REFERENCES "famousPerson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "userChat" DROP CONSTRAINT "FK_61dabf71a954c6637ae1d223a3a"`);
    await queryRunner.query(`ALTER TABLE "userChat" DROP CONSTRAINT "FK_3f93542cce1270d645be17eceea"`);
    await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_24306cdd4f5069c6b0101111494"`);
    await queryRunner.query(`DROP INDEX "public"."user_id_idx"`);
    await queryRunner.query(`DROP TABLE "userChat"`);
    await queryRunner.query(`DROP INDEX "public"."user_ref_idx"`);
    await queryRunner.query(`DROP INDEX "public"."user_email_idx"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP INDEX "public"."famous_people_idx"`);
    await queryRunner.query(`DROP TABLE "famousPerson"`);
    await queryRunner.query(`DROP TABLE "chat"`);
  }
}
