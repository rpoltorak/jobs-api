require('dotenv').config();

module.exports = {
	type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: 'all',
	logger: 'advanced-console',
	dropSchema: false,
	entities: [process.env.NODE_ENV === 'production' ? '**/*.model.js' : '**/*.model.ts'],
	migrations: [process.env.NODE_ENV === 'production' ? '**/migrations/**/*.js' : '**/migrations/**/*.ts'],
	subscribers: [process.env.NODE_ENV === 'production' ? '**/subscribers/**/*.js' : '**/subscribers/**/*.ts']
};
