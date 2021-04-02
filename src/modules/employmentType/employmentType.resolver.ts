import {ApolloError} from 'apollo-server-express';

import {QueryEmploymentTypeArgs} from 'src/generated/graphql';
import EmploymentType from './employmentType.model';
import Job from '../job/job.model';

export default {
	Query: {
		employmentTypes: getEmploymentTypes,
		employmentType: getEmploymentType
	},
	EmploymentType: {
		jobs(parent: EmploymentType) {
			return getJobsByEmploymentType(parent.id);
		}
	}
};

export async function getEmploymentTypes() {
	return EmploymentType.find();
}

export async function getEmploymentType(_: any, args: QueryEmploymentTypeArgs) {
	const {id} = args;

	const employmentType = await EmploymentType.findOne({where: {id}});

	if (!employmentType) {
		throw new ApolloError('There is no employment type with specified id');
	}

	return employmentType;
}

async function getJobsByEmploymentType(id: number) {
	return Job.find({where: {employmentTypeId: id}});
}
