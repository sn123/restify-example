import { ErrorModel, ResponseViewModel } from '../viewmodels/response-viewmodel';
import { User } from '../models/';
import { User as UserModel } from '../../database/models';
import { getRepository } from 'typeorm';
import { injectable } from 'inversify';

export interface UserServiceContract {
    get(id: number): User;
    profile(id: string): Promise<ResponseViewModel<UserModel>>;
}
@injectable()
export class UserService implements UserServiceContract {
    public get(id: number): User {
        // TODO: make the call to data-store to get value
        const user = new User();
        user.email = 'hello@example.com';
        user.id = id;
        user.name = 'Hello world';
        return user;
    }

    public async profile(id: string): Promise<ResponseViewModel<UserModel>> {
        const response = new ResponseViewModel<UserModel>();
        const user = await getRepository(UserModel).findOne({
            id,
        });
        if (user) {
            response.data = user;
            return response;
        }
        response.errors.push(new ErrorModel('Unable to get fetch user'));
        return response;
    }
}
