import Redis from 'ioredis';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
	port: Number(process.env.REDIS_PORT),
	host: process.env.REDIS_HOST,
	password: process.env.REDIS_PASS,
	db: Number(process.env.REDIS_DB)
});

redis.monitor((_, monitor) => {
	monitor.on('monitor', (time, args) => {
		console.log(time + ': ' + util.inspect(args));
	});
});

redis.on('connect', () => {
	console.log('Redis: connected successfully');
});

redis.on('error', (error) => {
	console.log('Redis error: ', error);
});

export {redis};
