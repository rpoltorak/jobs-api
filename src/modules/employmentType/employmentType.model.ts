import {PrimaryGeneratedColumn, Column, Entity, BaseEntity} from 'typeorm';

@Entity()
export default class EmploymentType extends BaseEntity {
	constructor(options: Partial<EmploymentType>) {
		super();

		Object.assign(this, options);
	}

	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true})
	name: string;
}
