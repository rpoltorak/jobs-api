import {promisify} from 'util';
import crypto from 'crypto';

const generateRandomBytes = promisify(crypto.randomBytes);

export async function generateToken() {
	return generateRandomBytes(16).then((buffer) => buffer.toString('hex'));
}
