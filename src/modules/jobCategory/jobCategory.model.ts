import {PrimaryGeneratedColumn, Column, Entity, BaseEntity} from 'typeorm';

@Entity()
export default class JobCategory extends BaseEntity {
	constructor(options: Partial<JobCategory>) {
		super();

		Object.assign(this, options);
	}

	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true})
	name: string;
}
