import {ApolloError} from 'apollo-server-express';

import {QueryCategoryArgs} from 'src/generated/graphql';
import JobCategory from './jobCategory.model';
import Job from '../job/job.model';

export default {
	Query: {
		categories: getJobCategories,
		category: getJobCategory
	},
	JobCategory: {
		jobs(parent: JobCategory) {
			return getJobsByCategory(parent.id);
		}
	}
};

export async function getJobCategories() {
	return JobCategory.find();
}

export async function getJobCategory(_: any, args: QueryCategoryArgs) {
	const {id} = args;

	const category = await JobCategory.findOne({where: {id}});

	if (!category) {
		throw new ApolloError('There is no category type with specified id');
	}

	return category;
}

async function getJobsByCategory(id: number) {
	return Job.find({where: {categoryId: id}});
}
