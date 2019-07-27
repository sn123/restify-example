import { injectable } from 'inversify';
import { User } from '../models/';

export interface UserServiceContract {
    get(id: number): User;
}
@injectable()
export class UserService implements UserServiceContract {
    public get(id: number): User {
        // TODO: make the call to datastore to get value
        const user = new User();
        user.email = 'hello@example.com';
        user.id = id;
        user.name = 'Hello world';
        return user;
    }
}
