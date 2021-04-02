import {PrimaryGeneratedColumn, Column, Entity, BaseEntity, CreateDateColumn} from 'typeorm';

@Entity()
export default class User extends BaseEntity {
	constructor(options: Partial<User>) {
		super();

		Object.assign(this, options);
	}

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({unique: true})
	email: string;

	@Column()
	password: string;

	@CreateDateColumn({type: 'timestamp with time zone'})
	creationDate: Date;
}
