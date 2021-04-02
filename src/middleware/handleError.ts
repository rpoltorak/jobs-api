import {NextFunction, Request, Response} from 'express';
import {AppError} from '../types';

export function handleError(error: Error, _request: Request, response: Response, _next: NextFunction) {
	console.log('error', error);

	if (error instanceof AppError) {
		const {status, message} = error;

		response.status(status).json({
			message
		});
	} else {
		response.status(500).json({
			message: 'Internal server error'
		});
	}
}
