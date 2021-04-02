import {MigrationInterface, QueryRunner} from 'typeorm';

export class InitialSetup1590957423495 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`INSERT INTO job_category("id", "name") VALUES (DEFAULT, 'IT'), (DEFAULT, 'Graphics'), (DEFAULT, 'Media'), (DEFAULT, 'Office'), (DEFAULT, 'Copywriting')`
		);
		await queryRunner.query(
			`INSERT INTO employment_type("id", "name") VALUES (DEFAULT, 'B2B'), (DEFAULT, 'Employment contract')`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE FROM job_category WHERE job_category.name IN ('IT', 'Media')`);
		await queryRunner.query(
			`DELETE FROM employment_type WHERE job_category.name IN ('IT', 'Graphics', 'Media', 'Office', 'Copywriting')`
		);
	}
}
