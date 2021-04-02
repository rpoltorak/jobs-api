import {Request} from 'express';
import path from 'path';
import fs, {unlink} from 'fs';
import {v4 as uuid} from 'uuid';
import dotenv from 'dotenv';

import {ReadStream} from 'tty';

dotenv.config();

export function fileUploader({
	request,
	stream,
	filename
}: {
	request: Request;
	stream: ReadStream;
	filename: string;
}): Promise<string> {
	const host = `${request.protocol}://${request.headers.host}`;

	const uploadDir = `${process.env.INIT_CWD}/public/uploads/`;
	const fileName = `${uuid()}${path.extname(filename)}`;
	const filePath = `${uploadDir}/${fileName}`;
	const fileUrl = `${host}/uploads/${fileName}`;

	return new Promise((resolve, reject) =>
		stream
			.on('error', (error: Error) => {
				unlink(filePath, () => {
					reject(error);
				});
			})
			.pipe(fs.createWriteStream(filePath))
			.on('error', (error: Error) => reject(error))
			.on('finish', () => resolve(fileUrl))
	);
}
