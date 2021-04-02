import {ApolloError} from 'apollo-server-express';

import {MutationCreateUserCompanyArgs} from 'src/generated/graphql';
import {isAuthenticated} from '../../middleware';
import {Context} from '../../types';
import {fileUploader} from '../../utils/fileUploader';
import User from '../user/user.model';
import Company from '../company/company.model';

export default {
	Query: {
		user: isAuthenticated(getUser)
	},
	Mutation: {
		createUserCompany: isAuthenticated(createUserCompany),
		updateUserCompany: isAuthenticated(updateUserCompany)
	},
	User: {
		company(parent: User, args: any, context: Context) {
			return getUserCompany(parent.id, args, context);
		},
		jobs(parent: User, args: any, context: Context) {
			return getUserJobs(parent.id, args, context);
		}
	}
};

async function getUser(_: any, _args: any, context: Context) {
	const userId = context.req.session?.userId;

	const user = await User.findOne({where: {id: userId}});

	if (!user) {
		throw new ApolloError('Cannot find user');
	}

	return {
		id: user.id,
		email: user.email,
		creationDate: user.creationDate
	};
}

async function getUserCompany(id: string, _args: any, _context: Context) {
	return await Company.findOne({where: {userId: id}});
}

async function getUserJobs(userId: string, _args: any, _context: Context) {
	return await Company.findOne({where: {userId}});
}

async function createUserCompany(_: any, args: MutationCreateUserCompanyArgs, context: Context) {
	const {company} = args;
	const request = context.req;

	const {filename, createReadStream} = await company.logo;
	const stream = createReadStream();

	try {
		const userId = request.session?.userId;
		const {logo, ...data} = company;

		const logoUrl = await fileUploader({request, stream, filename});

		const newCompany = await Company.create({
			...data,
			userId,
			logoUrl
		} as Company).save();

		return newCompany;
	} catch (_error) {
		throw new ApolloError('Failed to upload file');
	}
}

async function updateUserCompany(_: any, args: MutationCreateUserCompanyArgs, context: Context) {
	const {company} = args;
	const {logo, ...data} = company;

	const userId = context.req.session?.userId;

	const currentCompany = await Company.findOne({where: {userId}});

	if (!currentCompany) {
		throw new ApolloError('User has no company profile');
	}

	let updatedFields: Partial<Company> = {
		...data
	};

	if (company.logo) {
		const request = context.req;

		const {filename, createReadStream} = await company.logo;
		const stream = createReadStream();

		try {
			const logoUrl = await fileUploader({request, stream, filename});

			updatedFields = {
				...updatedFields,
				logoUrl
			};
		} catch (_error) {
			throw new ApolloError('Failed to upload file');
		}
	}

	await Company.update({id: currentCompany.id, userId}, updatedFields);

	const updatedCompany = await Company.findOne({where: {id: currentCompany.id, userId}});

	return updatedCompany;
}
