import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import path from 'path';
import session from 'express-session';
import connectRedis from 'connect-redis';
import {createConnection} from 'typeorm';
import dotenv from 'dotenv';

import {redis} from './utils';
import {handleError} from './middleware';
import schema from './schema';

import {jobsByCompanyIdsLoader} from './modules/company/company.resolver';
import {companyByJobLoader, categoryByJobLoader, employmentTypeByJobLoader} from './modules/job/job.resolver';

dotenv.config();

async function bootstrap() {
	const connection = await createConnection();

	connection.runMigrations();

	const app = express();

	const RedisStore = connectRedis(session);

	app.use(
		session({
			store: new RedisStore({
				client: redis
			}),
			name: 'sid',
			secret: process.env.SESSION_SECRET as string,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: false,
				maxAge: 1000 * 60 * 60 * 24 // 24h
			}
		})
	);

	app.use(express.static(path.join(__dirname, '..', 'public')));

	app.use(handleError);

	const loaders = {
		jobsByCompanyIdsLoader: jobsByCompanyIdsLoader(),
		companyByJobLoader: companyByJobLoader(),
		categoryByJobLoader: categoryByJobLoader(),
		employmentTypeByJobLoader: employmentTypeByJobLoader()
	};

	const apolloServer = new ApolloServer({
		schema,
		context: ({req, res}) => ({
			req,
			res,
			loaders
		})
	});

	apolloServer.applyMiddleware({
		app,
		cors: {
			origin: process.env.UI_URL,
			credentials: true
		}
	});

	const port = process.env.API_PORT;

	app.listen(port, () => {
		console.log(`Express: server started on port ${port}`);
	});
}

bootstrap();
