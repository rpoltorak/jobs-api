import {AuthenticationError, ApolloError} from 'apollo-server-express';
import bcrypt from 'bcrypt';

import User from '../user/user.model';
import {isAuthenticated} from '../../middleware';
import {Context} from '../../types';

export default {
	Mutation: {
		register,
		login,
		logout: isAuthenticated(logout)
	}
};

export async function register(_: any, args: {email: string; password: string; passwordConfirmation: string}) {
	const {email, password, passwordConfirmation} = args;

	if (password !== passwordConfirmation) {
		throw new AuthenticationError('Password does not match');
	}

	const user = await User.findOne({where: {email}});

	if (user) {
		throw new AuthenticationError('User already exists');
	}

	const hashedPassword = await bcrypt.hash(password, 12);

	const newUser = await User.create({
		email: email,
		password: hashedPassword
	}).save();

	return {
		id: newUser.id,
		email: newUser.email,
		creationDate: newUser.creationDate
	};
}

async function login(_: any, args: {email: string; password: string}, context: Context) {
	const {email, password} = args;

	const user = await User.findOne({where: {email}});

	if (!user) {
		throw new AuthenticationError('Invalid credentials');
	}

	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) {
		throw new AuthenticationError('Invalid credentials');
	}

	if (context.req.session) {
		context.req.session.userId = user.id;
	} else {
		throw new ApolloError('Internal server error');
	}

	return {
		id: user.id,
		email: user.email,
		creationDate: user.creationDate
	};
}

export async function logout(_: any, _args: any, context: Context) {
	return new Promise((resolve, reject) => {
		context.req.session?.destroy((error) => {
			if (error) {
				return reject(false);
			}

			context.res.clearCookie('qid');

			return resolve(true);
		});
	});
}
