import {ApolloError} from 'apollo-server-express';
import {getConnection} from 'typeorm';
import DataLoader from 'dataloader';
import keyBy from 'lodash/keyBy';
import uniq from 'lodash/uniq';

import {MutationCreateJobArgs, QueryJobArgs, QueryJobsArgs} from 'src/generated/graphql';
import {isAuthenticated} from '../../middleware';
import {Context} from '../../types';
import Job from './job.model';
import Company from '../company/company.model';
import JobCategory from '../jobCategory/jobCategory.model';
import EmploymentType from '../employmentType/employmentType.model';

export default {
	Query: {
		job: getJob,
		jobs: getJobs
	},
	Mutation: {
		createJob: isAuthenticated(createJob)
	},
	Job: {
		company(parent: Job, _args: any, {loaders: {companyByJobLoader}}: Context) {
			return companyByJobLoader.load(parent);
		},
		category(parent: Job, _args: any, {loaders: {categoryByJobLoader}}: Context) {
			return categoryByJobLoader.load(parent);
		},
		employmentType(parent: Job, _args: any, {loaders: {employmentTypeByJobLoader}}: Context) {
			return employmentTypeByJobLoader.load(parent);
		}
	}
};

async function createJob(_: any, args: MutationCreateJobArgs, context: Context) {
	const userId = context.req.session?.userId as string;

	const company = await Company.findOne({where: {userId}});

	if (!company) {
		throw new ApolloError('User has no company profile');
	}

	const companyId = company.id;
	const jobInput = args.job;

	const job = await Job.create({
		...jobInput,
		userId,
		companyId
	}).save();

	return job;
}

async function getJob(_: any, args: QueryJobArgs, _context: Context) {
	const {id} = args;

	return await Job.findOne({where: {id}});
}

async function getJobs(_: any, args: QueryJobsArgs, _context: Context) {
	const connection = getConnection();

	const {categories, companyId} = args;

	let query = connection.manager.getRepository(Job).createQueryBuilder('job');

	if (companyId) {
		query = query.where('job.companyId = :companyId', {companyId});
	}

	if (categories?.length) {
		query = query.where('job.category IN (:...categories)', {categories});
	}

	return query.getMany();
}

async function getCompaniesByJobs(jobs: readonly Job[]) {
	const companyIds = jobs.map(({companyId}) => companyId);

	const companies = await getConnection()
		.manager.getRepository(Company)
		.createQueryBuilder('company')
		.where('company.id IN (:...companyIds)', {companyIds: uniq(companyIds)})
		.getMany();

	const groupedCompanies = keyBy(companies, ({id}) => id);

	return jobs.map(({companyId}) => groupedCompanies[companyId] ?? []);
}

async function getCategoriesByJobs(jobs: readonly Job[]) {
	const categoryIds = jobs.map(({categoryId}) => categoryId);

	const categories = await getConnection()
		.manager.getRepository(JobCategory)
		.createQueryBuilder('category')
		.where('category.id IN (:...categoryIds)', {categoryIds: uniq(categoryIds)})
		.getMany();

	const groupedCategories = keyBy(categories, ({id}) => id);

	return jobs.map(({categoryId}) => groupedCategories[categoryId] ?? []);
}

async function getEmploymentTypesByJobs(jobs: readonly Job[]) {
	const employmentTypeIds = jobs.map(({employmentTypeId}) => employmentTypeId);

	const employmentTypes = await getConnection()
		.manager.getRepository(EmploymentType)
		.createQueryBuilder('employmentType')
		.where('employmentType.id IN (:...employmentTypeIds)', {employmentTypeIds: uniq(employmentTypeIds)})
		.getMany();

	const groupedEmploymentTypes = keyBy(employmentTypes, ({id}) => id);

	return jobs.map(({employmentTypeId}) => groupedEmploymentTypes[employmentTypeId] ?? []);
}

export function companyByJobLoader() {
	return new DataLoader(getCompaniesByJobs);
}

export function categoryByJobLoader() {
	return new DataLoader(getCategoriesByJobs);
}

export function employmentTypeByJobLoader() {
	return new DataLoader(getEmploymentTypesByJobs);
}
