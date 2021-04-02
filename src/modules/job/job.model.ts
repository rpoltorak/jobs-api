import {PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, CreateDateColumn, JoinColumn} from 'typeorm';

import JobCategory from '../jobCategory/jobCategory.model';
import EmploymentType from '../employmentType/employmentType.model';
import User from '../user/user.model';
import Company from '../company/company.model';

@Entity()
export default class Job extends BaseEntity {
	constructor(options: Partial<Job>) {
		super();

		Object.assign(this, options);
	}

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, {onDelete: 'CASCADE'})
	user: User;

	@Column({nullable: true})
	userId: string;

	@ManyToOne(() => Company, {onDelete: 'CASCADE'})
	@JoinColumn()
	company: Company;

	@Column({nullable: true})
	companyId: number;

	@ManyToOne(() => JobCategory, {onDelete: 'CASCADE'})
	@JoinColumn()
	category: JobCategory;

	@Column({nullable: true})
	categoryId: number;

	@ManyToOne(() => EmploymentType, {onDelete: 'CASCADE'})
	@JoinColumn()
	employmentType: EmploymentType;

	@Column({nullable: true})
	employmentTypeId: number;

	@Column()
	title: string;

	@Column()
	salaryFrom: number;

	@Column()
	salaryTo: number;

	@Column()
	description: string;

	@Column()
	applyUrl: string;

	@Column()
	applyEmail: string;

	@CreateDateColumn({type: 'timestamp with time zone'})
	creationDate: Date;
}
