import { MigrationInterface, QueryRunner } from "typeorm";

export class InitRoles1722944436400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO role (name) VALUES ('user'), ('admin')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM role WHERE name IN ('user', 'admin')`);
  }
}
