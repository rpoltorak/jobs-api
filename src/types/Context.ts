import {Request, Response} from 'express';

import DataLoader from 'dataloader';

import Job from '../modules/job/job.model';
import Company from '../modules/company/company.model';
import JobCategory from 'src/modules/jobCategory/jobCategory.model';
import EmploymentType from 'src/modules/employmentType/employmentType.model';
import AppSession from './AppSession';

export default interface Context {
	req: Request & {
		session: AppSession;
	};
	res: Response;
	loaders: {
		jobsByCompanyIdsLoader: DataLoader<number, Job[], number>;
		companyByJobLoader: DataLoader<Job, Company[], Job>;
		categoryByJobLoader: DataLoader<Job, JobCategory[], Job>;
		employmentTypeByJobLoader: DataLoader<Job, EmploymentType[], Job>;
	};
}
