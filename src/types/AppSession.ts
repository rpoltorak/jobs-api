import {Session} from 'express-session';

type AppSession = Session & {
	userId?: string;
};

export default AppSession;
