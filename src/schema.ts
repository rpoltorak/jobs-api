import {gql, makeExecutableSchema} from 'apollo-server-express';

import authResolver from './modules/auth/auth.resolver';
import userResolver from './modules/user/user.resolver';
import jobCategoryResolver from './modules/jobCategory/jobCategory.resolver';
import employmentTypeResolver from './modules/employmentType/employmentType.resolver';
import companyResolver from './modules/company/company.resolver';
import jobResolver from './modules/job/job.resolver';

const typeDefs = gql`
	scalar Date
	scalar Upload

	type User {
		id: ID!
		email: String!
		creationDate: String!
		company: Company
		jobs: [Job]
	}

	type Company {
		id: Int!
		name: String!
		description: String!
		localization: String!
		websiteUrl: String!
		logoUrl: String!
		jobs: [Job]!
	}

	type JobCategory {
		id: Int!
		name: String!
		jobs: [Job]!
	}

	type EmploymentType {
		id: Int!
		name: String!
		jobs: [Job]!
	}

	type Job {
		id: Int!
		title: String!
		salaryFrom: Int!
		salaryTo: Int!
		description: String!
		applyUrl: String!
		applyEmail: String!
		creationDate: Date!
		company: Company!
		category: JobCategory!
		employmentType: EmploymentType!
	}

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	input CreateUserCompanyArgs {
		name: String!
		description: String!
		localization: String!
		websiteUrl: String!
		logo: Upload!
	}

	input UpdateUserCompanyArgs {
		name: String
		description: String
		localization: String
		websiteUrl: String
		logo: Upload
	}

	input CreateJobArgs {
		title: String!
		salaryFrom: Int!
		salaryTo: Int!
		description: String!
		applyUrl: String!
		applyEmail: String!
		categoryId: Int!
		employmentTypeId: Int!
	}

	type Query {
		user: User
		company(id: Int!): Company
		companies: [Company]
		categories: [JobCategory]
		category(id: Int!): JobCategory
		employmentTypes: [EmploymentType]
		employmentType(id: Int!): EmploymentType
		job(id: Int!): Job
		jobs(categories: [Int!], companyId: Int): [Job]
	}

	type Mutation {
		register(email: String!, password: String!, passwordConfirmation: String!): User
		login(email: String!, password: String!): User
		logout: Boolean
		createUserCompany(company: CreateUserCompanyArgs!): Company
		updateUserCompany(company: UpdateUserCompanyArgs!): Company
		createJob(job: CreateJobArgs!): Job
	}
`;

const schema = makeExecutableSchema({
	typeDefs,
	resolvers: [authResolver, userResolver, jobCategoryResolver, employmentTypeResolver, companyResolver, jobResolver]
});

export default schema;
