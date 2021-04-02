import {ApolloError} from 'apollo-server-express';
import DataLoader from 'dataloader';
import {getConnection} from 'typeorm';
import groupBy from 'lodash/groupBy';

import {QueryCompanyArgs} from 'src/generated/graphql';
import Company from '../company/company.model';
import Job from '../job/job.model';
import {Context} from '../../types';

export default {
	Query: {
		company: getCompany,
		companies: getCompanies
	},
	Company: {
		jobs(parent: Company, _args: any, {loaders: {jobsByCompanyIdsLoader}}: Context) {
			return jobsByCompanyIdsLoader.load(parent.id);
		}
	}
};

async function getCompany(_: any, args: QueryCompanyArgs) {
	const {id} = args;

	const company = await Company.findOne({where: {id}});

	if (!company) {
		throw new ApolloError('There is no company with specified id');
	}

	return company;
}

async function getCompanies() {
	return await Company.find();
}

async function getJobsByCompanyIds(companyIds: readonly number[]) {
	const jobs = await getConnection()
		.manager.getRepository(Job)
		.createQueryBuilder('job')
		.where('job.companyId IN (:...companyIds)', {companyIds})
		.getMany();

	const groupedJobs = groupBy(jobs, ({companyId}) => companyId);

	return companyIds.map((id) => groupedJobs[id] ?? []);
}

export function jobsByCompanyIdsLoader() {
	return new DataLoader(getJobsByCompanyIds);
}
