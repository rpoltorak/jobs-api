import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import User from '../user/user.model';

@Entity()
export default class Company extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	localization: string;

	@OneToOne(() => User)
	user: User;

	@Column({nullable: true})
	userId: string;

	@Column()
	websiteUrl: string;

	@Column({nullable: true})
	logoUrl: string;
}
