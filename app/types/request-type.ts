import { Request } from 'restify';
import { User } from '../../database/models/user';

export type WithUserRequest = Request & { user: User };
