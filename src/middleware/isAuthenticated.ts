import {AuthenticationError} from 'apollo-server-express';

import {Context} from '../types';

export function isAuthenticated(resolver: (root: any, args: any, context: Context, info: any) => any) {
	return (root: any, args: any, context: Context, info: any) => {
		if (!context.req.session?.userId) {
			throw new AuthenticationError('Unauthorized');
		}

		return resolver(root, args, context, info);
	};
}
